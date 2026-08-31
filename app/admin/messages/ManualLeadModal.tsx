"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { createManualLeadAction } from "@/app/admin/actions";
import {
  X,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Bug,
  Globe,
  Camera,
  MessageCircle,
  PhoneCall,
  Megaphone,
  Users,
  Loader2,
} from "lucide-react";

interface ManualLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCreated: (newLead: any) => void;
}

const SOURCE_OPTIONS = [
  { value: "Phone Call", label: "📱 Phone Call", icon: PhoneCall },
  { value: "Instagram", label: "📷 Instagram Direct", icon: Camera },
  { value: "WhatsApp", label: "💬 WhatsApp Message", icon: MessageCircle },
  { value: "Ads", label: "📢 Paid Ads (Google / FB)", icon: Megaphone },
  { value: "Referral", label: "🤝 Referral / Word of Mouth", icon: Users },
  { value: "Walk-in", label: "🚶 Walk-in / On-Site Client", icon: UserPlus },
  { value: "Other", label: "🌐 Other Channel", icon: Globe },
];

const SERVICE_PRESETS = [
  "Ant Control & Colony Elimination",
  "Rodent Control & Proofing",
  "Cockroach Control & Extermination",
  "Bed Bug Heat Treatment",
  "Wasp & Hornet Nest Removal",
  "Spider Control & De-Webbing",
  "Commercial Pest Control & Food Safety",
  "Commercial: Restaurants & Bars",
  "Commercial: Warehouses & Logistics",
  "Commercial: Property Management",
  "General Inspection / Emergency Call",
];

export const ManualLeadModal: React.FC<ManualLeadModalProps> = ({
  isOpen,
  onClose,
  onLeadCreated,
}) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Toronto",
    service: "General Inspection / Emergency Call",
    source: "Phone Call",
    status: "NEW",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Customer name and phone number are required");
      return;
    }

    setLoading(true);

    try {
      const res = await createManualLeadAction({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        city: formData.city || null,
        service: formData.service || null,
        source: formData.source,
        status: formData.status,
        notes: formData.notes || null,
      });

      if (res.success && res.lead) {
        toast.success(`Lead for "${formData.name}" added to pipeline!`);
        onLeadCreated(res.lead);
        onClose();
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          city: "Toronto",
          service: "General Inspection / Emergency Call",
          source: "Phone Call",
          status: "NEW",
          notes: "",
        });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create manual lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-[#BE2320] flex items-center justify-center font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-xl text-stone-900">
                Create Manual Lead
              </h3>
              <p className="text-xs text-stone-500">
                Record inquiries from phone calls, WhatsApp, Instagram, or referrals.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Row 1: Source Channel & Pipeline Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase font-mono-data mb-1">
                Lead Source Channel <span className="text-[#BE2320]">*</span>
              </label>
              <select
                value={formData.source}
                onChange={(e) => setFormData((p) => ({ ...p, source: e.target.value }))}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#BE2320] font-medium"
              >
                {SOURCE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase font-mono-data mb-1">
                Initial Pipeline Stage
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value }))}
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:border-[#BE2320] font-medium"
              >
                <option value="NEW">🟢 New Lead</option>
                <option value="CONTACTED">🟡 Contacted / In Touch</option>
                <option value="SCHEDULED">🔵 Inspection Scheduled</option>
                <option value="IN_PROGRESS">🟣 Treatment In Progress</option>
                <option value="CLOSED">✅ Closed / Paid</option>
                <option value="LOST">⚪ Lost / Cancelled</option>
              </select>
            </div>
          </div>

          {/* Row 2: Customer Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase font-mono-data mb-1">
                Customer / Business Name <span className="text-[#BE2320]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. John Doe or Bistro 9"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase font-mono-data mb-1">
                Phone Number <span className="text-[#BE2320]">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                placeholder="e.g. (306) 407-0007"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320]"
              />
            </div>
          </div>

          {/* Row 3: Email & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase font-mono-data mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                placeholder="e.g. customer@example.com"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 uppercase font-mono-data mb-1">
                GTA City / Municipality
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                placeholder="e.g. Toronto, Mississauga, Vaughan"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320]"
              />
            </div>
          </div>

          {/* Row 4: Service / Pest Type */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase font-mono-data mb-1">
              Service / Pest Inquiry
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320]"
            >
              {SERVICE_PRESETS.map((srv) => (
                <option key={srv} value={srv}>
                  {srv}
                </option>
              ))}
            </select>
          </div>

          {/* Row 5: Notes */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase font-mono-data mb-1">
              Inquiry Details / Call Notes
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
              placeholder="e.g. Caller mentioned wasp nest under second-floor eaves. Available Tuesday after 2 PM."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-xl text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#BE2320]/20 focus:border-[#BE2320] leading-relaxed"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#BE2320] hover:bg-[#8E1A18] text-white text-xs sm:text-sm font-bold font-heading rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Lead...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Save Lead to Pipeline</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
