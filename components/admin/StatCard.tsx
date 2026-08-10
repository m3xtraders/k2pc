import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs hover:border-stone-300 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">{title}</p>
          <h3 className="text-2xl font-bold text-stone-900 mt-2">{value}</h3>
          {description && <p className="text-xs text-stone-500 mt-1">{description}</p>}
          {trend && <p className="text-xs font-medium text-emerald-600 mt-1">{trend}</p>}
        </div>
        <div className="p-3 bg-stone-100 rounded-xl text-[#BE2320]">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
