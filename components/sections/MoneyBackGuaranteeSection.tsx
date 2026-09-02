import React from "react";
import { ShieldCheck, RefreshCw, CircleDollarSign, Award, ArrowRight, PhoneCall, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { COMPANY_DETAILS } from "@/lib/content/company";

interface MoneyBackGuaranteeSectionProps {
  className?: string;
  phone?: string;
  phoneRaw?: string;
}

export default function MoneyBackGuaranteeSection({
  className = "",
  phone,
  phoneRaw,
}: MoneyBackGuaranteeSectionProps) {
  const activePhone = phone || COMPANY_DETAILS.phone;
  const activePhoneRaw = phoneRaw || COMPANY_DETAILS.phoneRaw;

  const guaranteePillars = [
    {
      icon: RefreshCw,
      title: "Free Re-Treatment",
      subtitle: "Within Guarantee Window",
      description:
        "If pests return within your written guarantee period, our team comes back and re-treats your property completely free of charge.",
      badge: "Zero Extra Cost",
    },
    {
      icon: CircleDollarSign,
      title: "Not Satisfied? Full Refund",
      subtitle: "100% Money-Back in Writing",
      description:
        "We stand by our results. If pests persist and we cannot resolve the issue, you receive a full 100% refund — no hassles or arguments.",
      badge: "Risk-Free Guarantee",
    },
    {
      icon: Award,
      title: "Saskatchewan-Licensed Technicians",
      subtitle: "Ministry Certified Applicators",
      description:
        "Every treatment is executed by fully licensed Saskatchewan Ministry of Environment applicators with comprehensive liability insurance.",
      badge: "Gov Certified & Insured",
    },
  ];

  return (
    <section className={`py-16 lg:py-20 bg-surface-warm relative overflow-hidden border-y border-stone-200/90 ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-red-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Main Guarantee Highlight Card */}
        <div className="bg-white rounded-3xl border-2 border-brand-red/20 shadow-xl overflow-hidden p-8 sm:p-10 lg:p-12 relative">
          {/* Subtle Top Red Accent Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-red via-action-yellow to-brand-red" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: 100% Money Back Badge Display */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
              <div className="relative group">
                {/* Glow ring */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-brand-red via-red-400 to-action-yellow rounded-full blur-lg opacity-40 group-hover:opacity-60 transition duration-500 animate-pulse" />

                {/* 100% Money Back Circular Badge */}
                <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-br from-[#EF4444] via-[#BE2320] to-[#8E1A18] text-white p-3 shadow-2xl flex flex-col items-center justify-center ring-4 ring-white border-2 border-brand-red/30 select-none">
                  {/* Dashed inner circle */}
                  <div className="w-full h-full rounded-full border-2 border-dashed border-white/80 flex flex-col items-center justify-center p-3 text-center space-y-1">
                    {/* 5 Stars */}
                    <div className="flex items-center justify-center gap-1 text-white">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white drop-shadow-xs" />
                      ))}
                    </div>

                    {/* 100% Big Number */}
                    <div className="font-heading font-black text-4xl sm:text-5xl leading-none text-white tracking-tight drop-shadow-md">
                      100%
                    </div>

                    {/* MONEY BACK text */}
                    <div className="font-heading font-extrabold text-xs sm:text-sm tracking-widest uppercase text-white/95 leading-tight pt-0.5 drop-shadow-xs">
                      MONEY BACK
                    </div>

                    <div className="text-[9px] sm:text-[10px] font-mono-data uppercase tracking-wider text-action-yellow font-bold">
                      GUARANTEE
                    </div>
                  </div>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 mt-4 text-xs font-mono-data font-bold text-ink uppercase tracking-wide bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
                Written In Every Agreement
              </span>
            </div>

            {/* Right: Guarantee Statement & Details */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-brand-red text-xs font-mono-data font-bold uppercase tracking-widest border border-red-200/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
                  <span>Saskatoon’s Strongest Pest Promise</span>
                </div>

                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight leading-tight">
                  100% Money-Back Guarantee
                </h2>

                <p className="text-base sm:text-lg text-neutral-text leading-relaxed">
                  We don’t just spray and walk away. Every service is backed by our unconditional guarantee — if the pests are not gone, you don’t pay.
                </p>
              </div>

              {/* Quick Highlight Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-warm border border-stone-200/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-heading font-bold text-ink leading-snug">
                    Free Re-treatment
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-warm border border-stone-200/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-heading font-bold text-ink leading-snug">
                    Full Money Refund
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-warm border border-stone-200/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-heading font-bold text-ink leading-snug">
                    Ministry Licensed
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${activePhoneRaw}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-red hover:bg-brand-red-dark text-white font-heading font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 text-action-yellow" />
                  <span>Call {activePhone}</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-ink hover:bg-ink-surface text-white font-heading font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <span>Book Free Inspection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guaranteePillars.map((item, i) => {
            const IconComp = item.icon;
            return (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-7 border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-brand-red/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4 overflow-hidden"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-brand-red border border-red-100 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors duration-300 shadow-2xs">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono-data font-bold text-brand-red bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-lg text-ink group-hover:text-brand-red transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono-data text-stone-400 block pt-0.5">
                      {item.subtitle}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-text leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-mono-data text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Guaranteed in Writing</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
