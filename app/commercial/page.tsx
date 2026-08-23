import React from "react";
import { Metadata } from "next";
import { CommercialClient } from "./CommercialClient";
import { getCompanyDetails, getPublishedServices } from "@/lib/content-db";
import { COMPANY_DETAILS } from "@/lib/content/company";

export const metadata: Metadata = {
  title: "Commercial Pest Control & Facility IPM | Toronto & GTA",
  description:
    "Discreet, scheduled, audit-ready commercial pest control for restaurants, warehouses, property managers, healthcare, and corporate offices across Greater Toronto.",
  alternates: {
    canonical: "/commercial",
  },
  openGraph: {
    title: "Commercial Pest Control & Facility IPM | Toronto & GTA",
    description:
      "Discreet, scheduled, audit-ready commercial pest control for restaurants, warehouses, property managers, healthcare, and corporate offices across Greater Toronto.",
    url: "https://www.k2pc.ca/commercial",
  },
};

export default async function CommercialPage() {
  const [companyDetails, services] = await Promise.all([
    getCompanyDetails(),
    getPublishedServices(),
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
        name: "Commercial Pest Control",
        item: "https://www.k2pc.ca/commercial",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CommercialClient
        companyDetails={companyDetails || COMPANY_DETAILS}
        services={services || []}
      />
    </>
  );
}
