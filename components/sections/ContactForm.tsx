"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "@/lib/validations";
import { SERVICES } from "@/lib/content/services";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      serviceNeeded: "",
      addressOrCity: "",
      message: "",
    },
  });

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
      <div className="bg-emerald-50 border-2 border-emerald-300 p-8 rounded-2xl text-center space-y-4 shadow-sm animate-in fade-in-50">
        <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="font-heading font-extrabold text-2xl text-emerald-950">
          Quote Request Received!
        </h3>
        <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
          Thank you for contacting K2 Pest Control. A local GTA technician is reviewing your details and will call you within 15 minutes.
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
      className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-md space-y-5"
      noValidate
    >
      <div className="space-y-1">
        <h3 className="font-heading font-extrabold text-2xl text-ink">
          Request a Free Quote
        </h3>
        <p className="text-xs sm:text-sm text-neutral-text">
          Fast response within 15 minutes. No spam, guaranteed pricing.
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
          Full Name <span className="text-brand-red">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Sarah Jenkins"
          {...register("name")}
          className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors text-ink placeholder:text-stone-400 bg-white ${
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

      {/* Field 2: Phone */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="phone" className="block text-xs font-bold text-ink uppercase tracking-wider font-mono-data">
          Phone Number <span className="text-brand-red">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="e.g. (416) 555-0199"
          {...register("phone")}
          className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors text-ink placeholder:text-stone-400 bg-white ${
            errors.phone
              ? "border-brand-red focus:ring-2 focus:ring-brand-red"
              : "border-stone-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red"
          }`}
        />
        {errors.phone && (
          <p className="text-xs font-semibold text-brand-red flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.phone.message}</span>
          </p>
        )}
      </div>

      {/* Field 3: Service Needed */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="serviceNeeded" className="block text-xs font-bold text-ink uppercase tracking-wider font-mono-data">
          Service Needed <span className="text-brand-red">*</span>
        </label>
        <select
          id="serviceNeeded"
          {...register("serviceNeeded")}
          className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors text-ink bg-white ${
            errors.serviceNeeded
              ? "border-brand-red focus:ring-2 focus:ring-brand-red"
              : "border-stone-300 focus:border-brand-red focus:ring-1 focus:ring-brand-red"
          }`}
        >
          <option value="">-- Select Pest or Service --</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Other / Emergency Inspection">Other / Emergency Inspection</option>
        </select>
        {errors.serviceNeeded && (
          <p className="text-xs font-semibold text-brand-red flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.serviceNeeded.message}</span>
          </p>
        )}
      </div>

      {/* Field 4: Address/City */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="addressOrCity" className="block text-xs font-bold text-ink uppercase tracking-wider font-mono-data">
          Address or GTA City <span className="text-brand-red">*</span>
        </label>
        <input
          id="addressOrCity"
          type="text"
          placeholder="e.g. 120 Yonge St, Toronto or Mississauga"
          {...register("addressOrCity")}
          className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors text-ink placeholder:text-stone-400 bg-white ${
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

      {/* Field 5: Brief Message */}
      <div className="space-y-1.5 text-left">
        <label htmlFor="message" className="block text-xs font-bold text-ink uppercase tracking-wider font-mono-data">
          Brief Details (Optional)
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder="Describe pest location (e.g. attic noises, kitchen ant trail)..."
          {...register("message")}
          className="w-full px-4 py-3 rounded-lg border border-stone-300 text-sm transition-colors text-ink placeholder:text-stone-400 focus:border-brand-red focus:ring-1 focus:ring-brand-red bg-white"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        variant="primary"
        size="lg"
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Send Quote Request</span>
          </>
        )}
      </Button>

      <p className="text-[11px] text-center text-neutral-text font-mono-data">
        🔒 Your phone number is kept confidential and only used for service dispatch.
      </p>
    </form>
  );
}
