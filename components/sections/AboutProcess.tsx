import React from "react";
import { PhoneCall, SearchCheck, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { COMPANY_DETAILS } from "@/lib/content/company";

export default function AboutProcess() {
  const steps = [
    {
      num: "1",
      stepBadge: "Step 01",
      title: "You call. The owner answers.",
      tag: "Same day, schedule allowing",
      icon: PhoneCall,
      description:
        "Straight answers and a real time window, not a call-centre script.",
      benefit: "Direct owner access & fast booking",
    },
    {
      num: "2",
      stepBadge: "Step 02",
      title: "Free inspection, one written quote.",
      tag: "No hidden fees",
      icon: SearchCheck,
      description:
        "We find where they’re getting in, then quote the whole job up front. One price, guarantee included.",
      benefit: "Upfront pricing in writing",
    },
    {
      num: "3",
      stepBadge: "Step 03",
      title: "Treated, then guaranteed.",
      tag: "Money-back in writing",
      icon: ShieldCheck,
      description:
        "Low-toxicity treatment done right. Pests return? Re-treat free. Still not fixed? Full refund.",
      benefit: "100% money-back guarantee",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-surface-white relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-red-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-brand-red text-xs font-mono-data font-bold uppercase tracking-widest border border-red-200/80 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-red" />
            <span>How We Work</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight leading-[1.15]">
            Simple, Transparent &amp; Guaranteed
          </h2>

          <p className="text-base sm:text-lg text-neutral-text leading-relaxed max-w-2xl mx-auto">
            From your very first phone call to complete pest eradication — no surprises, no call-centre scripts, just honest Saskatchewan service.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-10 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-brand-red via-action-yellow to-emerald-500 opacity-40 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 relative z-10">
            {steps.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.num}
                  className="group flex flex-col items-center text-center"
                >
                  {/* Step Orb */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-red to-[#E53E3E] text-white flex items-center justify-center shadow-xl shadow-brand-red/20 ring-4 ring-white group-hover:scale-105 group-hover:shadow-brand-red/35 transition-all duration-300">
                      <IconComp className="w-9 h-9" />
                    </div>
                    {/* Big number badge */}
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-ink text-white font-mono-data font-black text-sm flex items-center justify-center shadow-md ring-2 ring-white">
                      {item.num}
                    </span>
                  </div>

                  {/* Card Container */}
                  <div className="w-full bg-surface-warm hover:bg-white border border-stone-200/90 hover:border-brand-red/40 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex-1 flex flex-col justify-between space-y-4 shadow-2xs">
                    <div className="space-y-3">
                      <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-brand-red font-mono-data text-xs font-bold uppercase tracking-wide border border-red-100">
                        {item.tag}
                      </div>

                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink group-hover:text-brand-red transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-sm text-neutral-text leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-200/70 flex items-center justify-center gap-2 text-xs font-mono-data text-brand-red font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.benefit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="p-6 sm:p-8 bg-surface-warm rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-lg sm:text-xl text-ink">
              Ready to talk directly with our owner?
            </h4>
            <p className="text-sm text-neutral-text">
              Call {COMPANY_DETAILS.phone} or book your free property inspection online.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-ink hover:bg-ink-surface text-white font-heading font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              <PhoneCall className="w-4 h-4 text-action-yellow" />
              <span>{COMPANY_DETAILS.phone}</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-red hover:bg-brand-red-dark text-white font-heading font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
