import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedServices, getCompanyDetails, getPublishedLocations, getPublishedLocationBySlug } from "@/lib/content-db";
import { COMPANY_DETAILS } from "@/lib/content/company";
import ContactForm from "@/components/sections/ContactForm";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTABand from "@/components/sections/CTABand";
import LocationMapWidget from "@/components/sections/LocationMapWidget";
import { Badge } from "@/components/ui/Badge";
import { PestIcon } from "@/components/ui/PestIcon";
import {
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const locations = await getPublishedLocations();
  return locations.map((loc) => ({
    slug: loc.slug,
  }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const location = await getPublishedLocationBySlug(resolvedParams.slug);

  if (!location) {
    return { title: "Location Not Found" };
  }

  const title = `${location.name} Pest Control & Exterminator | Fast 2h Response`;
  const description = `Licensed, guaranteed pest control and exterminator in ${location.name}, ${location.region}. Fast emergency removal for mice, bed bugs, ants, wasps, and roaches. 6-month written warranty.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/locations/${location.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.k2pc.ca/locations/${location.slug}`,
    },
  };
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const resolvedParams = await params;
  const [location, company, services] = await Promise.all([
    getPublishedLocationBySlug(resolvedParams.slug),
    getCompanyDetails(),
    getPublishedServices(),
  ]);

  if (!location) {
    notFound();
  }

  const phone = company?.phone || COMPANY_DETAILS.phone;
  const phoneRaw = company?.phoneRaw || COMPANY_DETAILS.phoneRaw;
  const licenseNumber = company?.licenseNumber || COMPANY_DETAILS.licenseNumber;
  const pageUrl = `https://www.k2pc.ca/locations/${location.slug}`;

  // Structured Data: BreadcrumbList
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
      {
        "@type": "ListItem",
        position: 3,
        name: location.name,
        item: pageUrl,
      },
    ],
  };

  // Structured Data: LocalBusiness / PestControlService
  const localServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "PestControlService",
    name: `${company.name} - ${location.name}`,
    description: location.description,
    telephone: phone,
    url: pageUrl,
    image: "https://www.k2pc.ca/assets/logo.png",
    areaServed: {
      "@type": "City",
      name: location.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: location.region,
      },
    },
    currenciesAccepted: "CAD",
    priceRange: "$$",
    license: licenseNumber,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.7142,
      longitude: -79.3364,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: COMPANY_DETAILS.stats.googleRating.toString(),
      reviewCount: COMPANY_DETAILS.stats.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
  };

  // Structured Data: FAQPage
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (location.faqs || []).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localServiceJsonLd) }}
      />
      {location.faqs && location.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Hero Header */}
      <section className="bg-ink text-white py-12 md:py-18 border-b border-stone-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="yellow">{location.region}</Badge>
                {location.badge && (
                  <span className="text-xs font-mono-data text-emerald-400 font-semibold flex items-center gap-1">
                    <Zap className="w-4 h-4 text-action-yellow" />
                    {location.badge}
                  </span>
                )}
                <span className="text-xs font-mono-data text-stone-300 flex items-center gap-1">
                  <Shield className="w-4 h-4 text-brand-red" />
                  License #{licenseNumber}
                </span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                {location.name} Pest Control &amp; Exterminator Services
              </h1>

              <p className="text-base sm:text-xl text-stone-300 max-w-3xl leading-relaxed">
                {location.heroTagline || location.description}
              </p>

              <div className="pt-3 flex flex-wrap gap-4 text-xs font-mono-data text-stone-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-action-yellow" />
                  Ontario Licensed Technicians
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-action-yellow" />
                  6-Month Re-treatment Guarantee
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-action-yellow" />
                  100% Pet &amp; Kid Safe IPM
                </span>
              </div>
            </div>

            {/* Quick Call Box */}
            <div className="lg:col-span-4 bg-stone-900/90 border border-stone-800 p-6 rounded-2xl space-y-4 text-center shadow-xl">
              <span className="text-xs font-mono-data text-action-yellow font-bold uppercase tracking-wider block">
                Direct {location.name} Dispatch Line
              </span>
              <h3 className="font-heading font-bold text-xl text-white">
                Active Pest Emergency?
              </h3>
              <p className="text-xs text-stone-400">
                Speak directly with an active {location.name} technician for instant pricing &amp; 2-hour arrival.
              </p>
              <a
                href={`tel:${phoneRaw}`}
                className="flex items-center justify-center gap-2 bg-action-yellow text-ink font-bold py-3.5 px-4 rounded-xl hover:bg-amber-400 font-mono-data text-base transition-colors shadow-md"
              >
                <Phone className="w-5 h-5 text-brand-red" />
                <span>Call {phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Details + Contact Form */}
      <section className="py-12 md:py-16 bg-surface-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Local Information & Services */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Local Overview Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-5">
                <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                  <div className="p-2.5 rounded-xl bg-red-50 text-brand-red">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-heading font-extrabold text-2xl text-ink">
                      Local Pest Defense in {location.name}
                    </h2>
                    <p className="text-xs text-neutral-text font-mono-data">
                      {location.region} • Dedicated Dispatch Zone
                    </p>
                  </div>
                </div>

                <p className="text-base text-stone-700 leading-relaxed">
                  {location.description}
                </p>

                {/* Common Pests in this City */}
                {location.commonPests && location.commonPests.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h3 className="font-heading font-bold text-lg text-ink flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-brand-red" />
                      <span>Frequent Pest Challenges in {location.name}</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {location.commonPests.map((pest, idx) => (
                        <div
                          key={idx}
                          className="bg-surface-warm p-3 rounded-xl border border-stone-200 text-xs font-medium text-stone-800 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                          <span>{pest}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Neighborhoods Covered */}
              {location.neighborhoods && location.neighborhoods.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-action-yellow" />
                    <h3 className="font-heading font-bold text-xl text-ink">
                      {location.name} Neighborhoods &amp; Communities Served
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-text">
                    Our licensed mobile extermination vans service all properties throughout:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {location.neighborhoods.map((n, i) => (
                      <span
                        key={i}
                        className="bg-surface-warm border border-stone-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-800"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Pest Removal Services Available */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-extrabold text-2xl text-ink">
                    Available Extermination Services in {location.name}
                  </h3>
                  <Link
                    href="/services"
                    className="text-xs font-mono-data font-bold text-brand-red hover:underline flex items-center gap-1"
                  >
                    <span>All Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.slice(0, 6).map((srv) => (
                    <Link
                      key={srv.id}
                      href={`/services/${srv.slug}`}
                      className="group bg-white p-4 rounded-xl border border-stone-200 hover:border-brand-red shadow-xs hover:shadow-md transition-all flex items-start gap-3.5"
                    >
                      <div className="w-10 h-10 rounded-lg bg-red-50 text-brand-red flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:text-white transition-colors">
                        <PestIcon name={srv.icon} size={20} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-heading font-bold text-sm text-ink group-hover:text-brand-red transition-colors">
                          {srv.title}
                        </h4>
                        <p className="text-[11px] text-neutral-text line-clamp-2 leading-snug">
                          {srv.shortDescription}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 4 Trust Highlights */}
              <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-2xl space-y-5 border border-stone-800 shadow-lg">
                <h3 className="font-heading font-bold text-xl text-white">
                  Why {location.name} Property Owners Trust K2 Pest Control
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-action-yellow font-bold text-sm">
                      <Clock className="w-4 h-4" />
                      <span>2-Hour Emergency Arrival</span>
                    </div>
                    <p className="text-xs text-stone-400">
                      Rapid dispatch across {location.name} with fully stocked exterminator vehicles.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-action-yellow font-bold text-sm">
                      <ShieldCheck className="w-4 h-4" />
                      <span>6-Month Written Guarantee</span>
                    </div>
                    <p className="text-xs text-stone-400">
                      Free re-treatments if pests return within your 180-day warranty period.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-action-yellow font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Child &amp; Pet Safe IPM</span>
                    </div>
                    <p className="text-xs text-stone-400">
                      Targeted non-chemical exclusion and Health Canada certified formulations.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-action-yellow font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Zero Hidden Surcharges</span>
                    </div>
                    <p className="text-xs text-stone-400">
                      Upfront written quote before any work starts. No surprise inspection fees.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Contact Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                  <h3 className="font-heading font-bold text-xl text-ink mb-1">
                    Book {location.name} Pest Inspection
                  </h3>
                  <p className="text-xs text-neutral-text mb-4">
                    Fill out the form below or call directly for same-day dispatch.
                  </p>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQs */}
      {location.faqs && location.faqs.length > 0 && (
        <FAQAccordion
          title={`${location.name} Pest Control FAQs`}
          subtitle={`Answers to common extermination questions in ${location.name} and ${location.region}.`}
          items={location.faqs.map((f, i) => ({
            id: `${location.slug}-faq-${i}`,
            question: f.question,
            answer: f.answer,
            category: "General",
          }))}
        />
      )}

      {/* Local Map Widget */}
      <LocationMapWidget
        heading={`K2 PEST CONTROL DISPATCH FOR ${location.name.toUpperCase()}`}
        subtitle={`Servicing all homes, commercial facilities, and residential units across ${location.name} and surrounding communities.`}
      />

      <CTABand />
    </>
  );
}
