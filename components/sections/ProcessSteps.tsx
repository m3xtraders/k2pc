import React from "react";
import { PhoneCall, SearchCheck, Sparkles, RefreshCw, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { COMPANY_DETAILS } from "@/lib/content/company";

const steps = [
  {
    step: 1,
    num: "1",
    title: "Contact",
    tagline: "Fast Dispatch",
    icon: PhoneCall,
    description: "Call or request a free quote online. Our team stands by to quickly confirm your appointment.",
  },
  {
    step: 2,
    num: "2",
    title: "Free Inspection",
    tagline: "Root-Cause Scan",
    icon: SearchCheck,
    description: "A licensed technician finds the pest problem, entry points, and moisture or nesting root causes.",
  },
  {
    step: 3,
    num: "3",
    title: "Targeted Treatment",
    tagline: "Eco & Pet-Safe",
    icon: Sparkles,
    description: "Science-based eradication using low-volatility, family- and pet-safe IPM formulations.",
  },
  {
    step: 4,
    num: "4",
    title: "Follow-Up & Warranty",
    tagline: "Satisfaction Focused",
    icon: RefreshCw,
    description: "We check back and provide free re-treatments throughout your 6-month warranty window.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="pt-20 lg:pt-24 pb-12 lg:pb-14 bg-surface-white text-ink relative overflow-hidden border-t border-stone-200/80">
      {/* Subtle soft ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-red-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-brand-red text-xs font-mono-data font-bold uppercase tracking-widest border border-red-200/70 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
            <span>Our 4-Step System</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight leading-[1.15]">
            How We Permanently Eliminate Pests
          </h2>

          <p className="text-base sm:text-lg text-neutral-text leading-relaxed max-w-2xl mx-auto">
            From first call to follow-up, a proven four-step system that delivers fast, satisfaction-focused results.
          </p>
        </div>

        {/* 4 Connected Process Nodes */}
        <div className="relative">
          {/* Connecting Track Line on Desktop */}
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-brand-red via-action-yellow to-emerald-500 opacity-60 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.step} className="group flex flex-col items-center text-center">
                  {/* Glowing Node Icon Orb */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-red to-[#E53E3E] text-white flex items-center justify-center shadow-lg shadow-brand-red/25 ring-4 ring-white group-hover:scale-110 group-hover:shadow-brand-red/40 transition-all duration-300">
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {/* Numeric Step Badge */}
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#0E2F48] text-white font-mono-data font-black text-xs flex items-center justify-center shadow-md ring-2 ring-white">
                      {item.num}
                    </span>
                  </div>

                  {/* Card Content Box */}
                  <div className="w-full bg-surface-warm hover:bg-white border border-stone-200/90 hover:border-brand-red/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 space-y-2.5 flex-1 flex flex-col justify-between shadow-2xs">
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono-data font-bold uppercase tracking-wider text-brand-red block">
                        {item.tagline}
                      </span>
                      <h3 className="font-heading font-bold text-xl text-ink group-hover:text-brand-red transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-neutral-text leading-relaxed pt-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200/60 flex items-center justify-center gap-1 text-[11px] font-mono-data text-stone-400 group-hover:text-ink transition-colors">
                      <span>Phase {item.num} of 4</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Fast Action Prompt */}
        <div className="mt-14 p-5 sm:p-6 bg-surface-warm rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <p className="text-sm text-stone-700 font-medium">
              Need urgent pest help? Dispatch standing by across Saskatoon &amp; surrounding areas.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-action-yellow hover:bg-amber-400 text-[#0E2F48] font-heading font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Request Free Inspection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
