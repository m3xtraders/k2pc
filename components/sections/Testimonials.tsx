import React from "react";
import Image from "next/image";
import { Star, CheckCircle2, ExternalLink, MessageSquarePlus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { getCompanyDetails } from "@/lib/content-db";
import { TESTIMONIALS } from "@/lib/content/testimonials";

// Official Google G Icon SVG
function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

interface TestimonialsProps {
  companyDetails?: any;
}

export default async function Testimonials({ companyDetails }: TestimonialsProps = {}) {
  const company = companyDetails || (await getCompanyDetails());
  const rating = company?.stats?.googleRating || 4.9;
  const reviewCount = company?.stats?.reviewCount || 480;
  const googleMapsUrl =
    company?.googleBusinessUrl ||
    company?.googleMapsUrl ||
    "https://maps.google.com";

  return (
    <section className="py-20 bg-surface-warm border-y border-stone-200 relative overflow-hidden" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block with Google Summary Card */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-xs">
              <GoogleIcon className="w-4 h-4" />
              <span className="text-xs font-mono-data font-bold text-ink tracking-wide">
                Google Verified Reviews
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight">
              Real Reviews from Saskatoon &amp; Area Homeowners
            </h2>
            <p className="text-base sm:text-lg text-neutral-text leading-relaxed">
              Read authentic feedback from local homeowners and property managers across Saskatoon, Warman, Martensville, and surrounding communities.
            </p>
          </div>

          {/* Google Score & Review Button Widget */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center shadow-xs">
                <GoogleIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-extrabold font-heading text-ink">{rating}</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs font-mono-data text-stone-500 font-medium">
                  Based on <strong className="text-ink">{reviewCount}+ Google Reviews</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-red-dark transition-all shadow-xs w-full sm:w-auto min-h-[40px]"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Write a Review</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <Card
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-brand-red/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3.5">
                {/* Header: User Avatar + Name + Google Logo */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-red to-red-400 text-white font-bold font-heading flex items-center justify-center text-sm shadow-xs">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-sm text-ink block font-heading leading-tight">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-stone-400 font-mono-data">
                        {item.location} • {item.date}
                      </span>
                    </div>
                  </div>
                  <GoogleIcon className="w-4 h-4 opacity-90 group-hover:scale-110 transition-transform" />
                </div>

                {/* Rating Stars + Service Badge */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="inline-block text-[11px] font-mono-data font-semibold text-brand-red bg-red-50 px-2 py-0.5 rounded border border-red-100/70">
                    {item.serviceReceived}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-stone-700 leading-relaxed">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Verified Badge */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono-data text-stone-400">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Customer
                </span>
                <span className="text-stone-400 font-medium">Google Review</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Link to Google Profile */}
        <div className="mt-10 text-center">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-brand-red transition-colors group font-mono-data"
          >
            <span>View all 480+ Google Reviews on Google Maps</span>
            <ExternalLink className="w-4 h-4 text-brand-red group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
