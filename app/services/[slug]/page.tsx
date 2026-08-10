import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPublishedServices, getPublishedServiceBySlug, getCompanyDetails } from "@/lib/content-db";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTABand from "@/components/sections/CTABand";
import ContactForm from "@/components/sections/ContactForm";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, CheckCircle, AlertTriangle, Phone } from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getPublishedServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await getPublishedServiceBySlug(resolvedParams.slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} | Exterminator Toronto & GTA`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | K2PC Pest Control GTA`,
      description: service.shortDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const service = await getPublishedServiceBySlug(resolvedParams.slug);
  const company = await getCompanyDetails();

  if (!service) {
    notFound();
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    provider: {
      "@type": "PestControlService",
      name: company.name,
      telephone: company.phone,
      url: "https://www.k2pc.ca",
    },
    areaServed: company.regionsServed,
    description: service.fullDescription,
    offers: {
      "@type": "Offer",
      price: service.pricingStartsAt.replace("$", ""),
      priceCurrency: "CAD",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (service.faqs || []).map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Service Hero */}
      <section className="bg-ink text-white py-12 md:py-16 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="yellow">From {service.pricingStartsAt}</Badge>
                <span className="text-xs font-mono-data text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  {service.warranty}
                </span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                {service.title}
              </h1>

              <div
                className="prose prose-invert max-w-3xl text-base sm:text-lg text-stone-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: service.fullDescription }}
              />

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono-data text-stone-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-action-yellow" />
                  Ontario Licensed Exterminators
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-action-yellow" />
                  100% Pet & Child Safe IPM
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-action-yellow" />
                  Same-Day Emergency Service
                </span>
              </div>
            </div>

            {/* Quick Call Box */}
            <div className="lg:col-span-4 bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-4 text-center">
              <h3 className="font-heading font-bold text-xl text-white">
                Urgent Pest Emergency?
              </h3>
              <p className="text-xs text-stone-400">
                Speak directly with an active GTA technician for instant pricing.
              </p>
              <a
                href={`tel:${company.phoneRaw}`}
                className="flex items-center justify-center gap-2 bg-action-yellow text-ink font-bold py-3.5 px-4 rounded-lg hover:bg-amber-400 font-mono-data text-base transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Call {company.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 bg-surface-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Detail Column */}
            <div className="lg:col-span-7 space-y-12">
              {/* Signs of Infestation */}
              {service.signsOfInfestation && service.signsOfInfestation.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-brand-red shrink-0" />
                    <h2 className="font-heading font-extrabold text-2xl text-ink">
                      Key Signs of {service.title} Needed
                    </h2>
                  </div>
                  <ul className="grid grid-cols-1 gap-3">
                    {service.signsOfInfestation.map((sign, index) => (
                      <li
                        key={index}
                        className="bg-surface-warm p-4 rounded-xl border border-stone-200 text-sm text-ink flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-red-100 text-brand-red flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Treatment Process */}
              {service.treatmentProcess && service.treatmentProcess.length > 0 && (
                <div className="space-y-6">
                  <h2 className="font-heading font-extrabold text-2xl text-ink">
                    Our Extermination & Treatment Protocol
                  </h2>
                  <div className="space-y-4">
                    {service.treatmentProcess.map((step) => (
                      <div
                        key={step.step}
                        className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-2 hover:border-brand-red/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-brand-red text-white font-mono-data font-bold text-sm flex items-center justify-center">
                            0{step.step}
                          </span>
                          <h3 className="font-heading font-bold text-lg text-ink">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm text-neutral-text pl-11 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Form Column */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <FAQAccordion
          title={`${service.title} FAQs`}
          subtitle="Specific questions answered by our licensed entomologists."
          items={service.faqs.map((f, i) => ({
            id: `service-faq-${i}`,
            question: f.question,
            answer: f.answer,
            category: "General",
          }))}
        />
      )}

      <CTABand />
    </>
  );
}
