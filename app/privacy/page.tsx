import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY_DETAILS } from "@/lib/content/company";
import CTABand from "@/components/sections/CTABand";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  UserCheck, 
  Cookie, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  AlertCircle 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | K2 Pest Control Toronto & GTA",
  description:
    "Review K2 Pest Control's Privacy Policy. Learn how we collect, use, and protect your personal information in compliance with PIPEDA and Ontario regulations.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | K2 Pest Control Toronto & GTA",
    description:
      "Review K2 Pest Control's Privacy Policy. Learn how we collect, use, and protect your personal information in compliance with PIPEDA and Ontario regulations.",
    url: "https://www.k2pc.ca/privacy",
  },
};

export default function PrivacyPolicyPage() {
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
        name: "Privacy Policy",
        item: "https://www.k2pc.ca/privacy",
      },
    ],
  };

  const lastUpdated = "February 24, 2025";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header Banner */}
      <section className="bg-ink text-white py-16 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-mono-data uppercase font-semibold">
            <Lock className="w-4 h-4 text-action-yellow" />
            PIPEDA &amp; CASL Compliant
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
            At {COMPANY_DETAILS.name}, we take your privacy and data security seriously. This policy explains how we collect, handle, and safeguard your personal information.
          </p>
          <div className="text-xs text-stone-400 font-mono-data pt-2">
            Last Updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="bg-surface-warm min-h-screen py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Quick Summary Box */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0 mt-1">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-ink">
                  Privacy Policy Overview
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  We only collect details necessary to quote, dispatch, perform, and warranty pest management services. We do not sell your personal data to any third-party brokers or advertisers. All data handling adheres strictly to Canada&apos;s <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and Canada&apos;s Anti-Spam Legislation (CASL).
                </p>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-stone-200 space-y-10">
            
            {/* Section 1 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-brand-red font-bold text-sm">
                  1
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                  Introduction &amp; Scope
                </h2>
              </div>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11">
                This Privacy Policy applies to personal information collected by <strong>{COMPANY_DETAILS.name}</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) when you visit our website (<Link href="/" className="text-brand-red font-semibold hover:underline">k2pc.ca</Link>), request a quote, contact our dispatch team, or utilize our residential and commercial pest control services across Ontario and the Greater Toronto Area (GTA).
              </p>
            </section>

            <hr className="border-stone-100" />

            {/* Section 2 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-brand-red font-bold text-sm">
                  2
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                  Information We Collect
                </h2>
              </div>
              <div className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11 space-y-4">
                <p>
                  To provide professional pest inspection, extermination, and pest exclusion services, we collect relevant information that you provide voluntarily or through automated website interactions:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-stone-600">
                  <li>
                    <strong>Contact Details:</strong> Full name, telephone number, email address, and physical service address (including unit or suite numbers).
                  </li>
                  <li>
                    <strong>Property &amp; Pest Profile:</strong> Type of dwelling or commercial facility, square footage, observed pest activity (e.g., bed bugs, rodents, cockroaches, carpenter ants), previous treatment history, and presence of children or pets.
                  </li>
                  <li>
                    <strong>Billing &amp; Payment Data:</strong> Payment method details, billing addresses, and transaction histories. Credit card payments are securely tokenized through PCI-DSS compliant payment gateways; we do not store raw card numbers.
                  </li>
                  <li>
                    <strong>Technical &amp; Usage Data:</strong> IP address, browser type, device information, operating system, and pages visited on our website to optimize service responsiveness and user experience.
                  </li>
                </ul>
              </div>
            </section>

            <hr className="border-stone-100" />

            {/* Section 3 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-brand-red font-bold text-sm">
                  3
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                  How We Use Your Information
                </h2>
              </div>
              <div className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11 space-y-3">
                <p>We use your personal data strictly for legitimate operational purposes, including:</p>
                <ul className="list-disc pl-5 space-y-2 text-stone-600">
                  <li>Preparing and delivering free inspection estimates and service quotes.</li>
                  <li>Scheduling and routing Ontario-licensed pest control technicians to your location.</li>
                  <li>Providing pre-treatment preparation checklists, post-treatment safety instructions, and re-entry guidelines.</li>
                  <li>Maintaining warranty records for our 6-month re-treatment guarantee.</li>
                  <li>Meeting statutory reporting and safety record-keeping mandated by the Ontario Ministry of the Environment, Conservation and Parks.</li>
                  <li>Responding to customer inquiries, complaints, or emergency dispatch requests.</li>
                </ul>
              </div>
            </section>

            <hr className="border-stone-100" />

            {/* Section 4 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-brand-red font-bold text-sm">
                  4
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                  Information Sharing &amp; Disclosure
                </h2>
              </div>
              <div className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11 space-y-3">
                <p>
                  <strong>We do not sell, rent, or trade your personal information.</strong> We only share information with trusted third parties under strict confidentiality agreements for essential business operations:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-stone-600">
                  <li>
                    <strong>Licensed Field Technicians:</strong> Contact and address details for technicians assigned to your property inspection or treatment.
                  </li>
                  <li>
                    <strong>Service Providers:</strong> Secure hosting, transactional email delivery, SMS notification gateways, and PCI-compliant payment processors.
                  </li>
                  <li>
                    <strong>Legal &amp; Regulatory Compliance:</strong> When required by law, subpoena, or health and safety regulations to protect the vital interests of occupants, technicians, or the public.
                  </li>
                </ul>
              </div>
            </section>

            <hr className="border-stone-100" />

            {/* Section 5 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-brand-red font-bold text-sm">
                  5
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                  Data Security &amp; Retention
                </h2>
              </div>
              <div className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11 space-y-3">
                <p>
                  We implement robust technical and organizational security measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction. All web traffic is encrypted via HTTPS (SSL/TLS).
                </p>
                <p>
                  We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, enforce warranty coverage, or comply with applicable legal, accounting, and Ontario environmental regulations.
                </p>
              </div>
            </section>

            <hr className="border-stone-100" />

            {/* Section 6 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-brand-red font-bold text-sm">
                  6
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                  Cookies &amp; Analytics
                </h2>
              </div>
              <div className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11 space-y-3">
                <p>
                  Our website uses standard cookies and browser storage to optimize site functionality, preserve session preferences, and gather aggregate traffic analytics. You can adjust your browser settings to decline cookies, although some website features may not operate as intended.
                </p>
              </div>
            </section>

            <hr className="border-stone-100" />

            {/* Section 7 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-brand-red font-bold text-sm">
                  7
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                  Your Rights Under PIPEDA
                </h2>
              </div>
              <div className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11 space-y-3">
                <p>
                  Under Canadian privacy laws, you possess specific rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-stone-600">
                  <li>Requesting access to the personal data we hold about you.</li>
                  <li>Requesting correction or update of inaccurate or outdated details.</li>
                  <li>Withdrawing consent for non-essential communications (such as marketing emails or newsletters) at any time.</li>
                  <li>Requesting deletion of your data, subject to regulatory record-keeping obligations.</li>
                </ul>
              </div>
            </section>

            <hr className="border-stone-100" />

            {/* Section 8 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-brand-red font-bold text-sm">
                  8
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                  Contact Our Privacy Officer
                </h2>
              </div>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data management practices, please reach out to our designated Privacy Officer:
              </p>
              
              <div className="ml-11 bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-3 text-sm text-stone-700">
                <div className="font-semibold text-ink">{COMPANY_DETAILS.name} &ndash; Privacy Inquiries</div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-red shrink-0" />
                  <span>
                    {COMPANY_DETAILS.address.street}, {COMPANY_DETAILS.address.city}, {COMPANY_DETAILS.address.province} {COMPANY_DETAILS.address.postalCode}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-red shrink-0" />
                  <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="text-brand-red hover:underline font-semibold font-mono-data">
                    {COMPANY_DETAILS.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-red shrink-0" />
                  <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-brand-red hover:underline font-semibold">
                    {COMPANY_DETAILS.email}
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* CTA Band */}
      <CTABand />
    </>
  );
}
