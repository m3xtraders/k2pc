import React from "react";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { getCompanyDetails } from "@/lib/content-db";
import HeroCarousel from "@/components/sections/HeroCarousel";

interface HeroProps {
  companyDetails?: any;
}

export default async function Hero({ companyDetails }: HeroProps = {}) {
  const company = companyDetails || (await getCompanyDetails());

  const phone = company?.phone || COMPANY_DETAILS.phone;
  const phoneRaw = company?.phoneRaw || COMPANY_DETAILS.phoneRaw;
  const stats = company?.stats || COMPANY_DETAILS.stats;

  return <HeroCarousel phone={phone} phoneRaw={phoneRaw} stats={stats} />;
}

