import React from "react";
import { prisma } from "@/lib/prisma";
import { SettingsFormClient } from "./SettingsFormClient";
import { Settings } from "lucide-react";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const businessInfo = await prisma.businessInfo.findFirst();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#BE2320]" />
          Business Info & Settings
        </h2>
        <p className="text-sm text-stone-500 mt-1">
          Update phone numbers, office address, operating hours, service regions, and social links.
        </p>
      </div>

      <SettingsFormClient initialData={businessInfo} />
    </div>
  );
}
