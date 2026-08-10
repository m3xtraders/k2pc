import React from "react";
import Image from "next/image";
import { Phone, Shield, Clock, Award, CheckCircle } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative bg-surface-white overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-brand-red text-xs sm:text-sm font-mono-data font-semibold">
              <Shield className="w-4 h-4 text-brand-red shrink-0" />
              <span>Ontario Licensed Exterminator #{COMPANY_DETAILS.licenseNumber}</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-ink leading-[1.1] tracking-tight">
              Fast, Guaranteed <br className="hidden sm:block" />
              <span className="text-brand-red">Pest Control</span> in Toronto & GTA
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-neutral-text leading-relaxed max-w-2xl">
              Eliminate ants, mice, bed bugs, wasps, and roaches with eco-conscious Integrated Pest Management. Same-day emergency response with a written 6-month warranty.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
                Get Free Online Quote
              </Button>
              <a
                href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-surface-warm hover:bg-stone-200 border border-stone-300 text-ink font-bold transition-all min-h-[52px]"
              >
                <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-xs text-neutral-text font-medium">Call Emergency Line</span>
                  <span className="font-mono-data text-base text-brand-red font-bold">
                    {COMPANY_DETAILS.phone}
                  </span>
                </div>
              </a>
            </div>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-ink font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Kid & Pet Safe IPM</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Unmarked Vans Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Hidden Fees</span>
              </div>
            </div>

            {/* Compact Trust Row */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left font-mono-data">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-brand-red font-bold text-lg sm:text-xl">
                  <Award className="w-4 h-4" />
                  <span>15+ Yrs</span>
                </div>
                <p className="text-xs text-neutral-text">In Business</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-brand-red font-bold text-lg sm:text-xl">
                  <Shield className="w-4 h-4" />
                  <span>12,000+</span>
                </div>
                <p className="text-xs text-neutral-text">Homes Protected</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-brand-red font-bold text-lg sm:text-xl">
                  <Clock className="w-4 h-4" />
                  <span>2 Hrs</span>
                </div>
                <p className="text-xs text-neutral-text">Avg Emergency Time</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-lg sm:text-xl">
                  <span>4.9 ★</span>
                </div>
                <p className="text-xs text-neutral-text">480+ Google Reviews</p>
              </div>
            </div>
          </div>

          {/* Right Column: High Quality Environmental Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-surface-warm group">
              <Image
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1000&q=80"
                alt="Canadian residential home exterior inspected and protected by K2PC Pest Control"
                width={800}
                height={600}
                priority
                className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-red/90 text-white font-mono-data text-xs font-semibold w-fit mb-2">
                  GTA Defense Shield
                </div>
                <h3 className="font-heading font-bold text-xl text-white leading-tight">
                  Protecting GTA Neighborhoods
                </h3>
                <p className="text-stone-300 text-xs mt-1">
                  Toronto, Mississauga, Brampton, Vaughan, Markham & Oakville
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
