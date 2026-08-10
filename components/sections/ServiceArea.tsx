import React from "react";
import { LOCATIONS } from "@/lib/content/locations";
import { MapPin, Phone, Check } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/content/company";

export default function ServiceArea() {
  return (
    <section className="py-16 bg-surface-warm border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Areas We Serve
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
              Rapid Exterminator Response Across Toronto & The GTA
            </h2>
            <p className="text-base text-neutral-text leading-relaxed">
              We operate mobile pest dispatch units stationed across Southern Ontario. Whether you live in Downtown Toronto, Mississauga, Brampton, Vaughan, or Markham, our licensed exterminators arrive within 2 hours for emergencies.
            </p>

            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs space-y-3 font-mono-data text-xs">
              <div className="flex items-center gap-2 text-brand-red font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Central Hub: {COMPANY_DETAILS.address.street}, Toronto</span>
              </div>
              <p className="text-stone-600">
                Service Radius: Up to {COMPANY_DETAILS.serviceRadiusKm} km coverage spanning 11 municipalities.
              </p>
              <a
                href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                className="inline-flex items-center gap-2 text-brand-red font-bold text-sm hover:underline pt-1"
              >
                <Phone className="w-4 h-4" />
                <span>Check Your City Line: {COMPANY_DETAILS.phone}</span>
              </a>
            </div>
          </div>

          {/* Right City Cards Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {LOCATIONS.map((loc) => (
                <div
                  key={loc.slug}
                  className="bg-white p-4 rounded-xl border border-stone-200 hover:border-brand-red shadow-xs transition-all space-y-1.5"
                >
                  <div className="flex items-center gap-1.5 text-brand-red font-bold text-sm font-heading">
                    <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{loc.name}</span>
                  </div>
                  <p className="text-xs text-neutral-text font-mono-data">
                    {loc.region}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
