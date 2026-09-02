import React from "react";
import { prisma } from "@/lib/prisma";
import { WarrantiesClient } from "./WarrantiesClient";
import { getCompanyDetails } from "@/lib/content-db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminWarrantiesPage() {
  const [completedSubmissions, company] = await Promise.all([
    prisma.contactSubmission.findMany({
      where: {
        status: "CLOSED" as any,
      },
      orderBy: { createdAt: "desc" },
    }),
    getCompanyDetails(),
  ]);

  return (
    <div className="space-y-6">
      <WarrantiesClient
        initialRecords={completedSubmissions}
        companyDetails={company}
      />
    </div>
  );
}
