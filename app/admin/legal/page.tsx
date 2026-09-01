import React from "react";
import { getLegalPageBySlug } from "@/lib/content-db";
import { LegalPagesClient } from "./LegalPagesClient";
import { Scale } from "lucide-react";

export const revalidate = 0;

export default async function AdminLegalPage() {
  const [privacyDoc, termsDoc] = await Promise.all([
    getLegalPageBySlug("privacy"),
    getLegalPageBySlug("terms"),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2.5">
            <Scale className="w-6 h-6 text-[#BE2320]" />
            Legal &amp; Policy Pages
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Manage and edit customer-facing Privacy Policy, Terms of Service, warranty clauses, and PIPEDA compliance text.
          </p>
        </div>
      </div>

      <LegalPagesClient
        initialPrivacy={privacyDoc}
        initialTerms={termsDoc}
      />
    </div>
  );
}
