import React from "react";
import {
  ShieldCheck,
  Award,
  Leaf,
  CreditCard,
  EyeOff,
  Car,
  Clock,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/content/company";

interface AboutCredentialsProps {
  licenseNumber?: string;
}

export default function AboutCredentials({ licenseNumber }: AboutCredentialsProps) {
  const activeLicense = licenseNumber || COMPANY_DETAILS.licenseNumber;

  const credentialsList = [
    {
      icon: Award,
      title: "All technicians certified",
      badge: "In-Field Certified",
      description:
        "Every technician on every visit holds current Saskatchewan applicator certification. Not a head-office credential; the person in your kitchen carries it.",
      highlight: "Saskatchewan Ministry Certified",
    },
    {
      icon: ShieldCheck,
      title: "Fully insured · 10 years in",
      badge: "10 Years Experience",
      description:
        "A decade of pest control experience with liability coverage on every job, residential and commercial. You’re protected, not chasing us.",
      highlight: "$5M General Liability",
    },
    {
      icon: Leaf,
      title: "Eco-friendly, pet & family safe",
      badge: "Targeted IPM",
      description:
        "Low-toxicity products chosen for homes with kids, dogs and cats. We tell you exactly what we’re applying and when rooms are safe to use again.",
      highlight: "Children & Pet Friendly",
    },
    {
      icon: CreditCard,
      title: "Flexible payment",
      badge: "Transparent Billing",
      description:
        "Credit, debit, cheque, e-transfer or cash. Monthly payment plans available too — just ask.",
      highlight: "Monthly Plans Available",
    },
  ];

  return (
    <section className="py-20 bg-surface-warm border-y border-stone-200/80 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-red-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-brand-red text-xs font-mono-data font-bold uppercase tracking-widest border border-red-200/80 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-brand-red" />
            <span>Credentials</span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-ink tracking-tight leading-tight md:whitespace-nowrap">
            Licensed, Insured, and Quiet About It
          </h2>

          <div className="flex items-center justify-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink text-white font-mono-data text-xs font-bold uppercase tracking-wide">
              <Clock className="w-3.5 h-3.5 text-action-yellow" />
              10 Years in
            </span>
            <span className="text-sm font-medium text-neutral-text">
              Provincial License:{" "}
              <strong className="text-brand-red font-mono-data font-bold">{activeLicense}</strong>
            </span>
          </div>

          <p className="text-base sm:text-lg text-neutral-text leading-relaxed max-w-2xl mx-auto pt-1">
            Real field certifications, comprehensive coverage, family-safe treatments, and straightforward payment with zero hassles.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {credentialsList.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative bg-surface-white rounded-2xl p-7 border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-brand-red/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top red accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-brand-red border border-red-100 flex items-center justify-center group-hover:bg-brand-red group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono-data font-bold text-neutral-text bg-stone-100 px-2.5 py-1 rounded-md">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-lg text-ink group-hover:text-brand-red transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-text leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono-data font-semibold text-brand-red uppercase tracking-wider">
                    {item.highlight}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Discreet Service Banner: "Nobody needs to know we visited" */}
        <div className="bg-ink text-white rounded-2xl p-6 sm:p-8 border border-ink-border/50 shadow-xl relative overflow-hidden">
          {/* Background subtle glow accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-red/20 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-action-yellow border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
                <EyeOff className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 text-action-yellow text-xs font-mono-data font-bold uppercase tracking-wider">
                  <Lock className="w-3 h-3" />
                  <span>100% Confidential Service</span>
                </div>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  Nobody needs to know we visited
                </h3>
                <p className="text-sm sm:text-base text-stone-300 max-w-2xl leading-relaxed">
                  Unmarked vehicles on request <span className="text-action-yellow font-bold">·</span> plain uniforms <span className="text-action-yellow font-bold">·</span> discreet scheduling
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm font-mono-data text-stone-200">
                <Car className="w-4 h-4 text-action-yellow" />
                <span>Unmarked Fleet</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-red text-white text-xs sm:text-sm font-heading font-bold shadow-md">
                <CheckCircle2 className="w-4 h-4 text-action-yellow" />
                <span>Private &amp; Discreet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
