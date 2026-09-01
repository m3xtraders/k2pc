import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getLegalPageBySlug, getCompanyDetails } from "@/lib/content-db";
import CTABand from "@/components/sections/CTABand";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getLegalPageBySlug("privacy");

  return {
    title: pageData.metaTitle || `${pageData.title} | K2 Pest Control Saskatoon & Area`,
    description: pageData.metaDescription || pageData.subtitle,
    alternates: {
      canonical: "/privacy",
    },
    openGraph: {
      title: pageData.metaTitle || `${pageData.title} | K2 Pest Control Saskatoon & Area`,
      description: pageData.metaDescription || pageData.subtitle,
      url: "https://www.k2pc.ca/privacy",
    },
  };
}

export default async function PrivacyPolicyPage() {
  const [pageData, company] = await Promise.all([
    getLegalPageBySlug("privacy"),
    getCompanyDetails(),
  ]);

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
        name: pageData.title,
        item: "https://www.k2pc.ca/privacy",
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
      <section className="bg-ink text-white py-16 border-b border-[#1C4E75]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-red text-white text-xs font-mono-data uppercase font-semibold shadow-xs">
            <Lock className="w-4 h-4 text-action-yellow" />
            PIPEDA &amp; CASL Compliant
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            {pageData.title}
          </h1>
          {pageData.subtitle && (
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {pageData.subtitle}
            </p>
          )}
          {pageData.lastUpdated && (
            <div className="text-xs text-stone-400 font-mono-data pt-1">
              Last Updated: {pageData.lastUpdated}
            </div>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="bg-surface-warm min-h-screen py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Summary Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0 mt-1">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h2 className="font-heading font-bold text-lg text-ink">
                  Privacy Policy Overview &amp; Data Promise
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  We collect only the details strictly necessary to quote, dispatch, perform, and warranty pest management services. We do not sell your personal data. All information handling adheres to Canada&apos;s <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA).
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Rich Text Content */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-stone-200">
            <div
              className="prose prose-stone max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-ink prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:border-b prose-h2:border-stone-100 prose-h2:pb-2.5 prose-h3:text-lg prose-p:text-stone-700 prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed prose-li:text-stone-700 prose-li:text-sm sm:prose-li:text-base prose-strong:text-ink prose-a:text-brand-red prose-a:font-semibold hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: pageData.content }}
            />
          </div>
        </div>
      </div>

      {/* CTA Band */}
      <CTABand />
    </>
  );
}
