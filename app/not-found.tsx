import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PestIcon } from "@/components/ui/PestIcon";
import { Home, Phone } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/content/company";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-surface-warm flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-stone-200 shadow-md text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-100 text-brand-red flex items-center justify-center mx-auto">
          <PestIcon name="spider" size={36} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
            404 — Page Not Found
          </span>
          <h1 className="font-heading font-extrabold text-3xl text-ink">
            Looks Like This Page Crawled Away
          </h1>
          <p className="text-sm text-neutral-text leading-relaxed">
            The page or service link you are looking for may have been moved or updated. Let us get you back on track.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Button href="/" variant="primary" size="md" className="w-full">
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Button>

          <Button href="/services" variant="outline" size="md" className="w-full">
            <span>Browse All 11 Services</span>
          </Button>

          <a
            href={`tel:${COMPANY_DETAILS.phoneRaw}`}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-warm rounded-lg text-sm font-bold text-ink hover:text-brand-red font-mono-data transition-colors"
          >
            <Phone className="w-4 h-4 text-brand-red" />
            <span>Emergency Line: {COMPANY_DETAILS.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
