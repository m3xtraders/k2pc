import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validations";
import { sendLeadNotificationEmail, sendCustomerBookingConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactFormSchema.parse(body);

    const submission = await prisma.contactSubmission.create({
      data: {
        name: validated.name,
        phone: validated.phone,
        email: validated.email ? validated.email.trim() : null,
        service: validated.serviceNeeded,
        city: validated.addressOrCity,
        message: validated.message || "",
        status: "NEW" as any,
      } as any,
    });

    const leadPayload = {
      id: submission.id,
      name: validated.name,
      phone: validated.phone,
      email: validated.email ? validated.email.trim() : null,
      service: validated.serviceNeeded,
      city: validated.addressOrCity,
      message: validated.message,
      source: "Web Form",
    };

    // 1. Send full details email to admin/dispatch team (k2pcsas@gmail.com)
    sendLeadNotificationEmail(leadPayload).catch((err) =>
      console.error("Admin notification email error:", err)
    );

    // 2. Send booking confirmation email to customer (if email provided)
    if (leadPayload.email) {
      sendCustomerBookingConfirmationEmail(leadPayload).catch((err) =>
        console.error("Customer confirmation email error:", err)
      );
    }

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit request. Please try again or call directly." },
      { status: 400 }
    );
  }
}
