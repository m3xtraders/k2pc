"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Sparkles,
  ShieldCheck,
  Phone,
  CheckCircle2,
  Tag,
  Copy,
  Check,
  Clock,
  ArrowRight,
  Loader2,
  CalendarCheck,
} from "lucide-react";
import { toast } from "sonner";

interface DiscountInspectionModalProps {
  companyDetails?: any;
  services?: any[];
}

export function DiscountInspectionModal({
  companyDetails,
  services = [],
}: DiscountInspectionModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceNeeded: "General Pest Inspection",
    addressOrCity: "Saskatoon",
    message: "",
  });

  const popupEnabled = companyDetails?.popupEnabled ?? true;
  const delaySeconds = companyDetails?.popupDelaySeconds ?? 15;
  const discountTitle = companyDetails?.popupDiscountTitle || "$50 OFF";
  const discountSubtitle =
    companyDetails?.popupDiscountSubtitle || "First-Time Pest Inspection & Treatment";
  const discountCode = companyDetails?.popupDiscountCode || "SAVE50";
  const heading =
    companyDetails?.popupHeading || "Claim Your Limited-Time Inspection Discount!";
  const description =
    companyDetails?.popupDescription ||
    "Fill out this quick form to claim your discount voucher and book a priority Saskatchewan-certified pest inspection.";

  const phoneDisplay = companyDetails?.phone || "(306) 407-0007";
  const phoneRaw = companyDetails?.phoneRaw || "3064070007";

  // Trigger timer after delaySeconds
  useEffect(() => {
    if (!popupEnabled) return;

    // Check if already dismissed in this session or submitted recently
    const dismissed = sessionStorage.getItem("k2pc_discount_popup_closed");
    const submitted = localStorage.getItem("k2pc_discount_popup_done");

    if (dismissed || submitted) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [popupEnabled, delaySeconds]);

  // Handle Close
  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("k2pc_discount_popup_closed", "true");
  };

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Copy Promo Code
  const handleCopyCode = () => {
    if (!discountCode) return;
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    toast.success(`Promo code "${discountCode}" copied!`);
    setTimeout(() => setCopied(false), 2500);
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Please provide your name and phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email ? formData.email.trim() : undefined,
          serviceNeeded: formData.serviceNeeded,
          addressOrCity: formData.addressOrCity,
          message: `[DISCOUNT CLAIMED: ${discountTitle} (Code: ${discountCode})] ${
            formData.message || "Customer requested inspection via discount popup."
          }`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request.");
      }

      setIsSubmitted(true);
      localStorage.setItem("k2pc_discount_popup_done", "true");
      toast.success("Inspection request sent! We will contact you shortly.");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please call directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="discount-popup-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-300"
    >
      {/* Backdrop Click */}
      <div
        className="fixed inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 z-10 my-auto animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close special offer popup"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-100 hover:bg-brand-red hover:text-white text-stone-600 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-red"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          
          {/* Left Column: Dark Luxury Promotional Banner */}
          <div className="md:col-span-5 bg-[#0E2F48] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Background Decorative Gradient Blobs */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-red/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-action-yellow/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              {/* Badge Eyebrow */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/25 border border-brand-red/50 text-brand-red text-xs font-mono-data uppercase font-bold tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-action-yellow" />
                <span>Special Online Offer</span>
              </div>

              {/* Main Discount Display */}
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-action-yellow tracking-tight leading-none drop-shadow-md">
                  {discountTitle}
                </div>
                <p className="text-sm sm:text-base text-stone-200 font-semibold leading-snug pt-1">
                  {discountSubtitle}
                </p>
              </div>

              {/* Promo Code Copy Pill */}
              {discountCode && (
                <div className="pt-2">
                  <div className="text-[11px] font-mono-data uppercase text-stone-300 font-bold mb-1.5">
                    Your Promo Code:
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono-data font-bold text-sm transition-all cursor-pointer group shadow-sm"
                    title="Click to copy promo code"
                  >
                    <Tag className="w-4 h-4 text-action-yellow shrink-0" />
                    <span className="tracking-widest text-action-yellow">{discountCode}</span>
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <Copy className="w-4 h-4 text-stone-400 group-hover:text-white shrink-0" />
                    )}
                  </button>
                </div>
              )}

              {/* Value Checkpoints */}
              <ul className="space-y-2.5 pt-2 text-xs text-stone-300">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Saskatchewan Ministry Certified Applicators</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Satisfaction &amp; 6-Month Warranty</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pet &amp; Child Safe Eco-Friendly IPM</span>
                </li>
              </ul>
            </div>

            {/* Direct Call Option at bottom of left column */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/15">
              <span className="text-[11px] font-mono-data text-stone-300 block mb-1">
                Prefer to book over the phone?
              </span>
              <a
                href={`tel:${phoneRaw}`}
                className="inline-flex items-center gap-2 text-action-yellow hover:text-white font-mono-data font-bold text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-red fill-brand-red" />
                <span>Call {phoneDisplay} (24/7)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Fast Free Inspection Form */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center bg-white">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h2
                    id="discount-popup-title"
                    className="font-heading font-extrabold text-2xl sm:text-3xl text-ink tracking-tight leading-snug"
                  >
                    {heading}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-text mt-1 leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  {/* Name & Phone in 2-col on tablet/desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono-data font-bold text-stone-700 uppercase mb-1">
                        Full Name <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-ink placeholder-stone-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-data font-bold text-stone-700 uppercase mb-1">
                        Phone Number <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(306) 555-0199"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-ink placeholder-stone-400"
                      />
                    </div>
                  </div>

                  {/* Email & Pest Service in 2-col */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono-data font-bold text-stone-700 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-ink placeholder-stone-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-data font-bold text-stone-700 uppercase mb-1">
                        Pest Concern / Service
                      </label>
                      <select
                        value={formData.serviceNeeded}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            serviceNeeded: e.target.value,
                          }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-ink bg-white cursor-pointer"
                      >
                        <option value="General Pest Inspection">General Pest Inspection</option>
                        <option value="Mice & Rodent Control">Mice &amp; Rodent Control</option>
                        <option value="Bed Bug Treatment">Bed Bug Heat / Chemical Treatment</option>
                        <option value="Ant Extermination">Ant Extermination</option>
                        <option value="Cockroach Control">Cockroach Control</option>
                        <option value="Wasp & Hornet Removal">Wasp &amp; Hornet Removal</option>
                        <option value="Commercial Pest Control">Commercial Pest IPM</option>
                        {services
                          .filter(
                            (s) =>
                              ![
                                "General Pest Inspection",
                                "Mice & Rodent Control",
                                "Bed Bug Treatment",
                                "Ant Extermination",
                              ].includes(s.title)
                          )
                          .map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  {/* City/Location */}
                  <div>
                    <label className="block text-xs font-mono-data font-bold text-stone-700 uppercase mb-1">
                      City / Neighborhood in Saskatchewan
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Saskatoon, Warman, Martensville, Osler..."
                      value={formData.addressOrCity}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          addressOrCity: e.target.value,
                        }))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent text-ink placeholder-stone-400"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-brand-red hover:bg-brand-red-dark active:scale-[0.99] text-white font-heading font-extrabold text-sm sm:text-base shadow-lg shadow-brand-red/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Reserving Your Discount...</span>
                      </>
                    ) : (
                      <>
                        <span>Claim {discountTitle} &amp; Book Inspection</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-stone-400 text-center mt-2">
                    🔒 No obligation &bull; Free cancellation &bull; Upfront pricing guaranteed
                  </p>
                </div>
              </form>
            ) : (
              /* Success Confirmation State */
              <div className="text-center py-6 sm:py-8 space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink">
                    Discount Reserved Successfully!
                  </h3>
                  <p className="text-sm text-neutral-text max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-ink">{formData.name}</strong>! Your{" "}
                    <strong className="text-brand-red">{discountTitle}</strong> voucher (Code:{" "}
                    <strong className="text-ink">{discountCode}</strong>) is locked in for your{" "}
                    <strong className="text-ink">{formData.serviceNeeded}</strong> request.
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-1.5 text-stone-600">
                  <div className="flex items-center gap-2 font-bold text-ink text-sm">
                    <Clock className="w-4 h-4 text-brand-red" />
                    <span>Next Step:</span>
                  </div>
                  <p>
                    Our certified dispatcher is reviewing your request and will call you at{" "}
                    <strong className="text-ink">{formData.phone}</strong> shortly to schedule your inspection window.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-8 py-3 rounded-xl bg-ink hover:bg-ink-surface text-white font-heading font-bold text-sm transition-all cursor-pointer shadow-md"
                  >
                    Continue Browsing Website
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
