import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ServicesTableClient } from "./ServicesTableClient";
import { Plus, Bug, Building2 } from "lucide-react";

export const revalidate = 0;

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
            <Bug className="w-6 h-6 text-[#BE2320]" />
            Services &amp; Commercial Programs
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Manage residential extermination and commercial facility programs across the website.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          <Link
            href="/admin/services/new?type=commercial"
            className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>+ Add Commercial Program</span>
          </Link>

          <Link
            href="/admin/services/new"
            className="px-4 py-2 bg-[#BE2320] hover:bg-[#8E1A18] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Residential Service</span>
          </Link>
        </div>
      </div>

      <ServicesTableClient services={services} />
    </div>
  );
}
