import React from "react";
import { getPublishedServices } from "@/lib/content-db";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";

interface ServiceGridProps {
  limit?: number;
  showHeading?: boolean;
}

export default async function ServiceGrid({ limit, showHeading = true }: ServiceGridProps) {
  const services = await getPublishedServices();
  const displayServices = limit ? services.slice(0, limit) : services;

  return (
    <section className="py-16 bg-surface-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
              Professional Extermination
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
              Comprehensive Pest Control Solutions
            </h2>
            <p className="text-base text-neutral-text leading-relaxed">
              From residential homes to commercial facilities, our Saskatchewan licensed applicators provide targeted, long-lasting pest elimination across Saskatoon &amp; surrounding communities.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {limit && services.length > limit && (
          <div className="text-center mt-12">
            <Button href="/services" variant="outline" size="lg">
              View All Extermination Services
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
