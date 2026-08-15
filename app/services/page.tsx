import React from "react";
import Metadata from "next";
import ServiceGrid from "@/components/sections/ServiceGrid";
import CTABand from "@/components/sections/CTABand";
import ProcessSteps from "@/components/sections/ProcessSteps";
import { ShieldCheck, Phone } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/content/company";

export const metadata = {
  title: "Pest Extermination Services | Toronto & GTA",
  description:
    "Explore K2PC's 11 dedicated extermination services: ant control, rodent proofing, bed bug heat treatment, wasp removal, roach control, and commercial IPM.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Header Banner */}
      <section className="bg-ink text-white py-14 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-mono-data uppercase font-semibold">
            <ShieldCheck className="w-4 h-4" />
            Ontario Licensed Exterminators
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Our Pest Control & Extermination Services
          </h1>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Targeted pest elimination for Southern Ontario homes and businesses. Backed by science, eco-friendly IPM methods, and a 6-month written warranty.
          </p>
        </div>
      </section>

      <ServiceGrid showHeading={false} />
      <ProcessSteps />

      <section className="py-12 bg-surface-warm border-t border-stone-200 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h3 className="font-heading font-bold text-2xl text-ink">
            Don't See Your Specific Pest Listed?
          </h3>
          <p className="text-sm text-neutral-text">
            We handle custom wildlife, earwigs, centipedes, and commercial audit requirements across all 11 GTA municipalities.
          </p>
          <a
            href={`tel:${COMPANY_DETAILS.phoneRaw}`}
            className="inline-flex items-center gap-2 text-brand-red font-bold text-lg hover:underline font-mono-data"
          >
            <Phone className="w-5 h-5" />
            <span>Speak with an Exterminator: {COMPANY_DETAILS.phone}</span>
          </a>
        </div>
      </section>

      <CTABand />
    </>
  );
}
