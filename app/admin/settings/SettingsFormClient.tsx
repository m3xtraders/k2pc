"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormField } from "@/components/admin/FormField";
import { TagInput } from "@/components/admin/TagInput";
import { ServiceAreasEditor } from "@/components/admin/ServiceAreasEditor";
import { updateBusinessInfoAction } from "@/app/admin/actions";
import { BusinessInfoInput, ServiceAreaItem } from "@/lib/validations/businessInfo";
import { Save, Loader2, Phone, MapPin, Clock, Share2, Bot, Sparkles, Key, MessageSquareText, Globe2, Gift, Tag, Percent } from "lucide-react";

interface SettingsFormClientProps {
  initialData?: any;
}

export const SettingsFormClient: React.FC<SettingsFormClientProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const defaultHours: Record<string, string> =
    (initialData?.hoursJson as Record<string, string>) || {
      "Monday - Friday": "7:00 AM - 9:00 PM",
      "Saturday - Sunday": "8:00 AM - 6:00 PM",
      "Emergency Response": "24/7 Rapid Dispatch",
    };

  const defaultQuickPrompts: string[] = Array.isArray(initialData?.chatbotQuickPrompts)
    ? initialData.chatbotQuickPrompts
    : [
        "💰 How much does pest removal cost?",
        "🚨 Do you offer 24/7 emergency service?",
        "🐜 How do I prepare for ant treatment?",
        "📅 Can I book a pest inspection?",
      ];

  const rawServiceAreas = initialData?.serviceAreas;
  const initialServiceAreas: ServiceAreaItem[] =
    Array.isArray(rawServiceAreas) && rawServiceAreas.length > 0
      ? rawServiceAreas.map((item: any) => {
          if (typeof item === "string") {
            return { name: item, region: "Saskatoon & Area" };
          }
          return {
            name: item?.name || "Saskatoon",
            region: item?.region || "Saskatoon & Area",
            badge: item?.badge || undefined,
          };
        })
      : [
          { name: "Saskatoon (Central & Suburbs)", region: "City of Saskatoon", badge: "Central Dispatch HQ" },
          { name: "Warman", region: "Saskatoon Metro Corridor", badge: "~15-20 min dispatch" },
          { name: "Martensville", region: "Saskatoon Metro Corridor", badge: "~15 min dispatch" },
          { name: "Osler", region: "Saskatoon Metro Corridor", badge: "~20-25 min dispatch" },
          { name: "Dalmeny", region: "Saskatoon Metro Corridor", badge: "~25 min dispatch" },
          { name: "Langham", region: "Saskatoon Metro Corridor", badge: "~30 min dispatch" },
          { name: "Vanscoy", region: "Saskatoon Metro Corridor", badge: "~25 min dispatch" },
          { name: "Corman Park", region: "Rural Municipality", badge: "~15-30 min dispatch" },
          { name: "Dundurn", region: "Saskatoon Metro Corridor", badge: "~35 min dispatch" },
          { name: "Clavet", region: "Saskatoon Metro Corridor", badge: "~25 min dispatch" },
          { name: "Greenbryre", region: "Saskatoon South Corridor", badge: "~10-15 min dispatch" },
          { name: "The Willows", region: "Saskatoon South Corridor", badge: "~10-15 min dispatch" },
          { name: "Riverside Estates", region: "Saskatoon South Corridor", badge: "~15 min dispatch" },
          { name: "Grasswood", region: "Saskatoon South Corridor", badge: "~15 min dispatch" },
          { name: "Pike Lake", region: "Saskatoon South-West Corridor", badge: "~25-30 min dispatch" },
          { name: "Whitecap", region: "Saskatoon South Corridor", badge: "~25 min dispatch" },
          { name: "Delisle", region: "Saskatoon South-West Corridor", badge: "~30-35 min dispatch" },
        ];

  const [formData, setFormData] = useState<BusinessInfoInput>({
    companyName: initialData?.companyName || "K2 Pest Control",
    slogan: initialData?.slogan || "Licensed, Guaranteed & Eco-Conscious Exterminators for Saskatoon & Area",
    phone: initialData?.phone || "(306) 407-0007",
    email: initialData?.email || "info@k2pc.ca",
    addressLine1: initialData?.addressLine1 || "1200 Central Ave, Suite 400",
    addressLine2: initialData?.addressLine2 || "",
    city: initialData?.city || "Saskatoon",
    province: initialData?.province || "SK",
    postalCode: initialData?.postalCode || "S7N 2H2",
    country: initialData?.country || "Canada",
    latitude: initialData?.latitude || 52.1332,
    longitude: initialData?.longitude || -79.336,
    licenseNumber: initialData?.licenseNumber || "A-003789",
    hoursJson: defaultHours,
    serviceAreas: initialServiceAreas,
    facebookUrl: initialData?.facebookUrl || "",
    instagramUrl: initialData?.instagramUrl || "",
    twitterUrl: initialData?.twitterUrl || "",
    linkedinUrl: initialData?.linkedinUrl || "",
    googleBusinessUrl: initialData?.googleBusinessUrl || "",
    googleMapsUrl: initialData?.googleMapsUrl || "https://share.google/IMFOd1tJPGI6JL4OJ",
    chatbotEnabled: initialData?.chatbotEnabled ?? true,
    chatbotName: initialData?.chatbotName || "K2 Pest Assistant",
    chatbotGreeting:
      initialData?.chatbotGreeting ||
      "👋 Hello! I'm your K2 Pest Control assistant. How can I help you today? Ask about pricing, treatments, or book a quick inspection!",
    chatbotSystemPrompt:
      initialData?.chatbotSystemPrompt ||
      "You are the friendly, professional AI assistant for K2 Pest Control in Saskatoon & area. Guide users through pest identification, explain safe preparation protocols, highlight our licensed technicians, and encourage them to book an inspection or call our emergency hotline.",
    chatbotApiKey: initialData?.chatbotApiKey || "",
    chatbotQuickPrompts: defaultQuickPrompts,
    popupEnabled: initialData?.popupEnabled ?? true,
    popupDelaySeconds: initialData?.popupDelaySeconds ?? 15,
    popupDiscountTitle: initialData?.popupDiscountTitle || "$50 OFF",
    popupDiscountSubtitle: initialData?.popupDiscountSubtitle || "First-Time Pest Inspection & Treatment",
    popupDiscountCode: initialData?.popupDiscountCode || "SAVE50",
    popupHeading: initialData?.popupHeading || "Claim Your Limited-Time Inspection Discount!",
    popupDescription: initialData?.popupDescription || "Fill out this quick form to claim your discount voucher and book a priority Saskatchewan-certified pest inspection.",
  });

  const handleHoursChange = (dayKey: string, timeVal: string) => {
    setFormData((prev) => ({
      ...prev,
      hoursJson: {
        ...(prev.hoursJson || {}),
        [dayKey]: timeVal,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateBusinessInfoAction(formData);
      toast.success("Business settings saved successfully");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save business settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* 1. General & Contact Info */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-6">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Phone className="w-5 h-5 text-[#BE2320]" />
          Company & Contact Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Company Name" required>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData((p) => ({ ...p, companyName: e.target.value }))}
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="Company Slogan / Tagline (Dynamic)">
            <input
              type="text"
              value={formData.slogan || ""}
              onChange={(e) => setFormData((p) => ({ ...p, slogan: e.target.value }))}
              placeholder="e.g. Licensed, Guaranteed & Eco-Conscious Exterminators"
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="License Number">
            <input
              type="text"
              value={formData.licenseNumber || ""}
              onChange={(e) => setFormData((p) => ({ ...p, licenseNumber: e.target.value }))}
              placeholder="e.g. A-003789"
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="Public Phone Number" required>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="Contact Email Address" required>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>
        </div>
      </div>

      {/* 2. Office Address & Location */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-6">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <MapPin className="w-5 h-5 text-[#BE2320]" />
          Physical Office Address & Coordinates
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <FormField label="Address Line 1" required>
              <input
                type="text"
                required
                value={formData.addressLine1}
                onChange={(e) => setFormData((p) => ({ ...p, addressLine1: e.target.value }))}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
            </FormField>
          </div>

          <FormField label="City" required>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="Province / State" required>
            <input
              type="text"
              required
              value={formData.province}
              onChange={(e) => setFormData((p) => ({ ...p, province: e.target.value }))}
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="Postal Code" required>
            <input
              type="text"
              required
              value={formData.postalCode}
              onChange={(e) => setFormData((p) => ({ ...p, postalCode: e.target.value }))}
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="Country" required>
            <input
              type="text"
              required
              value={formData.country}
              onChange={(e) => setFormData((p) => ({ ...p, country: e.target.value }))}
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="Latitude (Optional)">
            <input
              type="number"
              step="any"
              value={formData.latitude || ""}
              onChange={(e) => setFormData((p) => ({ ...p, latitude: parseFloat(e.target.value) || null }))}
              placeholder="e.g. 43.716"
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="Longitude (Optional)">
            <input
              type="number"
              step="any"
              value={formData.longitude || ""}
              onChange={(e) => setFormData((p) => ({ ...p, longitude: parseFloat(e.target.value) || null }))}
              placeholder="e.g. -79.336"
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>

          <div className="sm:col-span-2 pt-2 border-t border-stone-100">
            <FormField label="Google Maps Share / Location Link">
              <input
                type="text"
                value={formData.googleMapsUrl || ""}
                onChange={(e) => setFormData((p) => ({ ...p, googleMapsUrl: e.target.value }))}
                placeholder="e.g. https://share.google/IMFOd1tJPGI6JL4OJ or https://maps.app.goo.gl/..."
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
              <p className="text-xs text-stone-500 mt-1">
                Paste your Google Maps link (e.g. https://share.google/..., https://maps.app.goo.gl/..., or map embed link). This powers the interactive map widget and "Get Directions" button.
              </p>
            </FormField>
          </div>
        </div>
      </div>

      {/* 3. Business Operating Hours */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-6">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Clock className="w-5 h-5 text-[#BE2320]" />
          Operating Hours & Dispatch Schedule
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.keys(formData.hoursJson || {}).map((dayKey) => (
              <FormField key={dayKey} label={dayKey}>
                <input
                  type="text"
                  value={formData.hoursJson?.[dayKey] || ""}
                  onChange={(e) => handleHoursChange(dayKey, e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
                />
              </FormField>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Service Areas & Coverage Manager */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-6">
        <div className="border-b border-stone-100 pb-3">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-[#BE2320]" />
            Service Areas &amp; Municipal Coverage
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Manage the cities shown in the &quot;Areas We Serve&quot; section on the homepage.
          </p>
        </div>

        <ServiceAreasEditor
          areas={(formData.serviceAreas as ServiceAreaItem[]) || []}
          onChange={(newAreas) => setFormData((p) => ({ ...p, serviceAreas: newAreas }))}
        />
      </div>

      {/* 5. Social Links */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-6">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Share2 className="w-5 h-5 text-[#BE2320]" />
          Social Profiles & Google Business URL
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Google Business Profile URL">
            <input
              type="url"
              value={formData.googleBusinessUrl || ""}
              onChange={(e) => setFormData((p) => ({ ...p, googleBusinessUrl: e.target.value }))}
              placeholder="https://g.co/..."
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="Facebook URL">
            <input
              type="url"
              value={formData.facebookUrl || ""}
              onChange={(e) => setFormData((p) => ({ ...p, facebookUrl: e.target.value }))}
              placeholder="https://facebook.com/..."
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="Instagram URL">
            <input
              type="url"
              value={formData.instagramUrl || ""}
              onChange={(e) => setFormData((p) => ({ ...p, instagramUrl: e.target.value }))}
              placeholder="https://instagram.com/..."
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="X (Twitter) URL">
            <input
              type="url"
              value={formData.twitterUrl || ""}
              onChange={(e) => setFormData((p) => ({ ...p, twitterUrl: e.target.value }))}
              placeholder="https://x.com/..."
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>
        </div>
      </div>

      {/* 5. AI Chatbot Configuration (Gemini Powered) */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#BE2320]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                24/7 AI Pest Assistant (Gemini)
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Google AI
                </span>
              </h3>
              <p className="text-xs text-stone-500">
                Configure live chatbot persona, instant lead capture, system instructions, and quick prompts.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.chatbotEnabled}
              onChange={(e) => setFormData((p) => ({ ...p, chatbotEnabled: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            <span className="ml-3 text-sm font-medium text-stone-800">
              {formData.chatbotEnabled ? "Chatbot Active" : "Chatbot Disabled"}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Bot Display Name" required>
            <input
              type="text"
              required
              value={formData.chatbotName || "K2 Pest Assistant"}
              onChange={(e) => setFormData((p) => ({ ...p, chatbotName: e.target.value }))}
              placeholder="e.g. K2 Pest Assistant"
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
          </FormField>

          <FormField label="Custom Gemini API Key Override (Optional)">
            <div className="relative">
              <input
                type="password"
                value={formData.chatbotApiKey || ""}
                onChange={(e) => setFormData((p) => ({ ...p, chatbotApiKey: e.target.value }))}
                placeholder="Leave blank to use default server key"
                className="w-full pl-9 pr-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
              <Key className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
            <p className="text-xs text-stone-400 mt-1">
              If empty, uses the global <code>GEMINI_API_KEY</code> from the environment.
            </p>
          </FormField>

          <div className="sm:col-span-2">
            <FormField label="Welcome Greeting (Initial Message)">
              <textarea
                rows={2}
                value={formData.chatbotGreeting || ""}
                onChange={(e) => setFormData((p) => ({ ...p, chatbotGreeting: e.target.value }))}
                placeholder="Initial message sent when a visitor opens the chat..."
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
            </FormField>
          </div>

          <div className="sm:col-span-2">
            <FormField label="Custom System Prompt & Business Instructions">
              <textarea
                rows={4}
                value={formData.chatbotSystemPrompt || ""}
                onChange={(e) => setFormData((p) => ({ ...p, chatbotSystemPrompt: e.target.value }))}
                placeholder="Add special discounts, promotions, or customized response rules..."
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
              <div className="mt-1.5 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Tip:</strong> Live services, starting prices, office phone numbers, and Saskatoon area service cities are automatically injected from your database into the AI context on every request.
                </span>
              </div>
            </FormField>
          </div>

          <div className="sm:col-span-2 pt-2 border-t border-stone-100">
            <FormField label="Suggested Quick Prompt Chips">
              <TagInput
                tags={formData.chatbotQuickPrompts || []}
                onChange={(prompts) => setFormData((p) => ({ ...p, chatbotQuickPrompts: prompts }))}
                placeholder="Add suggested quick question (press Enter)..."
              />
              <p className="text-xs text-stone-500 mt-1">
                These clickable chips appear when visitors open the chat for quick 1-tap inquiries.
              </p>
            </FormField>
          </div>
        </div>
      </div>

      {/* 6. Special Offer & Discount Inspection Popup */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-200/60 flex items-center justify-center text-[#BE2320]">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                15-Second Discount &amp; Free Inspection Popup
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  Lead Generator
                </span>
              </h3>
              <p className="text-xs text-stone-500">
                Configure the automatic timer popup, discount voucher values, promo code, and inspection booking form.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.popupEnabled}
              onChange={(e) => setFormData((p) => ({ ...p, popupEnabled: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#BE2320]"></div>
            <span className="ml-3 text-sm font-medium text-stone-800">
              {formData.popupEnabled ? "Popup Active" : "Popup Disabled"}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField label="Timer Delay (Seconds)">
            <input
              type="number"
              min="1"
              max="300"
              value={formData.popupDelaySeconds}
              onChange={(e) => setFormData((p) => ({ ...p, popupDelaySeconds: parseInt(e.target.value) || 15 }))}
              placeholder="15"
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
            <p className="text-xs text-stone-400 mt-1">Default is 15 seconds after page load.</p>
          </FormField>

          <FormField label="Discount Badge / Value" required>
            <input
              type="text"
              required
              value={formData.popupDiscountTitle || "$50 OFF"}
              onChange={(e) => setFormData((p) => ({ ...p, popupDiscountTitle: e.target.value }))}
              placeholder="e.g. $50 OFF or 20% OFF"
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
            />
            <p className="text-xs text-stone-400 mt-1">Shown in the discount badge banner.</p>
          </FormField>

          <FormField label="Promo Code">
            <input
              type="text"
              value={formData.popupDiscountCode || "SAVE50"}
              onChange={(e) => setFormData((p) => ({ ...p, popupDiscountCode: e.target.value.toUpperCase() }))}
              placeholder="e.g. SAVE50 or SPECIAL2026"
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 font-mono font-bold focus:outline-none focus:border-[#BE2320]"
            />
            <p className="text-xs text-stone-400 mt-1">Visitors can 1-click copy this code.</p>
          </FormField>

          <div className="sm:col-span-2">
            <FormField label="Discount Subtitle / Offer Details">
              <input
                type="text"
                value={formData.popupDiscountSubtitle || "First-Time Pest Inspection & Treatment"}
                onChange={(e) => setFormData((p) => ({ ...p, popupDiscountSubtitle: e.target.value }))}
                placeholder="e.g. First-Time Pest Inspection & Treatment"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
            </FormField>
          </div>

          <div className="sm:col-span-1">
            <FormField label="Form Header Title">
              <input
                type="text"
                value={formData.popupHeading || "Claim Your Limited-Time Inspection Discount!"}
                onChange={(e) => setFormData((p) => ({ ...p, popupHeading: e.target.value }))}
                placeholder="e.g. Claim Your Limited-Time Discount!"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
            </FormField>
          </div>

          <div className="sm:col-span-3">
            <FormField label="Popup Description / Instructions">
              <textarea
                rows={2}
                value={formData.popupDescription || ""}
                onChange={(e) => setFormData((p) => ({ ...p, popupDescription: e.target.value }))}
                placeholder="Fill out this quick form to claim your discount voucher and book a priority Saskatchewan-certified pest inspection."
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-[#BE2320]"
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* Save Button Footer */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-[#BE2320] hover:bg-[#8E1A18] text-white text-sm font-medium rounded-xl shadow-md transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save Settings Changes
        </button>
      </div>
    </form>
  );
};
