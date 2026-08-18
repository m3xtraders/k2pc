import React from "react";
import { getCompanyDetails } from "@/lib/content-db";
import { ServiceAreaClient } from "./ServiceAreaClient";

export default async function ServiceArea() {
  const companyDetails = await getCompanyDetails();
  const locations = companyDetails.serviceLocations || [];

  return (
    <ServiceAreaClient
      companyDetails={companyDetails}
      locations={locations}
    />
  );
}

