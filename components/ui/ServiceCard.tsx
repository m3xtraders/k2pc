import React from "react";
import Link from "next/link";
import { Service } from "@/lib/types";
import { PestIcon } from "@/components/ui/PestIcon";
import { ArrowRight, ShieldCheck, Home, Building, Calendar, Bug } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const renderCategoryIcon = () => {
    if (["ant", "rodent", "cockroach", "bed-bug", "wasp", "spider"].includes(service.icon)) {
      return <PestIcon name={service.icon} size={32} />;
    }
    switch (service.icon) {
      case "home":
        return <Home className="w-8 h-8 text-brand-red" />;
      case "building":
        return <Building className="w-8 h-8 text-brand-red" />;
      case "shield":
        return <ShieldCheck className="w-8 h-8 text-brand-red" />;
      case "calendar":
        return <Calendar className="w-8 h-8 text-brand-red" />;
      default:
        return <Bug className="w-8 h-8 text-brand-red" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm hover:shadow-md hover:border-brand-red/50 transition-all flex flex-col justify-between group">
      <div className="space-y-4">
        {/* Header Icon & Pricing Tag */}
        <div className="flex items-start justify-between gap-4">
          <div className="w-14 h-14 rounded-xl bg-red-50 text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-action-yellow transition-colors">
            {renderCategoryIcon()}
          </div>
          <Badge variant="yellow" className="text-xs">
            From {service.pricingStartsAt}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-xl text-ink group-hover:text-brand-red transition-colors">
          <Link href={`/services/${service.slug}`}>{service.title}</Link>
        </h3>

        {/* Short Description */}
        <p className="text-sm text-neutral-text leading-relaxed line-clamp-3">
          {service.shortDescription}
        </p>

        {/* Warranty Tag */}
        <div className="flex items-center gap-2 text-xs font-mono-data text-emerald-700 font-semibold pt-1">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{service.warranty}</span>
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-6 border-t border-stone-100 mt-6 flex items-center justify-between">
        <span className="text-xs font-mono-data text-stone-500 uppercase tracking-wider">
          {service.pestCategory}
        </span>
        <Link
          href={`/services/${service.slug}`}
          className="text-sm font-bold text-brand-red hover:text-brand-red-dark flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        >
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
