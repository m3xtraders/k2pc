import React from "react";
import { ShieldCheck, Zap, Leaf, Award, CheckCircle2 } from "lucide-react";

export default function WhyUs() {
  const pillars = [
    {
      id: "01",
      icon: ShieldCheck,
      title: "Saskatchewan Licensed & Insured",
      description:
        "Every technician holds an active structural pesticide applicator license with the Saskatchewan Ministry of Environment, backed by full commercial liability coverage.",
      badge: "Gov Certified",
    },
    {
      id: "02",
      icon: Zap,
      title: "Fast Local Response",
      description:
        "Quick local dispatch across Saskatoon, Warman, Martensville, and surrounding communities — standing by for urgent wasp, rodent, or bed bug calls.",
      badge: "Saskatoon & Area",
    },
    {
      id: "03",
      icon: Leaf,
      title: "Eco-Conscious & Pet-Safe Treatments",
      description:
        "We use non-toxic physical exclusion, targeted gel baits, and low-volatility formulations safe for children, pets, and plants.",
      badge: "Safe IPM",
    },
    {
      id: "04",
      icon: Award,
      title: "99.9% Satisfaction & 6-Month Warranty",
      description:
        "If pests return inside your warranty window, we re-treat your property free of charge until the problem is solved.",
      badge: "Guaranteed",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-[#F4F8FA] via-white to-[#F4F8FA] border-y border-stone-200/80 relative overflow-hidden">
      {/* Subtle background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-red-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50/90 text-brand-red text-xs font-mono-data font-bold uppercase tracking-widest border border-red-200/70 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-red" />
            <span>Why K2 Pest Control</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight leading-[1.15]">
            The Highest Standard in Saskatchewan Pest Control
          </h2>

          <p className="text-base sm:text-lg text-neutral-text leading-relaxed max-w-2xl mx-auto">
            Built on science, safety, and transparent pricing — never high-pressure sales or generic treatments.
          </p>
        </div>

        {/* 4 Feature Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group relative bg-white rounded-2xl p-7 border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-brand-red/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Accent Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-5">
                  {/* Header Row: Icon & Step Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-2xl bg-red-50 text-brand-red border border-red-100 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-2xs">
                      <IconComponent className="w-6 h-6 transition-transform group-hover:rotate-3 duration-300" />
                    </div>
                    <span className="font-mono-data font-extrabold text-xs text-stone-400/80 tracking-wider bg-stone-100/80 px-2.5 py-1 rounded-md">
                      {pillar.id}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2.5">
                    <h3 className="font-heading font-bold text-lg text-ink group-hover:text-brand-red transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-text leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Pill Badge */}
                <div className="pt-6 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono-data font-semibold text-brand-red/90 uppercase tracking-wider">
                    {pillar.badge}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
