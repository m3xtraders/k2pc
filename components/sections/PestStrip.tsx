import React from "react";
import Link from "next/link";
import { CORE_PESTS } from "@/lib/content/services";
import { PestIcon } from "@/components/ui/PestIcon";
import { ArrowRight } from "lucide-react";

export default function PestStrip() {
  return (
    <section className="bg-surface-warm py-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-2">
          <div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-ink">
              Identify & Exterminate Your Pest Issue
            </h2>
            <p className="text-sm text-neutral-text">
              Select your active pest for immediate treatment details and pricing
            </p>
          </div>
          <Link
            href="/services"
            className="text-sm font-bold text-brand-red hover:text-brand-red-dark flex items-center gap-1 group"
          >
            <span>View all 11 pest services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Core Pests Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CORE_PESTS.map((pest) => (
            <Link
              key={pest.id}
              href={`/services/${pest.slug}`}
              className="group bg-white p-4 rounded-xl border border-stone-200 shadow-xs hover:shadow-md hover:border-brand-red transition-all flex flex-col items-center text-center space-y-2 focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-action-yellow transition-colors">
                <PestIcon name={pest.icon} size={28} />
              </div>
              <span className="font-heading font-bold text-sm text-ink group-hover:text-brand-red transition-colors">
                {pest.name}
              </span>
              <span className="text-[11px] font-mono-data text-neutral-text line-clamp-1">
                {pest.scientificName}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
