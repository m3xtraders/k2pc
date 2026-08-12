"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormField } from "@/components/admin/FormField";
import { TagInput } from "@/components/admin/TagInput";
import { updateBusinessInfoAction } from "@/app/admin/actions";
import { BusinessInfoInput } from "@/lib/validations/businessInfo";
import { Save, Loader2, Phone, MapPin, Clock, Share2, Award } from "lucide-react";

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

  const [formData, setFormData] = useState<BusinessInfoInput>({
    companyName: initialData?.companyName || "K2 Pest Control",
    slogan: initialData?.slogan || "Licensed, Guaranteed & Eco-Conscious Exterminators for Toronto & GTA",
    phone: initialData?.phone || "(416) 555-0199",
    email: initialData?.email || "info@k2pc.ca",
    addressLine1: initialData?.addressLine1 || "1200 Eglinton Ave E, Suite 400",
    addressLine2: initialData?.addressLine2 || "",
    city: initialData?.city || "Toronto",
    province: initialData?.province || "ON",
    postalCode: initialData?.postalCode || "M3C 1H9",
    country: initialData?.country || "Canada",
    latitude: initialData?.latitude || 43.716,
    longitude: initialData?.longitude || -79.336,
    licenseNumber: initialData?.licenseNumber || "ON-849201-P",
    hoursJson: defaultHours,
    serviceAreas: initialData?.serviceAreas || [
      "Toronto",
      "North York",
      "Etobicoke",
      "Scarborough",
      "Mississauga",
      "Brampton",
      "Vaughan",
      "Markham",
      "Oakville",
      "Richmond Hill",
      "Burlington",
    ],
    facebookUrl: initialData?.facebookUrl || "",
    instagramUrl: initialData?.instagramUrl || "",
    twitterUrl: initialData?.twitterUrl || "",
    linkedinUrl: initialData?.linkedinUrl || "",
    googleBusinessUrl: initialData?.googleBusinessUrl || "",
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
              placeholder="e.g. ON-849201-P"
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
        </div>
      </div>

      {/* 3. Business Hours & Service Areas */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-6">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
          <Clock className="w-5 h-5 text-[#BE2320]" />
          Operating Hours & Service Regions
        </h3>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase text-stone-500">Business Hours</p>
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

          <div className="pt-4 border-t border-stone-100">
            <FormField label="Service Area Cities (Regions Served)">
              <TagInput
                tags={formData.serviceAreas || []}
                onChange={(cities) => setFormData((p) => ({ ...p, serviceAreas: cities }))}
                placeholder="Add city (e.g. Toronto, Mississauga)..."
              />
            </FormField>
          </div>
        </div>
      </div>

      {/* 4. Social Links */}
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
