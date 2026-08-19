import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPublishedServices, getPublishedServiceBySlug, getCompanyDetails } from "@/lib/content-db";
import { getServiceCoverImage } from "@/lib/content/services";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTABand from "@/components/sections/CTABand";
import ContactForm from "@/components/sections/ContactForm";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, CheckCircle, AlertTriangle, Phone, FileText, CheckCircle2, ShieldAlert } from "lucide-react";

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
    description: service.fullDescription || service.shortDescription,
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

      {/* Service Hero Header */}
      <section className="bg-ink text-white py-12 md:py-16 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="yellow">From {service.pricingStartsAt}</Badge>
                <span className="text-xs font-mono-data text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  {service.warranty}
                </span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                {service.title}
              </h1>

              {/* Short Description in Hero */}
              <p className="text-base sm:text-xl text-stone-300 max-w-3xl leading-relaxed">
                {service.shortDescription}
              </p>

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
            <div className="lg:col-span-4 bg-stone-900/90 border border-stone-800 p-6 rounded-2xl space-y-4 text-center shadow-xl">
              <h3 className="font-heading font-bold text-xl text-white">
                Urgent Pest Emergency?
              </h3>
              <p className="text-xs text-stone-400">
                Speak directly with an active GTA technician for instant pricing.
              </p>
              <a
                href={`tel:${company.phoneRaw}`}
                className="flex items-center justify-center gap-2 bg-action-yellow text-ink font-bold py-3.5 px-4 rounded-lg hover:bg-amber-400 font-mono-data text-base transition-colors shadow-md"
              >
                <Phone className="w-5 h-5" />
                <span>Call {company.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 md:py-16 bg-surface-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Detail Column */}
            <div className="lg:col-span-7 space-y-10">
              {/* Detailed Long Description Section */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                {/* Service Cover Banner */}
                <div className="relative w-full h-60 sm:h-72 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                  <Image
                    src={service.featuredImage || getServiceCoverImage(service)}
                    alt={service.title}
                    fill
                    priority
                    quality={70}
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover"
                    unoptimized={(service.featuredImage || "").startsWith("data:")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-xs font-mono-data font-semibold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/20">
                      {service.pestCategory}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                  <div className="p-2.5 rounded-xl bg-red-50 text-brand-red">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-heading font-extrabold text-2xl text-ink">
                      Detailed Service Overview & Plan
                    </h2>
                    <p className="text-xs text-neutral-text font-mono-data">
                      Comprehensive pest management & eradication details
                    </p>
                  </div>
                </div>

                <div
                  className="prose prose-stone max-w-none text-ink leading-relaxed text-base sm:text-lg space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: service.fullDescription.includes("<p>")
                      ? service.fullDescription
                      : service.fullDescription.replace(/\n\n/g, "<br/><br/>"),
                  }}
                />
              </div>

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
                        className="bg-surface-warm p-4 rounded-xl border border-stone-200 text-sm text-ink flex items-start gap-3 shadow-2xs"
                      >
                        <span className="w-6 h-6 rounded-full bg-red-100 text-brand-red flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed">{sign}</span>
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

              {/* Why Choose K2PC Cards */}
              <div className="bg-stone-900 text-white p-8 rounded-2xl space-y-6 border border-stone-800 shadow-lg">
                <h3 className="font-heading font-bold text-2xl text-white">
                  Why Choose K2PC for {service.title}?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-action-yellow shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-white">100% Eradication Guarantee</h4>
                      <p className="text-xs text-stone-400">Complete pest removal with free re-treatment warranty.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-action-yellow shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Ontario Licensed Applicators</h4>
                      <p className="text-xs text-stone-400">Fully insured & Ministry certified extermination experts.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-action-yellow shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Pet & Family Safe Methods</h4>
                      <p className="text-xs text-stone-400">Integrated Pest Management safe for kids and domestic pets.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-action-yellow shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Fast 2-Hour Response</h4>
                      <p className="text-xs text-stone-400">Same-day dispatch across Toronto & all 11 GTA regions.</p>
                    </div>
                  </div>
                </div>
              </div>
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
