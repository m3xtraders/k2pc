import React from "react";
import { Search, ShieldAlert, ShieldCheck } from "lucide-react";

export default function ProcessSteps() {
  const steps = [
    {
      step: 1,
      title: "Inspect & Trace",
      icon: Search,
      description:
        "Our licensed exterminator conducts a 360° inspection of your interior rooms, moisture hot-spots, wall cavities, and exterior foundation gaps to locate the parent pest nest.",
    },
    {
      step: 2,
      title: "Targeted Eradication",
      icon: ShieldAlert,
      description:
        "Using eco-conscious IPM methods — non-repellent micro-baits, thermal heat, or perimeter barriers — we eradicate active adult pests and halt egg hatch cycles safely.",
    },
    {
      step: 3,
      title: "Exclusion & Protect",
      icon: ShieldCheck,
      description:
        "We seal structural entry holes with galvanized steel mesh and silicone, applying long-lasting exterior defense barriers backed by our written 6-month warranty.",
    },
  ];

  return (
    <section className="py-16 bg-surface-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Our 3-Step System
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
            How We Permanently Eliminate Pests
          </h2>
          <p className="text-base text-neutral-text">
            A systematic, inspection-first approach that addresses the root cause of infestation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-surface-warm p-8 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-6 group hover:border-brand-red transition-all"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-full bg-brand-red text-white font-mono-data font-bold text-lg flex items-center justify-center shadow-sm">
                    0{item.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white text-brand-red flex items-center justify-center shadow-xs border border-stone-200 group-hover:bg-brand-red group-hover:text-action-yellow transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-heading font-bold text-2xl text-ink">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-text leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200 text-xs font-mono-data text-brand-red font-semibold">
                  Step 0{item.step} of 03 Complete Protocol
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
