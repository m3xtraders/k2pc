"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Truck,
  FileCheck2,
  ArrowRight,
} from "lucide-react";

export function CommercialHighlightBanner() {
  return (
    <section className="bg-[#FAF7F2] border-b border-stone-200 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Inner Box with #FFFFFF background */}
        <div className="bg-[#FFFFFF] border border-stone-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
          
          {/* Left Content Area */}
          <div className="space-y-3 max-w-3xl text-left">
            {/* Main Heading */}
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-ink tracking-tight">
              Commercial
            </h2>

            {/* Sub-Heading */}
            <p className="text-base sm:text-lg text-neutral-text leading-relaxed font-medium">
              Restaurants, warehouses, offices and rentals — discreet, scheduled, audit-ready.
            </p>

            {/* 3 Key Commercial Highlights */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-xs sm:text-sm font-semibold text-stone-800 font-mono-data shadow-2xs">
                <Building2 className="w-4 h-4 text-brand-red" />
                <span>6 Industries</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-xs sm:text-sm font-semibold text-stone-800 font-mono-data shadow-2xs">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Unmarked</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-stone-200 text-xs sm:text-sm font-semibold text-stone-800 font-mono-data shadow-2xs">
                <FileCheck2 className="w-4 h-4 text-sky-600" />
                <span>Audit-Ready</span>
              </div>
            </div>
          </div>

          {/* Right Action Button: Explore Commercial */}
          <div className="w-full lg:w-auto shrink-0">
            <Link
              href="/commercial"
              className="w-full sm:w-auto px-6 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-heading font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore Commercial Services</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
