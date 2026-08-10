import React from "react";
import Metadata from "next";
import ContactForm from "@/components/sections/ContactForm";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTABand from "@/components/sections/CTABand";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { GLOBAL_FAQS } from "@/lib/content/faqs";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "Contact & Free Quote | K2PC Pest Control GTA",
  description:
    "Get a free pest control quote or call our emergency line. Serving Toronto, Mississauga, Brampton, Vaughan, Markham, and Oakville.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header Banner */}
      <section className="bg-ink text-white py-14 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-mono-data uppercase font-semibold">
            <Zap className="w-4 h-4 text-action-yellow" />
            Same-Day Emergency Dispatch Available
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Contact K2PC Pest Control
          </h1>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Reach out for a fast, guaranteed pest quote or speak directly with an Ontario licensed exterminator.
          </p>
        </div>
      </section>

      <section className="py-16 bg-surface-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8">
              {/* Emergency Banner */}
              <div className="bg-red-50 border-2 border-brand-red p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-brand-red font-bold text-lg font-heading">
                  <Zap className="w-5 h-5" />
                  <span>2-Hour Emergency Response</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Experiencing an urgent wasp nest, heavy mouse infestation, or bed bug outbreak? Call our emergency line directly for immediate dispatch.
                </p>
                <a
                  href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                  className="inline-flex items-center gap-2 bg-brand-red text-white font-bold px-4 py-2.5 rounded-lg font-mono-data text-sm hover:bg-brand-red-dark transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {COMPANY_DETAILS.phone}</span>
                </a>
              </div>

              {/* Full NAP Info */}
              <div className="bg-surface-warm p-6 rounded-2xl border border-stone-200 space-y-4">
                <h3 className="font-heading font-bold text-xl text-ink border-b border-stone-200 pb-3">
                  Business NAP Details
                </h3>

                <div className="space-y-3 text-sm text-ink font-sans">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">{COMPANY_DETAILS.name}</span>
                      <span className="text-stone-600 text-xs">
                        {COMPANY_DETAILS.address.street}<br />
                        {COMPANY_DETAILS.address.city}, {COMPANY_DETAILS.address.province} {COMPANY_DETAILS.address.postalCode}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-brand-red shrink-0" />
                    <div>
                      <span className="text-xs text-stone-500 block">Phone Line</span>
                      <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="font-mono-data font-bold hover:text-brand-red">
                        {COMPANY_DETAILS.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-brand-red shrink-0" />
                    <div>
                      <span className="text-xs text-stone-500 block">Direct Email</span>
                      <a href={`mailto:${COMPANY_DETAILS.email}`} className="font-mono-data font-bold hover:text-brand-red">
                        {COMPANY_DETAILS.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <Clock className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-ink block">Operating Hours</span>
                      {COMPANY_DETAILS.hours.map((h, i) => (
                        <div key={i} className="flex justify-between gap-4 text-stone-600 font-mono-data">
                          <span>{h.days}:</span>
                          <span className="font-semibold text-ink">{h.times}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200 text-xs font-mono-data text-emerald-700 flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Ontario License #{COMPANY_DETAILS.licenseNumber}</span>
                </div>
              </div>

              {/* Styled Map Embed View */}
              <div className="bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 p-6 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-lg">GTA Service Radius</span>
                  <span className="text-xs font-mono-data text-action-yellow font-semibold">60 km Radius</span>
                </div>
                <div className="h-44 rounded-xl bg-stone-800 border border-stone-700 relative overflow-hidden flex items-center justify-center text-center p-4">
                  <div className="space-y-2">
                    <MapPin className="w-8 h-8 text-brand-red mx-auto animate-bounce" />
                    <p className="text-xs font-mono-data text-stone-300">
                      Central Dispatch: 1200 Eglinton Ave E, Toronto<br />
                      <span className="text-action-yellow font-semibold">Serving all 11 GTA Municipalities</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form Column */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion items={GLOBAL_FAQS} />
      <CTABand />
    </>
  );
}
