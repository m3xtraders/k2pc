"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Truck,
  ShieldCheck,
  ArrowRight,
  Briefcase,
} from "lucide-react";

export function CommercialHighlightBanner() {
  return (
    <section className="bg-surface-warm border-b border-stone-200 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm transition-all hover:border-stone-300">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
            
            {/* Left Info Area */}
            <div className="space-y-4 max-w-3xl">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-brand-red text-xs font-mono-data uppercase font-bold tracking-wider">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Commercial Pest Solutions</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink tracking-tight">
                  Discreet, Audit-Ready Protection for Your Business
                </h2>
                <p className="text-sm sm:text-base text-neutral-text leading-relaxed">
                  Scheduled Integrated Pest Management (IPM) designed for restaurants, warehouses, offices, and property managers across Saskatoon &amp; surrounding areas.
                </p>
              </div>

              {/* Minimalist Feature Tags */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-medium text-ink">
                  <Building2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span>6 Core Industries</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-medium text-ink">
                  <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% Unmarked Fleet</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-medium text-ink">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Health Audit Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0 pt-2 lg:pt-0">
              <Link
                href="/commercial"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-ink hover:bg-brand-red text-white font-heading font-bold text-sm sm:text-base rounded-xl shadow-sm hover:shadow-md transition-all group"
              >
                <span>Explore Commercial Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
