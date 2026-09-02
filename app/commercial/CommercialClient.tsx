"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Truck,
  FileCheck2,
  Phone,
  CalendarCheck,
  CheckCircle2,
  Utensils,
  Warehouse,
  Home,
  Hospital,
  Hotel,
  Briefcase,
  Zap,
  ArrowRight,
  Clock,
  Award,
  Sparkles,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { AssessmentModal } from "@/components/ui/AssessmentModal";
import { Button } from "@/components/ui/Button";

interface CommercialClientProps {
  companyDetails: any;
  services: any[];
}

const INDUSTRIES = [
  {
    id: "restaurants",
    name: "Restaurants & Bars",
    icon: Utensils,
    badge: "Health Inspection Ready",
    headline: "Zero-tolerance pest defense for commercial kitchens & bars",
    description:
      "Pass Saskatchewan Health Authority inspections with flying colors. We eliminate drain flies, German cockroaches, and mice using non-contaminating gel baits and organic enzyme drain treatments.",
    protocols: ["Kitchen Drain Bio-Sanitation", "Nightly Cockroach Matrix Baits", "Tamper-Proof Rodent Stations", "Digital Health Audit Logbook"],
  },
  {
    id: "warehouses",
    name: "Warehouses & Logistics",
    icon: Warehouse,
    badge: "HACCP & BRC Compliant",
    headline: "Dock-to-rack pest barrier for distribution centers & manufacturing",
    description:
      "Protect valuable inventory and packaging from rodent contamination, bird nesting, and stored product beetles. Includes loading dock door sweeps and perimeter bait grids.",
    protocols: ["High-Bay Bird Deterrents", "Loading Dock Exclusion Seal", "Pallet & Rack Beetle Traps", "Automated Trend Log Reports"],
  },
  {
    id: "property-management",
    name: "Property Management & Rentals",
    icon: Home,
    badge: "Fast Tenant Turnaround",
    headline: "Multi-unit apartment buildings, condos, and rental portfolios",
    description:
      "Proactive pest management for landlords and condo boards. Fast 24-hour turnaround for tenant complaints with discrete, unmarked vehicles to protect your building's reputation.",
    protocols: ["Suite-by-Suite Bed Bug Audits", "Trash Chute & Compactor Defense", "Common Area Rodent Stations", "Landlord Compliance Certificates"],
  },
  {
    id: "healthcare",
    name: "Healthcare & Medical Clinics",
    icon: Hospital,
    badge: "Eco & Patient Safe",
    headline: "Ultra-low volatility IPM for clinics, dental offices & care homes",
    description:
      "Sensitive clinical environments require chemical-free physical exclusion, HEPA-filtered vacuum extraction, and targeted gel formulations safe around patients and medical equipment.",
    protocols: ["Non-Chemical Mechanical Traps", "HEPA Vacuum Eradication", "Air Quality Safe Formulations", "After-Hours Discrete Dispatch"],
  },
  {
    id: "hospitality",
    name: "Hotels & Hospitality",
    icon: Hotel,
    badge: "Brand Protection Guarantee",
    headline: "Bed bug heat treatments and discrete perimeter defense",
    description:
      "Protect your online reviews and guest peace of mind. Same-day room quarantine and lethal thermal remediation with zero residual chemical odor.",
    protocols: ["Thermal Heat Decontamination", "Mattress Encasement Systems", "Lobby & Dining Cockroach Defense", "100% Discrete Unmarked Fleet"],
  },
  {
    id: "offices",
    name: "Corporate Offices & Retail",
    icon: Briefcase,
    badge: "Zero Business Interruption",
    headline: "Scheduled evening service for commercial plazas and high-rises",
    description:
      "Keep office lunchrooms, server rooms, and retail storefronts pest-free. All servicing is scheduled during off-peak hours so your team works without distraction.",
    protocols: ["Breakroom Sugar Ant Barriers", "Under-Desk Mouse Exclusion", "Plaza Exterior Perimeter Shield", "Monthly Inspection Sign-Offs"],
  },
];

const AUDIT_STANDARDS = [
  {
    title: "Saskatchewan Health Authority Inspection Compliance",
    description: "Complete compliance logs and SDS documentation required by municipal health inspectors.",
  },
  {
    title: "HACCP & Third-Party Audit Preparation",
    description: "Trend analysis, barcode bait station tracking, and licensed technician service sign-offs.",
  },
  {
    title: "Ministry of Environment Licensed Applicators",
    description: "Every technician holds active Saskatchewan applicator licenses with $5,000,000 commercial liability.",
  },
  {
    title: "Digital Client Portal & Logbook Records",
    description: "Instant access to pesticide application records, station check maps, and corrective action reports.",
  },
];

