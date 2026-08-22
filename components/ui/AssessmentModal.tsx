"use client";

import React, { useEffect } from "react";
import ContactForm from "@/components/sections/ContactForm";
import { X, Building2, ShieldCheck } from "lucide-react";

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  title?: string;
  subtitle?: string;
}

export function AssessmentModal({
  isOpen,
  onClose,
  defaultService = "Commercial Pest Control & Food Safety",
  title = "Book a Free Site Assessment",
  subtitle = "We’ll walk your site and quote a program — no obligation.",
}: AssessmentModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Commercial Header Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-brand-red text-xs font-mono-data font-bold uppercase tracking-wider border border-red-100">
            <Building2 className="w-3.5 h-3.5" />
            Commercial Assessment
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono-data text-emerald-700 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Audit-Ready Guarantee
          </span>
        </div>

        {/* The Form */}
        <ContactForm
          defaultService={defaultService}
          lockService={true}
          customTitle={title}
          customSubtitle={subtitle}
          isModal={true}
        />
      </div>
    </div>
  );
}
