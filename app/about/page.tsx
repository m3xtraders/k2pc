import React from "react";
import Metadata from "next";
import Image from "next/image";
import { COMPANY_DETAILS } from "@/lib/content/company";
import StatsCounter from "@/components/sections/StatsCounter";
import CTABand from "@/components/sections/CTABand";
import Testimonials from "@/components/sections/Testimonials";
import ServiceArea from "@/components/sections/ServiceArea";
import LocationMapWidget from "@/components/sections/LocationMapWidget";
import { ShieldCheck, Award, FileCheck, CheckCircle2, HeartHandshake, Shield } from "lucide-react";

export const metadata = {
  title: "About Us & Provincial Licensing | K2 Pest Control GTA",
  description:
    "Learn about K2 Pest Control's 15-year history in Ontario, provincial pesticide license #ON-849201-P, $5M liability insurance, and eco-friendly IPM team.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Safety & Eco-First IPM",
      icon: ShieldCheck,
      description: "We prioritize non-chemical exclusion and targeted low-volatility formulations safe for children and pets.",
    },
    {
      title: "Full Transparency & Pricing",
      icon: FileCheck,
      description: "No hidden inspection surcharges or unexpected upsells. Upfront written quotes provided before any work begins.",
    },
    {
      title: "Ontario Regulatory Excellence",
      icon: Award,
      description: "All technicians maintain Ministry pesticide applicator licenses, continuous safety training, and WSIB compliance.",
    },
    {
      title: "100% Written Warranty",
      icon: HeartHandshake,
      description: "We stand behind our work with a 6-month written warranty on all residential and commercial exterminations.",
    },
  ];

  const team = [
    {
      name: "Dr. Marcus Vance",
      role: "Lead Entomologist & Field Operations Specialist",
      bio: "18+ years of field experience in Southern Ontario insect ecology, specializing in carpenter ant nest tracking and non-repellent micro-baiting.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sarah Lin, P.Ag.",
      role: "Senior Director of Technical Services",
      bio: "Registered Professional Agrologist directing audit-ready Commercial IPM compliance for food processing facilities and multi-unit housing.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <>
      {/* Header Banner */}
      <section className="bg-ink text-white py-16 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-mono-data uppercase font-semibold">
            <Shield className="w-4 h-4 text-action-yellow" />
            Ontario License #{COMPANY_DETAILS.licenseNumber}
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            About K2 Pest Control
          </h1>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Delivering science-backed, licensed extermination across Toronto & the Greater Toronto Area for over 15 years.
          </p>
        </div>
      </section>

      <StatsCounter />

      {/* Licensing & Credentials Section - PROMINENT TRUST LEVER */}
      <section className="py-16 bg-surface-warm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border-2 border-brand-red p-8 sm:p-12 shadow-md space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200">
              <div className="space-y-2">
                <span className="text-xs font-mono-data font-bold text-brand-red uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-100">
                  Regulatory Verification
                </span>
                <h2 className="font-heading font-extrabold text-3xl text-ink">
                  Provincial Licensing & Insurance Credentials
                </h2>
                <p className="text-sm text-neutral-text">
                  In a regulated industry where chemical safety is paramount, K2 Pest Control operates with 100% compliance.
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-center font-mono-data shrink-0">
                <span className="text-xs text-neutral-text block">Ontario Applicator License</span>
                <span className="text-xl font-bold text-brand-red">{COMPANY_DETAILS.licenseNumber}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-warm p-6 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-brand-red font-bold text-base">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Ministry Certified</span>
                </div>
                <p className="text-xs text-neutral-text leading-relaxed">
                  Licensed by the {COMPANY_DETAILS.provincialBody} for Structural Pest Control & Fumigation.
                </p>
              </div>

              <div className="bg-surface-warm p-6 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-brand-red font-bold text-base">
                  <FileCheck className="w-5 h-5" />
                  <span>$5M Commercial Liability</span>
                </div>
                <p className="text-xs text-neutral-text leading-relaxed">
                  Fully insured with $5,000,000 general liability coverage for total homeowner and commercial peace of mind.
                </p>
              </div>

              <div className="bg-surface-warm p-6 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>WSIB & Eco-IPM Compliant</span>
                </div>
                <p className="text-xs text-neutral-text leading-relaxed">
                  Good standing with Workplace Safety and Insurance Board (WSIB) and eco-friendly Integrated Pest Management standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story / Mission */}
      <section className="py-16 bg-surface-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
                Our Story
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
                Protecting Canadian Sanctuaries Since 2011
              </h2>
              <p className="text-base text-neutral-text leading-relaxed">
                K2 Pest Control was founded in Toronto to address a glaring gap in the market: traditional exterminators relying on generic chemical sprays without addressing how pests entered in the first place.
              </p>
              <p className="text-base text-neutral-text leading-relaxed">
                Over the past 15 years, our team of licensed entomologists and technicians has pioneered exclusion-first IPM strategies. We treat every GTA property like our own home — inspecting thoroughly, eliminating nests at the root, and sealing entry holes permanently.
              </p>
            </div>
            <div className="lg:col-span-6 relative h-[400px] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                alt="K2 Pest Control licensed extermination technician carrying out property inspection"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-surface-warm border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="font-heading font-extrabold text-3xl text-ink">
              Our Core Guiding Principles
            </h2>
            <p className="text-sm text-neutral-text">
              The promises we keep on every residential and commercial job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-xl border border-stone-200 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-brand-red flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-ink">{v.title}</h3>
                  <p className="text-xs text-neutral-text leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Bios */}
      <section className="py-16 bg-surface-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="font-heading font-extrabold text-3xl text-ink">
              Meet Our Leadership & Entomology Team
            </h2>
            <p className="text-sm text-neutral-text">
              Experienced professionals guiding our field protocols across the GTA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <div key={i} className="bg-surface-warm p-6 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden relative shrink-0 border-2 border-brand-red">
                  <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h3 className="font-heading font-bold text-xl text-ink">{member.name}</h3>
                  <span className="text-xs font-mono-data text-brand-red font-semibold block">{member.role}</span>
                  <p className="text-xs text-neutral-text leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <Testimonials />

      {/* GTA Service Locations Section */}
      <ServiceArea />

      {/* Interactive Google Map Section */}
      <LocationMapWidget />

      <CTABand />
    </>
  );
}
