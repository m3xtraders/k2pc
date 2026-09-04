import React from "react";
import { Leaf, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function EcoFriendlyCTA() {
  return (
    <section className="py-20 lg:py-24 bg-ink border-y border-[#1C4E75]/50 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #BE2320 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, #F2B705 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-xs font-mono-data font-bold text-action-yellow uppercase tracking-widest bg-brand-red/20 px-3.5 py-1.5 rounded-full border border-brand-red/40 shadow-2xs">
              <Leaf className="w-3.5 h-3.5 text-action-yellow" />
              <span>Safe &amp; Eco-Friendly</span>
            </span>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
              Safe and Eco-Friendly{" "}
              <span className="text-brand-red">Pest Control</span> Methods
            </h2>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-xl">
              We use non-toxic, environmentally friendly treatments that
              effectively eliminate pests while keeping your family, pets, and
              surroundings safe. Our{" "}
              <strong className="text-white font-semibold">
                Integrated Pest Management (IPM)
              </strong>{" "}
              approach targets pests at the source without unnecessary chemical
              exposure — safe for children, pets, and plants across Saskatoon
              homes and properties.
            </p>

            {/* Checklist */}
            <ul className="space-y-3 text-sm text-stone-200">
              {[
                "Non-toxic, low-volatility formulations",
                "Pet & child safe on every treatment",
                "Eco-conscious perimeter barriers",
                "Zero unnecessary chemical use",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-brand-red/25 border border-brand-red/40 text-action-yellow flex items-center justify-center shadow-2xs">
                    <Check className="w-3.5 h-3.5 text-brand-red" strokeWidth={3} />
                  </span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="pt-3">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="inline-flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
              >
                Get a Free Quote
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right: Visual stats panel */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {[
              { value: "100%", label: "Non-Toxic Treatments", variant: "red" },
              { value: "6-Mo", label: "Warranty", variant: "yellow" },
              { value: "Safe", label: "For Kids & Pets", variant: "red" },
              { value: "IPM", label: "Science-Based Method", variant: "yellow" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-7 rounded-2xl border text-center space-y-2 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  stat.variant === "red"
                    ? "bg-[#143D5C]/60 border-brand-red/35 hover:border-brand-red"
                    : "bg-[#143D5C]/60 border-amber-400/35 hover:border-amber-400"
                }`}
              >
                <div
                  className={`font-mono-data font-extrabold text-3xl sm:text-4xl ${
                    stat.variant === "red"
                      ? "text-brand-red"
                      : "text-action-yellow"
                  }`}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-stone-300 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
