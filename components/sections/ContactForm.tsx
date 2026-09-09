"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "@/lib/validations";
import { SERVICES } from "@/lib/content/services";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, Loader2, Send, Building2, Mail, Phone } from "lucide-react";

interface ContactFormProps {
  defaultService?: string;
  lockService?: boolean;
  customTitle?: string;
  customSubtitle?: string;
  onSuccess?: () => void;
  isModal?: boolean;
}

// Helper to only allow digits and optional leading '+'
const sanitizePhoneNumber = (val: string) => {
  if (!val) return "";
  let cleaned = val.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) {
    cleaned = "+" + cleaned.slice(1).replace(/\+/g, "");
  } else {
    cleaned = cleaned.replace(/\+/g, "");
  }
  return cleaned;
};

// Helper to normalize pest/service names from params or defaultService
const normalizeService = (val: string): string => {
  if (!val) return "";
  const lower = val.toLowerCase().trim();
  if (lower.includes("bed bug") || lower.includes("bed-bug")) return "Bed Bug";
  if (lower.includes("cockroach") || lower.includes("roach")) return "Cockroach";
  if (lower.includes("mosquito")) return "Mosquito";
  if (lower.includes("ant")) return "Ant";
  if (lower.includes("mice") || lower.includes("mouse") || lower.includes("rodent") || lower.includes("rat")) return "Mice";
  if (lower.includes("wasp") || lower.includes("hornet") || lower.includes("yellowjacket")) return "Wasp";
  if (lower.includes("spider")) return "Spider";
  if (lower.includes("residential") || lower.includes("home")) return "Residential Pest Control";
  if (lower.includes("food safety") || lower.includes("commercial-pest-control")) return "Commercial Pest Control & Food Safety";
  if (lower.includes("restaurant") || lower.includes("kitchen")) return "Commercial Restaurant & Kitchen Defense";
  if (lower.includes("warehouse") || lower.includes("industrial")) return "Commercial Warehouse & Logistics IPM";
  if (lower.includes("multi-unit") || lower.includes("property management")) return "Commercial Property Management & Multi-Unit";
  if (lower.includes("termite")) return "Termite Inspection & Barrier Treatment";
  if (lower.includes("wildlife") || lower.includes("raccoon") || lower.includes("squirrel")) return "Humane Wildlife Removal";
  if (lower.includes("seasonal")) return "Seasonal Pest Prevention Plans";
  return val;
};

