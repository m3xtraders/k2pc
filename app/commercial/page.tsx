import React from "react";
import { Metadata } from "next";
import { CommercialClient } from "./CommercialClient";
import { getCompanyDetails, getPublishedServices } from "@/lib/content-db";
import { COMPANY_DETAILS } from "@/lib/content/company";

export const metadata: Metadata = {
  title: "Commercial Pest Control & Facility IPM | Toronto & GTA",
  description:
    "Discreet, scheduled, audit-ready commercial pest control for restaurants, warehouses, property managers, healthcare, and corporate offices across Greater Toronto.",
};

export default async function CommercialPage() {
  const [companyDetails, services] = await Promise.all([
    getCompanyDetails(),
    getPublishedServices(),
  ]);

  return (
    <CommercialClient
      companyDetails={companyDetails || COMPANY_DETAILS}
      services={services || []}
    />
  );
}
