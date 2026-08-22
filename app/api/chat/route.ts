import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";
import { prisma } from "@/lib/prisma";
import { getCompanyDetails, getPublishedServices } from "@/lib/content-db";
import { sendLeadNotificationEmail } from "@/lib/email";

export const maxDuration = 30; // 30s timeout

interface ChatMessage {
  role: "user" | "model" | "assistant";
  text: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    // 1. Safely fetch business info & services with fallback to static content
    let businessInfo: any = null;
    try {
      businessInfo = await prisma.businessInfo.findFirst().catch(() => null);
    } catch (_dbErr) {
      businessInfo = null;
    }

    const [companyDetails, publishedServices] = await Promise.all([
      getCompanyDetails(),
      getPublishedServices(),
    ]);

    // Check if chatbot is disabled by admin
    if (businessInfo && businessInfo.chatbotEnabled === false) {
      return NextResponse.json(
        {
          response:
            "Our live chat is currently offline. Please call our 24/7 emergency dispatch directly at " +
            (companyDetails.phone || "(416) 555-0199") +
            " or visit our contact page.",
        },
        { status: 200 }
      );
    }

    // Determine API Key: Admin override in DB -> env variable
    const apiKey =
      businessInfo?.chatbotApiKey?.trim() ||
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          response:
            "AI assistant is currently initializing. Please contact us directly at " +
            (companyDetails.phone || "(416) 555-0199") +
            ".",
        },
        { status: 200 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // 2. Build live services context
    const servicesListText = publishedServices
      .map(
        (s) =>
          `• **${s.title}** (Slug: ${s.slug})\n` +
          `  - Starting Price: ${s.pricingStartsAt || "Custom Quote"}\n` +
          `  - Warranty: ${s.warranty || "Guaranteed Eradication"}\n` +
          `  - Description: ${s.shortDescription}\n` +
          `  - Target Pests: ${s.targetPests?.join(", ") || "Ontario Pests"}`
      )
      .join("\n\n");

    const serviceAreasText = companyDetails.regionsServed?.join(", ") || "Greater Toronto Area";
    const hoursText = companyDetails.hours
      ? companyDetails.hours.map((h: any) => `${h.days}: ${h.times}`).join(", ")
      : "Monday-Sunday 24/7 Emergency Dispatch";

    const customAdminPrompt = businessInfo?.chatbotSystemPrompt?.trim()
      ? `\n\nADMIN SPECIFIC INSTRUCTIONS:\n${businessInfo.chatbotSystemPrompt}`
      : "";

    const botName = businessInfo?.chatbotName || "K2 Pest Assistant";

    // 3. Construct master system instruction
    const systemInstruction = `
You are "${botName}", the expert, friendly, and licensed 24/7 AI Pest Control Consultant for **${companyDetails.name || "K2 Pest Control"}**.
You assist homeowners, landlords, restaurant owners, and property managers across Toronto and the Greater Toronto Area (GTA).

---
### 🏢 COMPANY PROFILE & CREDENTIALS:
- **Company Name**: ${companyDetails.name || "K2 Pest Control"}
- **Ontario Ministry License**: ${companyDetails.licenseNumber || "ON-849201-P"} (Ministry of Environment Licensed & Insured)
- **Primary Phone (Call / SMS)**: ${companyDetails.phone || "(416) 555-0199"}
- **Emergency Service**: 2-Hour Rapid Emergency Response Available 24/7
- **Operating Hours**: ${hoursText}
- **Service Regions**: ${serviceAreasText}
- **Eco & Safety Guarantee**: 100% Health Canada approved IPM solutions, safe for children and household pets. 100% money-back / re-treatment guarantee.

---
### 🐜 LIVE SERVICES & PRICING:
${servicesListText}

---
### 🎯 YOUR CORE OBJECTIVES:
1. **Pest Identification & Consultation**:
   - Provide practical Ontario pest advice (e.g. German Cockroaches vs. Wood Roaches, Carpenter Ants vs. Moisture Ants, Bed Bug heat treatment vs. chemical, Rodent exclusion).
   - Educate on signs of infestation (droppings, entry points, scratching in walls).
2. **Safety & Preparation Instructions**:
   - Always reassure customers that treatments are family- and pet-safe once dry (typical 4-hour re-entry safety window).
   - Explain pre-treatment prep (e.g., kitchen cabinet clearance for roaches, bed linen washing in hot water for bed bugs).
3. **Transparent Pricing & Quotes**:
   - Quote accurate starting prices from the live service list above.
   - Mention that every job includes a full on-site inspection and written warranty.
4. **Lead Capture & Booking**:
   - When a user asks to book an appointment, requests an inspection, asks for a custom quote, or provides their name/phone number, **YOU MUST IMMEDIATELY CALL THE \`captureLead\` TOOL**.
   - If they haven't provided their phone number or name yet, ask politely: *"I can have our local technician call you within 15 minutes! What is your best phone number and name?"*
   - Once \`captureLead\` succeeds, confirm enthusiastically that their request is dispatched.

---
### ⚠️ COMMUNICATION RULES:
- Keep answers clear, supportive, and professional. Use markdown formatting with bullet points and bold text where helpful.
- When urgent/severe pest issues are mentioned (e.g., wasp nest near front door, heavy rodent infestation, active bed bugs), encourage them to call **${companyDetails.phone}** immediately for 2-hour emergency dispatch.
- Never make up prices that are not listed in the live services above.
${customAdminPrompt}
`.trim();

    // 4. Define Tools
    const tools = [
      {
        functionDeclarations: [
          {
            name: "captureLead",
            description:
              "Captures lead contact info whenever a customer provides their name, phone number, email, address, or requests an inspection, callback, booking, or price quote.",
            parameters: {
              type: Type.OBJECT,
              properties: {
                name: {
                  type: Type.STRING,
                  description: "Full name of the customer",
                },
                phone: {
                  type: Type.STRING,
                  description: "Phone number of the customer",
                },
                email: {
                  type: Type.STRING,
                  description: "Email address if provided",
                },
                city: {
                  type: Type.STRING,
                  description: "City or address in the GTA (e.g., Toronto, Mississauga, Brampton, Markham, Vaughan)",
                },
                service: {
                  type: Type.STRING,
                  description: "Pest type or service required (e.g., Bed Bugs, Cockroaches, Mice, Ants, Wasps, Wildlife)",
                },
                message: {
                  type: Type.STRING,
                  description: "Details or notes regarding the customer problem, urgency, or request",
                },
              },
              required: ["name", "phone"],
            },
          },
        ],
      },
    ];

    // Format chat history for Gemini API
    // Ensure alternating user/model roles and map 'assistant' to 'model'
    const contents: any[] = [];
    for (const msg of messages) {
      const role = msg.role === "assistant" || msg.role === "model" ? "model" : "user";
      if (msg.text && msg.text.trim()) {
        contents.push({
          role,
          parts: [{ text: msg.text.trim() }],
        });
      }
    }

    if (contents.length === 0) {
      return NextResponse.json({ error: "No valid messages provided" }, { status: 400 });
    }

    // Call Gemini Model with fallback across high-availability Flash versions
    const candidateModels = [
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-3.7-flash",
      "gemini-3.1-flash-lite",
    ];

    let response: any = null;
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction,
            tools,
            temperature: 0.7,
          },
        });
        if (response) break;
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} attempt failed:`, err?.message || err);
      }
    }

    if (!response) {
      throw lastError || new Error("All Gemini models unavailable");
    }

    let leadCapturedData: any = null;
    let finalAssistantText = response.text || "";

    // Check if the model invoked function calls (e.g. captureLead)
    if (response.functionCalls && response.functionCalls.length > 0) {
      for (const call of response.functionCalls) {
        if (call.name === "captureLead") {
          const args = call.args as {
            name: string;
            phone: string;
            email?: string;
            city?: string;
            service?: string;
            message?: string;
          };

          try {
            const savedLead = await prisma.contactSubmission.create({
              data: {
                name: args.name || "Chat Visitor",
                phone: args.phone || "Not Provided",
                email: args.email || null,
                city: args.city || null,
                service: args.service || "AI Chatbot Inquiry",
                message: `[Captured via AI Chatbot]: ${args.message || "Customer requested contact via website AI Assistant."}`,
                status: "NEW",
              },
            });

            leadCapturedData = {
              id: savedLead.id,
              name: savedLead.name,
              phone: savedLead.phone,
              service: savedLead.service,
              city: savedLead.city,
            };

            sendLeadNotificationEmail({
              id: savedLead.id,
              name: savedLead.name,
              phone: savedLead.phone,
              email: savedLead.email,
              city: savedLead.city,
              service: savedLead.service,
              message: savedLead.message,
              source: "AI Chatbot",
            }).catch((err) => console.error("Async chatbot email error:", err));

            // If model didn't return text alongside function call, generate a warm confirmation
            if (!finalAssistantText) {
              finalAssistantText = `Thank you, **${args.name}**! 🎉 Your request for **${args.service || "pest inspection"}** has been sent to our on-duty dispatcher. One of our licensed exterminators will contact you at **${args.phone}** shortly.\n\nNeed urgent 24/7 dispatch? Feel free to call us directly at **${companyDetails.phone || "(416) 555-0199"}**.`;
            }
          } catch (dbErr) {
            console.error("Failed to save lead from chatbot:", dbErr);
            leadCapturedData = {
              id: "req-" + Date.now(),
              name: args.name || "Customer",
              phone: args.phone || "Not Provided",
              service: args.service || "Pest Service",
              city: args.city,
            };
            if (!finalAssistantText) {
              finalAssistantText = `Thank you, **${args.name || "for reaching out"}**! 🎉 Your request for **${args.service || "pest inspection"}** has been recorded. Our dispatcher will contact you at **${args.phone}** shortly.\n\nNeed urgent 24/7 dispatch? Feel free to call us directly at **${companyDetails.phone || "(416) 555-0199"}**.`;
            }
          }
        }
      }
    }

    // Heuristic Fallback: If no function call was triggered but user message contains a phone number
    if (!leadCapturedData) {
      const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.text || "";
      const phoneMatch = lastUserMsg.match(/(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})/);
      const emailMatch = lastUserMsg.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);

      if (phoneMatch) {
        try {
          const extractedPhone = phoneMatch[0];
          const extractedEmail = emailMatch ? emailMatch[0] : null;
          
          // Try to extract name if format is "my name is X" or "I'm X"
          const nameMatch = lastUserMsg.match(/(?:my name is|i am|i'm|this is)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i);
          const extractedName = nameMatch ? nameMatch[1].trim() : "Chat Customer";

          const savedLead = await prisma.contactSubmission.create({
            data: {
              name: extractedName,
              phone: extractedPhone,
              email: extractedEmail,
              city: null,
              service: "AI Chatbot Inquiry",
              message: `[Captured via AI Chatbot Auto-Detector]: Full user inquiry: "${lastUserMsg}"`,
              status: "NEW",
            },
          });

          leadCapturedData = {
            id: savedLead.id,
            name: savedLead.name,
            phone: savedLead.phone,
            service: savedLead.service,
          };
        } catch (err) {
          console.warn("Fallback lead capture error:", err);
        }
      }
    }

    if (!finalAssistantText) {
      finalAssistantText =
        "I'm here to help with all your pest control needs! You can ask about our treatments, pricing, or call us directly at " +
        (companyDetails.phone || "(416) 555-0199") +
        ".";
    }

    return NextResponse.json({
      response: finalAssistantText,
      leadCaptured: leadCapturedData,
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      {
        response:
          "I'm temporarily experiencing high traffic, but our team is standing by! Please give our 24/7 hotline a quick call at **(416) 555-0199** for immediate assistance.",
        error: error.message || "Internal error",
      },
      { status: 200 }
    );
  }
}