export default function ContactForm({
  defaultService,
  lockService = false,
  customTitle,
  customSubtitle,
  onSuccess,
  isModal = false,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceNeeded: defaultService ? normalizeService(defaultService) : "",
      addressOrCity: "",
      message: "",
    },
  });

  const phoneRegister = register("phone");

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow navigation, deletion, copy/paste shortcuts
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "Tab" ||
      e.key === "Enter" ||
      e.key === "Home" ||
      e.key === "End" ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }

    // Allow '+' only at index 0 and if not already present
    if (e.key === "+") {
      const input = e.currentTarget;
      const isAtStart = input.selectionStart === 0;
      const hasPlus = input.value.includes("+");
      const isReplacingPlus = hasPlus && input.selectionStart === 0 && (input.selectionEnd ?? 0) > 0;
      if (isAtStart && (!hasPlus || isReplacingPlus)) {
        return;
      }
      e.preventDefault();
      return;
    }

    // Allow digits 0-9
    if (/^[0-9]$/.test(e.key)) {
      return;
    }

    // Block any other characters (letters, spaces, dashes, parentheses, symbols)
    e.preventDefault();
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const sanitized = sanitizePhoneNumber(pasted);
    const input = e.currentTarget;
    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    const current = input.value;
    const updated = sanitizePhoneNumber(current.slice(0, start) + sanitized + current.slice(end));
    input.value = updated;
    setValue("phone", updated, { shouldValidate: true });
  };

  useEffect(() => {
    if (defaultService) {
      setValue("serviceNeeded", normalizeService(defaultService));
    } else if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service") || params.get("pest");
      if (serviceParam) {
        setValue("serviceNeeded", normalizeService(serviceParam));
      }
    }
  }, [defaultService, setValue]);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit request.");
      }

      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("An unexpected error occurred. Please call us directly.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-emerald-50 border-2 border-emerald-300 p-6 sm:p-8 rounded-2xl text-center space-y-4 shadow-sm animate-in fade-in-50">
        <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-heading font-extrabold text-2xl text-emerald-950">
          Request Received!
        </h3>
        <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
          Thank you for contacting K2 Pest Control. Our dispatch specialist is reviewing your inquiry and will contact you promptly.
        </p>
        <div className="pt-2">
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            size="sm"
            className="border-emerald-700 text-emerald-900 hover:bg-emerald-100"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${
        isModal ? "p-0 space-y-4" : "bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-md space-y-5"
      }`}
      noValidate
    >
      <div className="space-y-1 text-left">
        <h3 className="font-heading font-extrabold text-2xl text-ink">
          {customTitle || "Request a Free Quote"}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-text">
          {customSubtitle || "Fast response within 15 minutes. No spam, guaranteed pricing."}
        </p>
      </div>

      {serverError && (
        <div className="p-3 bg-red-50 border border-red-200 text-brand-red rounded-lg text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Field 1: Name */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="name" className="block text-xs font-bold text-ink uppercase tracking-wider font-mono-data">
          Contact Name / Business Contact <span className="text-brand-red">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Sarah Jenkins"
          {...register("name")}
          className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border text-sm transition-colors text-ink placeholder:text-stone-400 bg-white ${
            errors.name
              ? "border-brand-red focus:ring-2 focus:ring-brand-red"
              : "border-stone-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red"
          }`}
        />
        {errors.name && (
          <p className="text-xs font-semibold text-brand-red flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.name.message}</span>
          </p>
        )}
      </div>

      {/* Field 2 & 3: Phone & Email in a 2-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="phone" className="block text-xs font-bold text-ink uppercase tracking-wider font-mono-data">
            Phone Number <span className="text-brand-red">*</span> <span className="text-stone-400 text-[10px] font-normal normal-case">(numbers and + only)</span>
          </label>
          <div className="relative">
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              placeholder="e.g. +13064070007 or 3064070007"
              {...phoneRegister}
              onKeyDown={handlePhoneKeyDown}
              onPaste={handlePhonePaste}
              onChange={(e) => {
                const cleaned = sanitizePhoneNumber(e.target.value);
                e.target.value = cleaned;
                phoneRegister.onChange(e);
              }}
              className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border text-sm transition-colors text-ink placeholder:text-stone-400 bg-white ${
                errors.phone
                  ? "border-brand-red focus:ring-2 focus:ring-brand-red"
                  : "border-stone-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs font-semibold text-brand-red flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.phone.message}</span>
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5 text-left">
          <label htmlFor="email" className="block text-xs font-bold text-ink uppercase tracking-wider font-mono-data">
            Email Address <span className="text-neutral-text text-[10px] lowercase font-normal">(optional)</span>
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="e.g. sarah@example.com"
              {...register("email")}
              className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border text-sm transition-colors text-ink placeholder:text-stone-400 bg-white ${
                errors.email
                  ? "border-brand-red focus:ring-2 focus:ring-brand-red"
                  : "border-stone-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs font-semibold text-brand-red flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>
      </div>

      {/* Field 4: Service Needed */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="serviceNeeded" className="block text-xs font-bold text-ink uppercase tracking-wider font-mono-data">
          Selected Service / Facility Program <span className="text-brand-red">*</span>
        </label>

        {lockService && defaultService ? (
          <div className="p-3.5 rounded-xl bg-red-50/90 border border-red-200/90 shadow-2xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-brand-red text-white flex items-center justify-center shrink-0 shadow-xs">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="font-heading font-bold text-xs sm:text-sm text-ink block truncate">
                  {defaultService}
                </span>
                <span className="text-[10px] font-mono-data text-stone-500 block">
                  Commercial Facility Assessment Program
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-[10px] font-mono-data font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
              ✓ Pre-Selected
            </span>

            {/* Hidden Input ensuring form submission receives the locked value */}
            <input
              type="hidden"
              id="serviceNeeded"
              value={defaultService}
              {...register("serviceNeeded")}
            />
          </div>
        ) : (
          <select
            id="serviceNeeded"
            {...register("serviceNeeded")}
            className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border text-sm transition-colors text-ink bg-white cursor-pointer ${
              errors.serviceNeeded
                ? "border-brand-red focus:ring-2 focus:ring-brand-red"
                : "border-stone-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red"
            }`}
          >
            <option value="">-- Select Pest or Facility Type --</option>
            {/* Top requested priority pests in exact order */}
            <option value="Bed Bug">Bed Bug</option>
            <option value="Cockroach">Cockroach</option>
            <option value="Mosquito">Mosquito</option>
            <option value="Ant">Ant</option>
            <option value="Mice">Mice</option>
            <option value="Wasp">Wasp</option>
            <option value="Spider">Spider</option>

            {/* Everything after that */}
            <option value="Residential Pest Control">Residential Pest Control</option>
            <option value="Commercial Pest Control & Food Safety">
              🏢 Commercial Pest Control &amp; Food Safety
            </option>
            <option value="Commercial Restaurant & Kitchen Defense">
              🍽️ Restaurant &amp; Food Service Program
            </option>
            <option value="Commercial Warehouse & Logistics IPM">
              🏭 Warehouse &amp; Industrial Facility
            </option>
            <option value="Commercial Property Management & Multi-Unit">
              🏬 Multi-Unit Residential &amp; Property Management
            </option>
            <option value="Termite Inspection & Barrier Treatment">
              Termite Inspection &amp; Barrier Treatment
            </option>
            <option value="Humane Wildlife Removal">Humane Wildlife Removal</option>
            <option value="Seasonal Pest Prevention Plans">Seasonal Pest Prevention Plans</option>
            <option value="Other / Emergency Inspection">Other / Custom Facility Inspection</option>
          </select>
        )}

        {errors.serviceNeeded && (
          <p className="text-xs font-semibold text-brand-red flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.serviceNeeded.message}</span>
          </p>
        )}
      </div>

      {/* Field 5: Address/City */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="addressOrCity" className="block text-xs font-bold text-ink uppercase tracking-wider font-mono-data">
          Property Address or Saskatoon Area City <span className="text-brand-red">*</span>
        </label>
        <input
          id="addressOrCity"
          type="text"
          placeholder="e.g. 1200 Central Ave, Saskatoon or Warman"
          {...register("addressOrCity")}
          className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border text-sm transition-colors text-ink placeholder:text-stone-400 bg-white ${
            errors.addressOrCity
              ? "border-brand-red focus:ring-2 focus:ring-brand-red"
              : "border-stone-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red"
          }`}
        />
        {errors.addressOrCity && (
          <p className="text-xs font-semibold text-brand-red flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.addressOrCity.message}</span>
          </p>
        )}
      </div>

      {/* Field 6: Brief Message */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="message" className="block text-xs font-bold text-ink uppercase tracking-wider font-mono-data">
          Facility Details or Urgency (Optional)
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder="Describe your facility size, pest concerns, or preferred inspection time..."
          {...register("message")}
          className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-stone-300 text-sm transition-colors text-ink placeholder:text-stone-400 focus:border-brand-red focus:ring-1 focus:ring-brand-red bg-white"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        variant="primary"
        size="lg"
        className="w-full justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting Request...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>{isModal ? "Book Site Assessment →" : "Submit Free Quote Request →"}</span>
          </>
        )}
      </Button>

      <p className="text-[11px] text-center text-neutral-text font-mono-data">
        🔒 Confidential &bull; Licensed Exterminator Inspection &bull; Zero Obligation
      </p>
    </form>
  );
}
