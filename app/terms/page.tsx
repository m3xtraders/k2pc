import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY_DETAILS } from "@/lib/content/company";
import CTABand from "@/components/sections/CTABand";
import { 
  FileCheck, 
  ShieldCheck, 
  AlertTriangle, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Scale, 
  Phone, 
  Mail, 
  MapPin,
  Clock
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service & Warranty Policy | K2 Pest Control Saskatoon",
  description:
    "Read the Terms of Service for K2 Pest Control. Understand our service agreements, 6-month written warranty, customer prep requirements, and payment policies.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service & Warranty Policy | K2 Pest Control Saskatoon",
    description:
      "Read the Terms of Service for K2 Pest Control. Understand our service agreements, 6-month written warranty, customer prep requirements, and payment policies.",
    url: "https://www.k2pc.ca/terms",
  },
};

export default function TermsOfServicePage() {
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
        name: "Terms of Service",
        item: "https://www.k2pc.ca/terms",
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
      <section className="bg-ink text-white py-16 border-b border-[#1C4E75]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-mono-data uppercase font-semibold">
            <FileCheck className="w-4 h-4 text-action-yellow" />
            Service Agreement &amp; Warranty
          </div>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
            These terms govern all pest inspection, extermination, wildlife management, and integrated pest management services provided by {COMPANY_DETAILS.name}.
          </p>
          <div className="text-xs text-stone-400 font-mono-data pt-2">
            Last Updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="bg-surface-warm min-h-screen py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Quick Warranty Highlights Box */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-action-yellow/20 flex items-center justify-center text-ink shrink-0 mt-1">
                <ShieldCheck className="w-6 h-6 text-brand-red" />
              </div>
              <div className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-ink">
                  Our Service Commitment &amp; Guarantee
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  We stand firmly behind our extermination services with a Saskatchewan Ministry-licensed team, upfront written quotes, and our signature <strong>6-month re-treatment warranty</strong> on qualifying treatments. Please review the terms below for details regarding customer preparation, warranties, cancellations, and liability.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Content Sections */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-stone-200 space-y-10">
            
            {/* Section 1 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-brand-red font-bold text-sm">
                  1
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                  Acceptance of Terms
                </h2>
              </div>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11">
                By booking an inspection, confirming a service quote, scheduling an extermination appointment, or utilizing our website, you (&ldquo;Client&rdquo;, &ldquo;Customer&rdquo;, &ldquo;you&rdquo;) agree to be legally bound by these Terms of Service. If you are entering into this agreement on behalf of a business, corporation, or property management entity, you represent that you have the authority to bind that entity.
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
                  Estimates, Inspections &amp; Pricing
                </h2>
              </div>
              <div className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11 space-y-3">
                <ul className="list-disc pl-5 space-y-2 text-stone-600">
                  <li>
                    <strong>Initial Estimates:</strong> Phone or online estimates are based on customer-provided descriptions of the infestation and property layout. Final pricing may be adjusted if the on-site conditions or pest severity significantly differ from the initial description.
                  </li>
                  <li>
                    <strong>Diagnostic Inspections:</strong> On-site diagnostic inspections may carry an agreed-upon inspection fee, which is credited toward the service cost if the customer proceeds with the recommended treatment plan.
                  </li>
                  <li>
                    <strong>Written Quotes:</strong> All final service recommendations and pricing will be provided in writing before chemical or physical treatments commence.
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
                  6-Month Re-Treatment Guarantee &amp; Warranty Policy
                </h2>
              </div>
              <div className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11 space-y-4">
                <p>
                  {COMPANY_DETAILS.name} provides a <strong>6-month written warranty</strong> for qualifying residential treatments (including bed bugs, cockroaches, carpenter ants, and mice/rats), subject to the following criteria:
                </p>
                <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-3 text-sm text-stone-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Full Scope Completion:</strong> The warranty requires completion of all recommended initial and follow-up treatment rounds as specified in your service agreement.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Preparation Adherence:</strong> The client must execute all required pre-treatment prep items (e.g., laundering linens, pulling furniture away from walls, clearing under sinks).</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Structural &amp; Sanitation Recommendations:</strong> The client must address critical conducive conditions identified by the technician (e.g., closing entry gaps, removing food sources, fixing plumbing leaks).</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Multi-Unit &amp; Adjoining Units:</strong> In attached townhomes, condos, or apartment buildings, warranty coverage is contingent upon surrounding units not harboring untreated active infestations.</span>
                  </div>
                </div>
                <p className="text-xs text-stone-500">
                  * If targeted pest activity persists after the standard gestation/incubation period following treatment, {COMPANY_DETAILS.name} will re-inspect and re-treat affected areas at zero additional labor cost during the active warranty period.
                </p>
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
                  Customer Preparation, Safety &amp; Re-entry Protocols
                </h2>
              </div>
              <div className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11 space-y-3">
                <p>
                  To ensure maximum treatment efficacy and safeguard human and animal health:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-stone-600">
                  <li>
                    <strong>Pre-Treatment Preparation:</strong> Clients must complete all preparation instructions provided by our dispatch team prior to the technician&apos;s arrival. Inadequate preparation may result in appointment rescheduling and a cancellation/rescheduling fee.
                  </li>
                  <li>
                    <strong>Vacating the Premises:</strong> For treatments involving liquid sprays, aerosols, or dusting formulations, all human occupants and pets must vacate the treatment area for the mandatory re-entry period (typically 4 to 6 hours, or up to 12&ndash;24 hours for pregnant individuals, infants, or persons with respiratory conditions) as directed by the technician and product label.
                  </li>
                  <li>
                    <strong>Aquariums &amp; Exotic Pets:</strong> Fish tanks must have filtration systems turned off and covered with plastic wrap during treatment.
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
                  Provincial Licensing &amp; Regulatory Compliance
                </h2>
              </div>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11">
                All pest management operations are executed by technicians certified by the <strong>{COMPANY_DETAILS.provincialBody}</strong> under Saskatchewan License #{COMPANY_DETAILS.licenseNumber}. All pest control products used are approved by Health Canada&apos;s Pest Management Regulatory Agency (PMRA) and applied in strict accordance with manufacturer label instructions and Saskatchewan environmental safety laws.
              </p>
            </section>

            <hr className="border-stone-100" />

            {/* Section 6 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-brand-red font-bold text-sm">
                  6
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                  Payment Terms, Cancellations &amp; Rescheduling
                </h2>
              </div>
              <div className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11 space-y-3">
                <ul className="list-disc pl-5 space-y-2 text-stone-600">
                  <li>
                    <strong>Payment Schedule:</strong> Residential services are payable upon completion of service via major credit cards, Interac e-Transfer, debit, or approved digital payments. Commercial accounts are subject to Net 15 or Net 30 terms upon approved credit.
                  </li>
                  <li>
                    <strong>Cancellation &amp; Rescheduling:</strong> We require at least 24 hours advance notice to cancel or reschedule an appointment without penalty. Cancellations made with less than 24 hours notice or missed appointments where the technician cannot gain access to the property may incur a $75 dispatch fee.
                  </li>
                </ul>
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
                  Limitation of Liability
                </h2>
              </div>
              <div className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11 space-y-3">
                <p>
                  To the maximum extent permitted by Saskatchewan law:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-stone-600">
                  <li>
                    {COMPANY_DETAILS.name} is not liable for pre-existing structural damage caused by wood-boring pests (such as carpenter ants or termites) or gnawing damage caused by rodents prior to treatment.
                  </li>
                  <li>
                    {COMPANY_DETAILS.name} is not liable for damages resulting from client failure to follow pre-treatment preparation sheets or post-treatment re-entry instructions.
                  </li>
                  <li>
                    Our total aggregate liability for any claims arising under these terms or related to our services shall not exceed the total amount paid by the customer for the specific service under dispute.
                  </li>
                </ul>
              </div>
            </section>

            <hr className="border-stone-100" />

            {/* Section 8 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-brand-red font-bold text-sm">
                  8
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                  Governing Law &amp; Jurisdiction
                </h2>
              </div>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11">
                These terms shall be governed by and interpreted in accordance with the laws of the Province of Saskatchewan and the applicable federal laws of Canada. Any legal proceedings arising from this agreement shall be submitted to the exclusive jurisdiction of the courts located in Saskatoon, Saskatchewan.
              </p>
            </section>

            <hr className="border-stone-100" />

            {/* Section 9 */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-brand-red font-bold text-sm">
                  9
                </div>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                  Questions &amp; Service Inquiries
                </h2>
              </div>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed pl-11">
                For questions regarding your service agreement, warranty status, or these terms, please contact our administrative team:
              </p>
              
              <div className="ml-11 bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-3 text-sm text-stone-700">
                <div className="font-semibold text-ink">{COMPANY_DETAILS.name} &ndash; Customer Support</div>
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
