import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CORE_PESTS } from "@/lib/content/services";
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
              className="group relative h-48 sm:h-52 lg:h-60 rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-brand-red transition-all duration-300 flex flex-col justify-end focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              {/* Background Image with Zoom on Hover */}
              {pest.image && (
                <Image
                  src={pest.image}
                  alt={pest.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              )}

              {/* Gradient Fade Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent group-hover:from-black/95 group-hover:via-black/55 transition-colors duration-300" />

              {/* Text content pinned at bottom */}
              <div className="relative z-10 p-3 sm:p-3.5 text-left flex flex-col min-w-0 w-full">
                <div className="flex items-center justify-between gap-1.5 min-w-0">
                  <span className="font-heading font-bold text-xs sm:text-[13px] xl:text-sm tracking-tight text-white group-hover:text-action-yellow transition-colors whitespace-nowrap truncate">
                    {pest.name}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:text-action-yellow group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                {pest.scientificName && (
                  <span className="text-[10px] sm:text-[11px] font-mono-data text-stone-300 group-hover:text-stone-100 truncate block mt-0.5">
                    {pest.scientificName}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

