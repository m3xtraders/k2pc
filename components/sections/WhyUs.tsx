import React from "react";
import { ShieldCheck, Clock, Leaf, Award } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/content/company";

export default function WhyUs() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Ontario Ministry Licensed & Insured",
      description: `Every technician holds active License #${COMPANY_DETAILS.licenseNumber} with $5,000,000 commercial liability & full WSIB coverage.`,
    },
    {
      icon: Clock,
      title: "Same-Day Emergency 2-Hour Response",
      description: "Fast local dispatch across all 11 GTA municipalities. Standing by 24/7 for urgent wasp, rodent, or bed bug calls.",
    },
    {
      icon: Leaf,
      title: "Eco-Conscious & Pet-Safe IPM",
      description: "We use non-toxic physical exclusion, target gel baits, and low-volatility formulations safe for children, pets, and plants.",
    },
    {
      icon: Award,
      title: "100% Satisfaction & 6-Mo Warranty",
      description: "If pests return inside your written warranty window, we re-treat your property free of charge until the problem is solved.",
    },
  ];

  return (
    <section className="py-16 bg-surface-warm border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Why K2PC
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
            The Highest Standard in Canadian Pest Control
          </h2>
          <p className="text-base text-neutral-text">
            Built on science, safety, and transparent pricing — never high-pressure sales or generic treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs hover:shadow-md hover:border-brand-red/40 transition-all space-y-4 text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-red-100 text-brand-red flex items-center justify-center font-bold">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-ink leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm text-neutral-text leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
