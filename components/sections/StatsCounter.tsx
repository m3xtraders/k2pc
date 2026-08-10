import React from "react";
import { COMPANY_DETAILS } from "@/lib/content/company";

export default function StatsCounter() {
  const stats = [
    { label: "Years in Business", value: `${COMPANY_DETAILS.stats.yearsInBusiness}+` },
    { label: "GTA Homes Protected", value: COMPANY_DETAILS.stats.homesProtected },
    { label: "Avg. Emergency Response", value: `${COMPANY_DETAILS.stats.avgResponseMinutes} Mins` },
    { label: "Customer Satisfaction", value: COMPANY_DETAILS.stats.satisfactionRate },
  ];

  return (
    <section className="bg-ink text-white py-12 border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-mono-data">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-action-yellow tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-stone-300 font-sans font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
