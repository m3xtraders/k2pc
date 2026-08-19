import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Service } from "@/lib/types";
import { PestIcon } from "@/components/ui/PestIcon";
import { getServiceCoverImage } from "@/lib/content/services";
import { ArrowRight, ShieldCheck, Home, Building, Calendar, Bug } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const coverImage = getServiceCoverImage(service);

  const renderCategoryIcon = () => {
    if (["ant", "rodent", "cockroach", "bed-bug", "wasp", "spider"].includes(service.icon)) {
      return <PestIcon name={service.icon} size={22} />;
    }
    switch (service.icon) {
      case "home":
        return <Home className="w-5 h-5" />;
      case "building":
        return <Building className="w-5 h-5" />;
      case "shield":
        return <ShieldCheck className="w-5 h-5" />;
      case "calendar":
        return <Calendar className="w-5 h-5" />;
      default:
        return <Bug className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-xl hover:border-brand-red/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Top Cover Image with Floating Icon and Pricing Tag */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-stone-100">
        <Image
          src={coverImage}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          quality={65}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized={coverImage.startsWith("data:")}
        />
        {/* Subtle gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/25 pointer-events-none" />

        {/* Floating Category Icon Badge */}
        <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md text-brand-red shadow-md flex items-center justify-center border border-white/60 group-hover:bg-brand-red group-hover:text-white transition-all duration-300">
          {renderCategoryIcon()}
        </div>

        {/* Floating Price Tag */}
        <div className="absolute top-3.5 right-3.5">
          <Badge variant="yellow" className="text-xs font-mono-data font-bold shadow-md">
            From {service.pricingStartsAt}
          </Badge>
        </div>

        {/* Floating Category Pill */}
        <div className="absolute bottom-3 left-3.5">
          <span className="text-[11px] font-mono-data font-semibold uppercase tracking-wider text-white bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
            {service.pestCategory}
          </span>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="font-heading font-bold text-xl text-ink group-hover:text-brand-red transition-colors line-clamp-1 leading-snug">
            <Link href={`/services/${service.slug}`} className="hover:underline">
              {service.title}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-sm text-neutral-text leading-relaxed line-clamp-3">
            {service.shortDescription}
          </p>

          {/* Warranty / Guarantee Tag */}
          <div className="inline-flex items-center gap-2 text-xs font-mono-data text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{service.warranty || "Guaranteed Eradication"}</span>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-auto">
          <span className="text-xs font-mono-data text-stone-400 font-medium">
            Licensed & Insured
          </span>
          <Link
            href={`/services/${service.slug}`}
            className="text-sm font-bold text-brand-red hover:text-brand-red-dark flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