export function CommercialClient({ companyDetails, services }: CommercialClientProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Commercial Pest Control & Food Safety");
  const [activeIndustry, setActiveIndustry] = useState(INDUSTRIES[0].id);

  const phone = companyDetails?.phone || "(306) 407-0007";
  const phoneRaw = companyDetails?.phoneRaw || "3064070007";

  const handleOpenAssessment = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setModalOpen(true);
  };

  const currentIndustry = INDUSTRIES.find((i) => i.id === activeIndustry) || INDUSTRIES[0];
  const IndustryIcon = currentIndustry.icon;

  // Filter or list commercial-specific services
  const commercialServices = services.filter(
    (s: any) =>
      s.slug === "commercial-pest-control" ||
      s.pestCategory === "commercial" ||
      (s.title && s.title.toLowerCase().includes("commercial")) ||
      (s.shortDescription && s.shortDescription.toLowerCase().includes("commercial"))
  );

  const displayServices =
    commercialServices.length > 0
      ? commercialServices
      : services.slice(0, 6);

  return (
    <>
      {/* 1. Commercial Hero Banner */}
      <section className="bg-gradient-to-b from-[#0E2F48] via-[#143D5C] to-[#0E2F48] text-white py-16 sm:py-20 border-b border-[#1C4E75]/50 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-action-yellow/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 text-action-yellow border border-amber-400/30 text-xs font-mono-data uppercase font-bold tracking-wider">
            <ShieldCheck className="w-4 h-4 text-action-yellow" />
            <span>License No: {companyDetails?.licenseNumber || "A-003789"} &bull; Commercial IPM Division</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Audit-Ready Commercial Pest Control &amp; Facility Protection
          </h1>

          <p className="text-base sm:text-lg text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Discreet, scheduled, and certified Integrated Pest Management for restaurants, food processing, logistics warehouses, healthcare, rentals, and corporate offices across Saskatoon &amp; area.
          </p>

          {/* 3 Pill Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm font-semibold font-mono-data text-stone-100">
              <Building2 className="w-4 h-4 text-action-yellow" />
              <span>6 Core Industries</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm font-semibold font-mono-data text-stone-100">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Unmarked Fleet Available</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm font-semibold font-mono-data text-stone-100">
              <FileCheck2 className="w-4 h-4 text-sky-400" />
              <span>DineSafe &amp; HACCP Audit-Ready</span>
            </span>
          </div>

          {/* Primary Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => handleOpenAssessment("Commercial Pest Control & Food Safety")}
              className="w-full sm:w-auto px-8 py-4 bg-brand-red hover:bg-brand-red-dark text-white font-heading font-bold text-base rounded-xl shadow-xl hover:shadow-red-900/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>Book Free Site Assessment</span>
            </button>

            <a
              href={`tel:${phoneRaw}`}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all flex items-center justify-center gap-2 font-mono-data text-sm"
            >
              <Phone className="w-4 h-4 text-action-yellow" />
              <span>Commercial Dispatch: {phone}</span>
            </a>
          </div>

          <p className="text-xs text-stone-400 font-mono-data">
            ⚡ We&apos;ll walk your site, evaluate risk zones, and quote a tailored program &mdash; 100% no obligation.
          </p>
        </div>
      </section>

      {/* 2. Industries Served Showcase Tabs */}
      <section className="py-16 sm:py-20 bg-surface-warm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Tailored Industry Solutions
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
              Pest Management Engineered For Your Specific Sector
            </h2>
            <p className="text-base text-neutral-text">
              Select your facility type to view our customized audit protocols, treatment schedules, and compliance standards.
            </p>
          </div>

          {/* Industry Selection Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {INDUSTRIES.map((ind) => {
              const Icon = ind.icon;
              const isSelected = activeIndustry === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndustry(ind.id)}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2.5 cursor-pointer ${
                    isSelected
                      ? "bg-brand-red text-white border-brand-red shadow-md scale-105"
                      : "bg-white text-stone-700 border-stone-200 hover:border-brand-red/50 hover:bg-stone-50 shadow-2xs"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isSelected ? "text-white" : "text-brand-red"}`} />
                  <span className="font-heading font-bold text-xs sm:text-sm leading-tight">
                    {ind.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Industry Deep-Dive Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-data font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                  {currentIndustry.badge}
                </span>
                <span className="text-xs text-stone-400 font-mono-data">Saskatoon &amp; Area</span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-ink leading-tight">
                {currentIndustry.headline}
              </h3>

              <p className="text-sm sm:text-base text-neutral-text leading-relaxed">
                {currentIndustry.description}
              </p>

              {/* Protocols checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {currentIndustry.protocols.map((protocol, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{protocol}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-5 text-center">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-brand-red flex items-center justify-center mx-auto shadow-2xs">
                <IndustryIcon className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h4 className="font-heading font-bold text-lg text-ink">
                  {currentIndustry.name} Site Inspection
                </h4>
                <p className="text-xs text-stone-500">
                  Comprehensive risk assessment, floor plan analysis, and written commercial quote.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleOpenAssessment(`Commercial: ${currentIndustry.name}`)}
                className="w-full py-3 bg-brand-red hover:bg-brand-red-dark text-white font-heading font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book {currentIndustry.name} Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${phoneRaw}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono-data text-stone-600 hover:text-brand-red transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-red" />
                <span>Call Dispatch: {phone}</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Commercial Services Display Grid (Editable via Admin Panel) */}
      <section className="py-16 sm:py-20 bg-surface-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl text-left">
              <span className="text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
                Service Catalog
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
                Commercial Programs &amp; Protocols
              </h2>
              <p className="text-sm sm:text-base text-neutral-text">
                All commercial programs are customized to your facility&apos;s footprint and audit requirements.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenAssessment("General Commercial Program")}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-heading font-bold rounded-xl shrink-0 transition-colors shadow-xs"
            >
              Request Custom Quote &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service: any, index: number) => (
              <div
                key={service.id || index}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:shadow-md hover:border-brand-red/60 transition-all flex flex-col justify-between space-y-4 text-left group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono-data font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                      Commercial Tier
                    </span>
                    <span className="text-xs font-mono-data font-bold text-emerald-700">
                      Audit Guaranteed
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-ink group-hover:text-brand-red transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-text leading-relaxed line-clamp-3">
                    {service.shortDescription || service.content || "Professional commercial extermination, pest proofing, and recurring audit documentation."}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono-data">
                    <span>Warranty:</span>
                    <span className="font-bold text-ink">Written Guarantee</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenAssessment(service.title)}
                    className="w-full py-2.5 bg-red-50 hover:bg-brand-red text-brand-red hover:text-white text-xs font-heading font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Book Assessment for this Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Audit & Regulatory Compliance Section */}
      <section className="py-16 sm:py-20 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono-data font-bold text-action-yellow uppercase tracking-widest bg-stone-800 px-3 py-1 rounded-full">
              Audit Compliance
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              100% Prepared For Municipal &amp; Third-Party Audits
            </h2>
            <p className="text-base text-stone-300">
              We provide the full digital documentation, bait station mapping, and SDS logs required by public health authorities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {AUDIT_STANDARDS.map((audit, i) => (
              <div
                key={i}
                className="bg-[#143D5C] rounded-2xl p-6 border border-[#1C4E75] space-y-3 hover:border-action-yellow/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-action-yellow flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-white leading-snug">
                  {audit.title}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {audit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Big Bottom Assessment CTA Card */}
          <div className="bg-gradient-to-r from-brand-red to-brand-red-dark rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left max-w-2xl">
              <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white">
                Book a Free Commercial Site Assessment
              </h3>
              <p className="text-sm sm:text-base text-red-100 leading-relaxed">
                We&apos;ll walk your site, audit all access points, and quote a comprehensive Integrated Pest Management program &mdash; 100% no obligation.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => handleOpenAssessment("Full Facility Audit")}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-100 text-stone-950 font-heading font-bold text-base rounded-xl shadow-lg transition-all cursor-pointer text-center"
              >
                Book Free Assessment &rarr;
              </button>
              <a
                href={`tel:${phoneRaw}`}
                className="w-full sm:w-auto px-6 py-4 bg-red-950/40 hover:bg-red-950/60 border border-white/20 text-white font-mono-data font-bold text-sm rounded-xl transition-all text-center"
              >
                {phone}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Assessment Popup Modal */}
      <AssessmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedService}
        title="Book a Free Commercial Site Assessment"
        subtitle="We’ll walk your site and quote a customized IPM program — no obligation."
      />
    </>
  );
}
