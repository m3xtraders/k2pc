import React from "react";
import Link from "next/link";
import { Phone, Calendar } from "lucide-react";
import { COMPANY_DETAILS } from "@/lib/content/company";

export default function MobileCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 p-2.5 shadow-2xl md:hidden">
      <div className="grid grid-cols-2 gap-2">
        {/* Call Now Button */}
        <a
          href={`tel:${COMPANY_DETAILS.phoneRaw}`}
          className="flex items-center justify-center gap-2 bg-brand-red text-white font-bold py-3 px-3 rounded-lg text-sm shadow-md active:bg-brand-red-dark min-h-[44px] transition-colors"
        >
          <Phone className="w-4 h-4 shrink-0 animate-bounce" />
          <span>Call Now</span>
        </a>

        {/* Get Quote Button */}
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 bg-action-yellow text-ink font-bold py-3 px-3 rounded-lg text-sm shadow-md active:bg-amber-500 min-h-[44px] transition-colors"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span>Get Free Quote</span>
        </Link>
      </div>
    </div>
  );
}
