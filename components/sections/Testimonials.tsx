import React from "react";
import { TESTIMONIALS } from "@/lib/content/testimonials";
import { Star, CheckCircle2, Quote } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function Testimonials() {
  return (
    <section className="py-16 bg-surface-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Verified Reviews
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
            Trusted by Over 12,000 GTA Homeowners & Businesses
          </h2>
          <div className="flex items-center justify-center gap-2 pt-1 font-mono-data text-sm font-semibold text-ink">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span>4.9 / 5.0 Average Rating (480+ Google Reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <Card key={item.id} className="flex flex-col justify-between space-y-4 relative">
              <Quote className="w-8 h-8 text-red-100 absolute top-6 right-6" />

              <div className="space-y-3 relative z-10">
                {/* Rating Stars */}
                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Service Tag */}
                <span className="inline-block text-xs font-mono-data font-semibold text-brand-red bg-red-50 px-2.5 py-0.5 rounded border border-red-100">
                  {item.serviceReceived}
                </span>

                {/* Comment */}
                <p className="text-sm text-ink leading-relaxed italic">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-mono-data">
                <div>
                  <span className="font-bold text-ink block">{item.name}</span>
                  <span className="text-neutral-text">{item.location}</span>
                </div>
                {item.verified && (
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
