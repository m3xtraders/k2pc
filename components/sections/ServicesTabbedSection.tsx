"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Service } from "@/lib/types";
import { ServiceCard } from "@/components/ui/ServiceCard";
import {
  Home,
  Building2,
  Utensils,
  Warehouse,
  Hospital,
  Hotel,
  Briefcase,
  ShieldCheck,
  Truck,
  FileCheck2,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
} from "lucide-react";
import { AssessmentModal } from "@/components/ui/AssessmentModal";

interface ServicesTabbedSectionProps {
  services: Service[];
}

const COMMERCIAL_PROGRAMS = [
  {
    id: "general-commercial",
    title: "Commercial Integrated Pest Management (IPM)",
    slug: "commercial-pest-control",
    shortDescription:
      "Comprehensive, audit-compliant pest prevention and eradication tailored for GTA facilities, warehouses, and commercial properties.",
    icon: Building2,
    badge: "Audit-Ready & Certified",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80",
    pricing: "Custom Facility Quote",
    warranty: "Written Service Warranty",
    features: [
      "Digital logbooks & SDS documentation",
      "Non-disruptive after-hours servicing",
      "Tamper-proof perimeter monitoring",
    ],
  },
  {
    id: "restaurants",
    title: "Restaurants, Commercial Kitchens & Bars",
    slug: "commercial-pest-control",
    shortDescription:
      "Zero-tolerance pest defense for commercial food service. Guaranteed DineSafe Toronto health inspection compliance.",
    icon: Utensils,
    badge: "DineSafe Toronto Ready",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80",
    pricing: "Custom Facility Quote",
    warranty: "Pass Health Inspection Guarantee",
    features: [
      "Kitchen drain bio-enzyme sanitation",
      "Nightly cockroach matrix gel baits",
      "Drain fly & fruit fly elimination",
    ],
  },
  {
    id: "warehouses",
    title: "Warehouses, Logistics & Manufacturing",
    slug: "commercial-pest-control",
    shortDescription:
      "Dock-to-rack pest barrier protection preventing rodent damage, bird nesting, and stored product pest contamination.",
    icon: Warehouse,
    badge: "HACCP & BRC Compliant",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80",
    pricing: "Custom Facility Quote",
    warranty: "1-Year Exclusion Warranty",
    features: [
      "Loading dock exclusion door sweeps",
      "High-bay bird control & netting",
      "Pallet & rack beetle traps",
    ],
  },
  {
    id: "property-management",
    title: "Property Management & Multi-Unit Rentals",
    slug: "commercial-pest-control",
    shortDescription:
      "Proactive pest management for landlords, condo boards, and rental portfolios with rapid 24-hour tenant turnaround.",
    icon: Home,
    badge: "Fast Tenant Turnaround",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=700&q=80",
    pricing: "Per-Building / Unit Plans",
    warranty: "Landlord Compliance Certificate",
    features: [
      "Suite-by-suite bed bug heat audits",
      "Trash chute & compactor defense",
      "100% discrete unmarked vehicles",
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare, Medical & Dental Clinics",
    slug: "commercial-pest-control",
    shortDescription:
      "Ultra-low volatility, eco-safe IPM methods engineered for sensitive clinical patient care environments.",
    icon: Hospital,
    badge: "Eco & Patient Safe",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=700&q=80",
    pricing: "Custom Facility Quote",
    warranty: "Hospital-Grade IPM Protocol",
    features: [
      "Non-chemical mechanical exclusion",
      "HEPA-filtered vacuum extraction",
      "Air-quality compliant formulations",
    ],
  },
  {
    id: "hospitality-offices",
    title: "Hotels, Hospitality & Corporate Offices",
    slug: "commercial-pest-control",
    shortDescription:
      "Protect your brand reputation and guest satisfaction with scheduled off-peak treatments and thermal bed bug defense.",
    icon: Hotel,
    badge: "Zero Business Interruption",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80",
    pricing: "Custom Facility Quote",
    warranty: "Full Discretion Guarantee",
    features: [
      "Rapid room quarantine & thermal heat",
      "Office breakroom sugar ant barriers",
      "Scheduled off-hours maintenance",
    ],
  },
];

export function ServicesTabbedSection({ services }: ServicesTabbedSectionProps) {
  const [activeTab, setActiveTab] = useState<"domestic" | "commercial">("domestic");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCommercialService, setSelectedCommercialService] = useState("Commercial Pest Control");

  // Read URL search param if present on client load
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") === "commercial") {
        setActiveTab("commercial");
      }
    }
  }, []);

  // Separate domestic/residential services (filter out commercial slug if present)
  const domesticServices = services.filter(
    (s) => s.slug !== "commercial-pest-control" && s.pestCategory !== "commercial"
  );

  const handleOpenAssessment = (serviceTitle: string) => {
    setSelectedCommercialService(serviceTitle);
    setModalOpen(true);
  };

  return (
    <section className="py-12 sm:py-16 bg-surface-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tab Toggle Navigation */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-surface-warm border border-stone-200 shadow-inner max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("domestic")}
              className={`whitespace-nowrap shrink-0 flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-3 rounded-xl font-heading font-bold text-xs sm:text-sm md:text-base transition-all duration-200 cursor-pointer ${
                activeTab === "domestic"
                  ? "bg-brand-red text-white shadow-md"
                  : "text-stone-600 hover:text-ink hover:bg-stone-100"
              }`}
            >
              <Home className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Domestic &amp; Residential</span>
              <span
                className={`text-xs font-mono-data px-2 py-0.5 rounded-full ${
                  activeTab === "domestic"
                    ? "bg-white/20 text-white"
                    : "bg-stone-200 text-stone-700"
                }`}
              >
                {domesticServices.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("commercial")}
              className={`whitespace-nowrap shrink-0 flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-7 py-3 rounded-xl font-heading font-bold text-xs sm:text-sm md:text-base transition-all duration-200 cursor-pointer ${
                activeTab === "commercial"
                  ? "bg-brand-red text-white shadow-md"
                  : "text-stone-600 hover:text-ink hover:bg-stone-100"
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Commercial &amp; Business</span>
              <span
                className={`text-xs font-mono-data px-2 py-0.5 rounded-full ${
                  activeTab === "commercial"
                    ? "bg-white/20 text-white"
                    : "bg-stone-200 text-stone-700"
                }`}
              >
                {COMMERCIAL_PROGRAMS.length}
              </span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-neutral-text text-center">
            {activeTab === "domestic"
              ? "Showing licensed residential extermination and pest-proofing for GTA homes & apartments."
              : "Showing certified commercial IPM programs and audit-compliant solutions for businesses & facilities."}
          </p>
        </div>

        {/* TAB 1: DOMESTIC / RESIDENTIAL SERVICES */}
        {activeTab === "domestic" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {domesticServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: COMMERCIAL SERVICES */}
        {activeTab === "commercial" && (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Quick highlight bar for commercial */}
            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 p-4 rounded-2xl bg-surface-warm border border-stone-200 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-stone-700 font-medium font-mono-data">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  100% Unmarked Fleet
                </span>
                <span className="flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-sky-600" />
                  DineSafe &amp; HACCP Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-red" />
                  $5M Commercial Liability
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleOpenAssessment("General Commercial Audit")}
                className="text-brand-red hover:text-brand-red-dark font-bold inline-flex items-center gap-1 text-xs sm:text-sm font-heading cursor-pointer"
              >
                <span>Request Facility Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Commercial Program Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {COMMERCIAL_PROGRAMS.map((prog) => {
                const Icon = prog.icon;
                return (
                  <div
                    key={prog.id}
                    className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-brand-red/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group text-left"
                  >
                    {/* Top Cover Image */}
                    <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-stone-100">
                      <Image
                        src={prog.image}
                        alt={prog.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                        quality={65}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/25 pointer-events-none" />

                      {/* Icon */}
                      <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md text-brand-red shadow-md flex items-center justify-center border border-white/60 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Badge */}
                      <div className="absolute top-3.5 right-3.5">
                        <span className="text-xs font-mono-data font-bold bg-amber-400 text-stone-950 px-2.5 py-1 rounded-md shadow-md">
                          {prog.badge}
                        </span>
                      </div>

                      {/* Category */}
                      <div className="absolute bottom-3 left-3.5">
                        <span className="text-[11px] font-mono-data font-semibold uppercase tracking-wider text-white bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
                          Commercial IPM
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                      <div className="space-y-3">
                        <h3 className="font-heading font-bold text-lg sm:text-xl text-ink group-hover:text-brand-red transition-colors leading-snug">
                          {prog.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-neutral-text leading-relaxed line-clamp-3">
                          {prog.shortDescription}
                        </p>

                        {/* Features Checklist */}
                        <ul className="space-y-1.5 pt-1 text-xs text-stone-600">
                          {prog.features.map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Warranty */}
                        <div className="inline-flex items-center gap-2 text-xs font-mono-data text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                          <span>{prog.warranty}</span>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="pt-4 border-t border-stone-100">
                        <button
                          type="button"
                          onClick={() => handleOpenAssessment(prog.title)}
                          className="w-full py-3 px-4 bg-brand-red hover:bg-brand-red-dark text-white font-heading font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <CalendarCheck className="w-4 h-4" />
                          <span>Book Free Assessment &amp; Quote</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Commercial Assessment Modal */}
      <AssessmentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedCommercialService}
        title="Book a Commercial Site Assessment"
        subtitle="We'll evaluate your facility and design an audit-compliant IPM program."
      />
    </section>
  );
}
