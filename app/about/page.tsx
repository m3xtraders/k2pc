import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { getCompanyDetails } from "@/lib/content-db";
import StatsCounter from "@/components/sections/StatsCounter";
import AboutSection from "@/components/sections/AboutSection";
import AboutCredentials from "@/components/sections/AboutCredentials";
import AboutProcess from "@/components/sections/AboutProcess";
import CTABand from "@/components/sections/CTABand";
import Testimonials from "@/components/sections/Testimonials";
import ServiceArea from "@/components/sections/ServiceArea";
import LocationMapWidget from "@/components/sections/LocationMapWidget";
import { ShieldCheck, Award, FileCheck, HeartHandshake, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Provincial Licensing | K2 Pest Control Saskatoon",
  description:
    "Learn about K2 Pest Control's history, provincial pesticide licensing, $5M liability insurance, and eco-friendly IPM team.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us & Provincial Licensing | K2 Pest Control Saskatoon",
    description:
      "Learn about K2 Pest Control's history, provincial pesticide licensing, $5M liability insurance, and eco-friendly IPM team.",
    url: "https://www.k2pc.ca/about",
  },
};

export default async function AboutPage() {
  const company = await getCompanyDetails();
  const licenseNumber = company.licenseNumber || COMPANY_DETAILS.licenseNumber;

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
        name: "About Us",
        item: "https://www.k2pc.ca/about",
      },
    ],
  };

  const values = [
    {
      title: "Safety & Eco-First IPM",
      icon: ShieldCheck,
      description: "We prioritize non-chemical exclusion and targeted low-volatility formulations safe for children and pets.",
    },
    {
      title: "Full Transparency & Pricing",
      icon: FileCheck,
      description: "No hidden inspection surcharges or unexpected upsells. Upfront written quotes provided before any work begins.",
    },
    {
      title: "Saskatchewan Regulatory Excellence",
      icon: Award,
      description: "All technicians maintain Saskatchewan Ministry of Environment pesticide applicator licenses, continuous safety training, and WCB compliance.",
    },
    {
      title: "6-Month Warranty",
      icon: HeartHandshake,
      description: "We stand behind our work with a 6-month warranty on all residential and commercial pest treatments.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Header Banner */}
      <section className="bg-ink text-white pt-16 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-mono-data uppercase font-semibold">
            <Shield className="w-4 h-4 text-action-yellow" />
            License No: {licenseNumber}
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            About K2 Pest Control
          </h1>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Delivering science-backed, licensed extermination across Saskatoon &amp; surrounding communities.
          </p>
        </div>
      </section>

      <StatsCounter className="border-t-0 pt-6 pb-16" />

      <AboutSection />

      {/* Credentials & Discreet Service Section */}
      <AboutCredentials licenseNumber={licenseNumber} />

      {/* 3-Step Process Section */}
      <AboutProcess />

      {/* Story / Mission */}
      <section className="py-16 bg-surface-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
                OUR STORY
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
                Protecting Saskatoon Homes Since 2023
              </h2>
              <p className="text-base text-neutral-text leading-relaxed">
                K2 Pest Control was founded in Saskatoon to address a glaring gap in the market: traditional exterminators relying on generic chemical sprays without addressing how pests entered in the first place.
              </p>
              <p className="text-base text-neutral-text leading-relaxed">
                Over the past 3 years, our team of licensed technicians has built a reputation for exclusion-first IPM strategies. We treat every Saskatoon-area property like our own home — inspecting thoroughly, eliminating nests at the root, and sealing entry points permanently.
              </p>
            </div>
            <div className="lg:col-span-6 relative h-[400px] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80"
                alt="K2 Pest Control licensed extermination technician carrying out property inspection"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-surface-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
              Our Core Guiding Principles
            </h2>
            <p className="text-base sm:text-lg text-neutral-text leading-relaxed">
              The promises we keep on every residential and commercial job across Saskatoon &amp; area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div
                  key={i}
                  className="bg-surface-warm p-6 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-brand-red/30 transition-all duration-300 space-y-3.5"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100/80 shadow-2xs">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-ink">{v.title}</h3>
                  <p className="text-sm text-neutral-text leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Saskatoon Service Locations Section */}
      <ServiceArea />
      <LocationMapWidget />

      {/* Google Reviews Section */}
      <Testimonials />

      <CTABand />
    </>
  );
}
