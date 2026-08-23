import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { getCompanyDetails, getPublishedLocations } from "@/lib/content-db";
import CTABand from "@/components/sections/CTABand";
import LocationMapWidget from "@/components/sections/LocationMapWidget";
import { MapPin, Phone, ShieldCheck, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "GTA Service Areas & Exterminator Locations | K2 Pest Control",
  description:
    "Explore K2 Pest Control dispatch locations across Toronto & GTA: Mississauga, Brampton, Vaughan, Markham, North York, Scarborough, Oakville, and Burlington. 2-hour emergency response.",
  alternates: {
    canonical: "/locations",
  },
  openGraph: {
    title: "GTA Service Areas & Exterminator Locations | K2 Pest Control",
    description:
      "Explore K2 Pest Control dispatch locations across Toronto & GTA: Mississauga, Brampton, Vaughan, Markham, North York, Scarborough, Oakville, and Burlington. 2-hour emergency response.",
    url: "https://www.k2pc.ca/locations",
  },
};

export default async function LocationsHubPage() {
  const [company, locations] = await Promise.all([
    getCompanyDetails(),
    getPublishedLocations(),
  ]);
  const phone = company?.phone || COMPANY_DETAILS.phone;
  const phoneRaw = company?.phoneRaw || COMPANY_DETAILS.phoneRaw;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.k2pc.ca",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: "https://www.k2pc.ca/locations",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header Banner */}
      <section className="bg-ink text-white py-16 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-mono-data uppercase font-semibold">
            <MapPin className="w-4 h-4 text-action-yellow" />
            11 Dispatch Zones Across Greater Toronto
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Our GTA Service Locations
          </h1>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Fast, guaranteed extermination and pest control across Southern Ontario. Select your municipality below for local dispatch details, neighborhood coverage, and pricing.
          </p>
        </div>
      </section>

      {/* Key Local Trust Signals */}
      <section className="bg-surface-warm py-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-brand-red flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-heading font-bold text-sm text-ink block">2-Hour Rapid Response</span>
                <span className="text-xs text-neutral-text">Emergency units on standby</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-heading font-bold text-sm text-ink block">6-Month Guarantee</span>
                <span className="text-xs text-neutral-text">100% written eradication warranty</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-heading font-bold text-sm text-ink block">Ontario Ministry Licensed</span>
                <span className="text-xs text-neutral-text">License #{company.licenseNumber || COMPANY_DETAILS.licenseNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Location Cards */}
      <section className="py-16 bg-surface-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="font-heading font-extrabold text-3xl text-ink">
              Choose Your City or Region
            </h2>
            <p className="text-sm text-neutral-text">
              Click on your city to view local extermination options, neighborhoods served, and direct booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group bg-white p-6 rounded-2xl border border-stone-200 hover:border-brand-red hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-data text-brand-red font-semibold bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                      {loc.region}
                    </span>
                    {loc.badge && (
                      <span className="text-[11px] font-mono-data text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {loc.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-2xl text-ink group-hover:text-brand-red transition-colors flex items-center justify-between">
                    <span>{loc.name}</span>
                    <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-brand-red group-hover:translate-x-1 transition-all" />
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {loc.description}
                  </p>

                  {loc.neighborhoods && loc.neighborhoods.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-mono-data text-stone-400 block mb-1 font-semibold">
                        Neighborhoods Covered:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {loc.neighborhoods.slice(0, 4).map((n) => (
                          <span
                            key={n}
                            className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded"
                          >
                            {n}
                          </span>
                        ))}
                        {loc.neighborhoods.length > 4 && (
                          <span className="text-[11px] text-stone-400 self-center">
                            +{loc.neighborhoods.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono-data text-brand-red font-bold">
                  <span>View Local Dispatch Page</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Call Box */}
          <div className="bg-stone-900 text-white p-8 rounded-2xl border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-heading font-bold text-2xl text-white">
                Don't See Your Town Listed?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                We service all residential and commercial zones within a 60km radius of Toronto.
              </p>
            </div>

            <a
              href={`tel:${phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-action-yellow hover:bg-amber-400 text-stone-950 font-heading font-extrabold text-sm rounded-xl shrink-0 transition-colors shadow-md"
            >
              <Phone className="w-4 h-4 text-brand-red" />
              <span>Call For Instant Dispatch: {phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <LocationMapWidget />

      <CTABand />
    </>
  );
}
