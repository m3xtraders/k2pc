import React from "react";
import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTABand from "@/components/sections/CTABand";
import LocationMapWidget from "@/components/sections/LocationMapWidget";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { getCompanyDetails, getPublishedFaqs } from "@/lib/content-db";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Free Quote | K2PC Pest Control Saskatoon",
  description:
    "Get a free pest control quote or call our emergency line. Serving Saskatoon, Warman, Martensville, and surrounding Saskatchewan communities.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Free Quote | K2PC Pest Control Saskatoon",
    description:
      "Get a free pest control quote or call our emergency line. Serving Saskatoon, Warman, Martensville, and surrounding Saskatchewan communities.",
    url: "https://www.k2pc.ca/contact",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContactPage() {
  const [company, faqs] = await Promise.all([
    getCompanyDetails(),
    getPublishedFaqs(),
  ]);
  const phone = company?.phone || COMPANY_DETAILS.phone;
  const phoneRaw = company?.phoneRaw || COMPANY_DETAILS.phoneRaw;
  const email = company?.email || COMPANY_DETAILS.email;
  const name = company?.name || COMPANY_DETAILS.name;
  const address = company?.address || COMPANY_DETAILS.address;
  const hours = company?.hours || COMPANY_DETAILS.hours;
  const licenseNumber = company?.licenseNumber || COMPANY_DETAILS.licenseNumber;

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
        name: "Contact",
        item: "https://www.k2pc.ca/contact",
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
      <section className="bg-ink text-white py-14 border-b border-[#1C4E75]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-mono-data uppercase font-semibold">
            <Zap className="w-4 h-4 text-action-yellow" />
            Same-Day Emergency Dispatch Available
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Contact {name}
          </h1>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Reach out for a fast, guaranteed pest quote or speak directly with a Saskatchewan licensed exterminator.
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
                  href={`tel:${phoneRaw}`}
                  className="inline-flex items-center gap-2 bg-brand-red text-white font-bold px-4 py-2.5 rounded-lg font-mono-data text-sm hover:bg-brand-red-dark transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {phone}</span>
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
                      <span className="font-bold block">{name}</span>
                      <span className="text-stone-600 text-xs">
                        {address.street}<br />
                        {address.city}, {address.province} {address.postalCode}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-brand-red shrink-0" />
                    <div>
                      <span className="text-xs text-stone-500 block">Phone Line</span>
                      <a href={`tel:${phoneRaw}`} className="font-mono-data font-bold hover:text-brand-red">
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-brand-red shrink-0" />
                    <div>
                      <span className="text-xs text-stone-500 block">Direct Email</span>
                      <a href={`mailto:${email}`} className="font-mono-data font-bold hover:text-brand-red">
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <Clock className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-ink block">Operating Hours</span>
                      {hours.map((h: any, i: number) => (
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
                  <span>Saskatchewan License #{licenseNumber}</span>
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

      {/* Interactive Location Map Widget */}
      <LocationMapWidget />

      <FAQAccordion items={faqs} />
      <CTABand />
    </>
  );
}
