"use client";

import React, { useState, useMemo } from "react";
import {
  MapPin,
  Phone,
  Search,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export interface ServiceLocation {
  name: string;
  region: string;
  badge?: string;
  description?: string;
}

interface ServiceAreaClientProps {
  companyDetails: {
    name: string;
    phone: string;
    phoneRaw: string;
    address: {
      street: string;
      city: string;
      province: string;
      postalCode: string;
      country: string;
    };
    serviceRadiusKm: number;
    licenseNumber?: string;
  };
  locations: ServiceLocation[];
}

export const ServiceAreaClient: React.FC<ServiceAreaClientProps> = ({
  companyDetails,
  locations,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique regions for filter tabs
  const regions = useMemo(() => {
    const list = Array.from(new Set(locations.map((loc) => loc.region).filter(Boolean)));
    return list.sort();
  }, [locations]);

  // Filter locations by tab & search query
  const filteredLocations = useMemo(() => {
    return locations.filter((loc) => {
      const matchesRegion = selectedRegion === "ALL" || loc.region === selectedRegion;
      const matchesSearch =
        searchQuery.trim() === "" ||
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.region.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [locations, selectedRegion, searchQuery]);

  return (
    <section className="py-16 sm:py-20 bg-[#FBFBF9] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 1. Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
            Rapid Exterminator Response
          </h2>
          <p className="text-base text-neutral-text leading-relaxed">
            We operate mobile pest dispatch units stationed across Southern Ontario. Whether you live in Downtown Toronto, Mississauga, Brampton, Vaughan, or Markham, our licensed exterminators arrive within 2 hours for emergencies.
          </p>
        </div>

        {/* 2. Unified Toolbar (Region Filters + Integrated Search) */}
        <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setSelectedRegion("ALL")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all ${
                selectedRegion === "ALL"
                  ? "bg-[#BE2320] text-white shadow-xs"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              All Areas ({locations.length})
            </button>

            {regions.map((reg) => {
              const count = locations.filter((l) => l.region === reg).length;
              const shortName = reg.replace(" Region", "").replace("City of ", "");
              return (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-heading font-semibold transition-all ${
                    selectedRegion === reg
                      ? "bg-[#BE2320] text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  {shortName} ({count})
                </button>
              );
            })}
          </div>

          {/* Compact Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter city or region..."
              className="w-full pl-9 pr-12 py-2 bg-stone-50 hover:bg-stone-100/70 focus:bg-white border border-stone-200 focus:border-[#BE2320] rounded-xl text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono-data text-stone-400 hover:text-stone-700 bg-stone-200/60 px-1.5 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 3. Location Cards Grid — plain cards, no individual pages */}
        {filteredLocations.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center space-y-3 shadow-xs">
            <MapPin className="w-8 h-8 text-stone-400 mx-auto" />
            <p className="text-sm font-bold text-stone-800">
              No locations found matching &quot;{searchQuery}&quot;
            </p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              We service all areas within {companyDetails.serviceRadiusKm || 60}km of Toronto. Call our hotline to confirm dispatch availability!
            </p>
            <a
              href={`tel:${companyDetails.phoneRaw}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#BE2320] hover:underline pt-1"
            >
              <Phone className="w-3.5 h-3.5" /> Call {companyDetails.phone}
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredLocations.map((loc, idx) => (
              <div
                key={`${loc.name}-${idx}`}
                className="group relative bg-white p-3.5 sm:p-4 rounded-xl border border-stone-200 shadow-xs space-y-1 cursor-default transition-all duration-300 hover:border-[#BE2320] hover:shadow-[0_0_20px_rgba(190,35,32,0.18),0_4px_16px_rgba(190,35,32,0.12)] hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Red glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#BE2320]/[0.06] via-transparent to-[#BE2320]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#BE2320] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-xl" />

                <div className="flex items-center gap-2 truncate text-stone-900 font-bold text-sm sm:text-base font-heading relative">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 group-hover:text-[#BE2320] transition-colors duration-300" />
                  <span className="truncate group-hover:text-[#BE2320] transition-colors duration-300">{loc.name}</span>
                </div>
                <p className="text-xs text-neutral-text font-mono-data pl-6 truncate relative group-hover:text-stone-600 transition-colors duration-300">
                  {loc.region}
                </p>
                {loc.badge && (
                  <p className="text-[11px] text-[#BE2320] font-semibold pl-6 truncate relative">
                    {loc.badge}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 4. Bottom Coverage Notice */}
        <div className="bg-stone-900 text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono-data text-amber-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full GTA Coverage Radius</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-300">
              Don&apos;t see your specific township? We regularly service adjacent rural and commercial zones across Southern Ontario.
            </p>
          </div>

          <a
            href={`tel:${companyDetails.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-stone-100 text-stone-950 text-xs sm:text-sm font-bold font-heading rounded-xl shrink-0 transition-colors shadow-xs"
          >
            <Phone className="w-4 h-4 text-[#BE2320]" />
            <span>Verify Your Location: {companyDetails.phone}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
