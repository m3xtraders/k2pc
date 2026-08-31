import React from "react";
import { Phone, ShieldCheck, Clock } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { Button } from "@/components/ui/Button";
import { getCompanyDetails } from "@/lib/content-db";

interface CTABandProps {
  companyDetails?: any;
}

export default async function CTABand({ companyDetails }: CTABandProps = {}) {
  const company = companyDetails || (await getCompanyDetails());
  const phone = company?.phone || COMPANY_DETAILS.phone;
  const phoneRaw = company?.phoneRaw || COMPANY_DETAILS.phoneRaw;
  const licenseNumber = company?.licenseNumber || COMPANY_DETAILS.licenseNumber;
  return (
    <section className="bg-brand-red text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background graphic pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-center lg:text-left">
          {/* Left Text */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-action-yellow font-mono-data text-xs font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Same-Day Emergency Dispatch Standing By</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Ready to Eliminate Your Pest Problem?
            </h2>
            <p className="text-stone-100 text-base sm:text-lg max-w-2xl">
              Get an instant online quote or speak directly with a Saskatchewan licensed exterminator. 99.9% satisfaction guaranteed with zero obligation.
            </p>
          </div>

          {/* Right Action Callouts */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg" className="w-full">
              Get Your Free Quote Now
            </Button>
            <a
              href={`tel:${phoneRaw}`}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-ink hover:bg-[#082033] text-white font-bold text-base transition-colors border border-[#1C4E75]/60 min-h-[52px]"
            >
              <Phone className="w-5 h-5 text-action-yellow" />
              <span>Call {phone}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-200 font-mono-data">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-action-yellow" />
            License #{licenseNumber}
          </span>
          <span>•</span>
          <span>6-Month Written Warranty</span>
          <span>•</span>
          <span>Zero Lock-In Contracts</span>
        </div>
      </div>
    </section>
  );
}
