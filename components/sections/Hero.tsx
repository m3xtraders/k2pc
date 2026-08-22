import React from "react";
import { Phone, Shield, Clock, Award, CheckCircle } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { Button } from "@/components/ui/Button";
import { getCompanyDetails } from "@/lib/content-db";

interface HeroProps {
  companyDetails?: any;
}

export default async function Hero({ companyDetails }: HeroProps = {}) {
  const company = companyDetails || (await getCompanyDetails());

  const phone = company?.phone || COMPANY_DETAILS.phone;
  const phoneRaw = company?.phoneRaw || COMPANY_DETAILS.phoneRaw;
  const stats = company?.stats || COMPANY_DETAILS.stats;

  return (
    <section className="relative overflow-hidden pt-14 pb-16 md:pt-20 md:pb-24 border-b border-stone-800 bg-stone-950 text-white min-h-[580px] md:min-h-[640px] flex items-center">
      {/* Full Background Video with Subtle Black Fade Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-top"
        >
          <source src="/assets/video/hero.mp4" type="video/mp4" />
        </video>

        {/* Lighter, balanced fade so video is clearly visible while text stays readable */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6 text-left">
          {/* Headline */}
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-md">
            Fast, Guaranteed <br className="hidden sm:block" />
            <span className="text-brand-red">Pest Control</span> in Toronto & GTA
          </h1>

          {/* Subhead */}
          <p className="text-base sm:text-lg text-stone-100 leading-relaxed max-w-2xl drop-shadow-sm">
            {company?.slogan || company?.tagline || "Eliminate ants, mice, bed bugs, wasps, and roaches with eco-conscious Integrated Pest Management. Same-day emergency response with a written 6-month warranty."}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl">
              Get Free Online Quote
            </Button>
            <a
              href={`tel:${phoneRaw}`}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold transition-all min-h-[52px]"
            >
              <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center shadow-sm">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs text-stone-300 font-medium">Call Emergency Line</span>
                <span className="font-mono-data text-base text-action-yellow font-bold">
                  {phone}
                </span>
              </div>
            </a>
          </div>

          {/* Bullet Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-stone-100 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Kid & Pet Safe IPM</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Unmarked Vans Available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Hidden Fees</span>
            </div>
          </div>

          {/* Compact Trust Row */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left font-mono-data">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-action-yellow font-bold text-lg sm:text-xl">
                <Award className="w-4 h-4" />
                <span>{stats?.yearsInBusiness || 15}+ Yrs</span>
              </div>
              <p className="text-xs text-stone-300">In Business</p>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-action-yellow font-bold text-lg sm:text-xl">
                <Shield className="w-4 h-4" />
                <span>{stats?.homesProtected || "12,000+"}</span>
              </div>
              <p className="text-xs text-stone-300">Homes Protected</p>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-action-yellow font-bold text-lg sm:text-xl">
                <Clock className="w-4 h-4" />
                <span>{stats?.avgResponseMinutes ? `${Math.round(stats.avgResponseMinutes / 60)} Hrs` : "2 Hrs"}</span>
              </div>
              <p className="text-xs text-stone-300">Avg Emergency Time</p>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-lg sm:text-xl">
                <span>{stats?.googleRating || 4.9} ★</span>
              </div>
              <p className="text-xs text-stone-300">{stats?.reviewCount || 480}+ Google Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
