import React from "react";
import { DollarSign, UserCheck, ClipboardList, ShieldCheck } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Cost Savings",
    description:
      "Reduce expenses while maintaining quality by choosing smart, efficient pest control solutions that maximize value and protect your property long-term.",
  },
  {
    icon: UserCheck,
    title: "Professional Expertise",
    description:
      "Leverage our skilled, licensed technicians to deliver high-quality results with efficiency and reliability — every visit, every time.",
  },
  {
    icon: ClipboardList,
    title: "Customized Plans",
    description:
      "Get tailored pest management solutions designed specifically for your property type, pest species, and unique situation in Saskatoon and the surrounding area.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="pt-10 pb-20 lg:pb-24 bg-surface-white relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-red-50/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-brand-red text-xs font-mono-data font-bold uppercase tracking-widest border border-red-200/70 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
            <span>Key Benefits</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight leading-[1.15]">
            Professional Pest Control Services: Protecting Your Saskatoon Property
          </h2>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={i}
                className="group relative bg-surface-warm hover:bg-white rounded-2xl p-8 text-center border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-brand-red/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center space-y-4"
              >
                {/* Icon circle */}
                <div className="w-16 h-16 rounded-2xl bg-red-50 text-brand-red border border-red-100 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-2xs">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="font-heading font-bold text-xl text-ink group-hover:text-brand-red transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-neutral-text leading-relaxed">
                  {benefit.description}
                </p>

                {/* Subtle animated underline accent */}
                <div className="w-12 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
