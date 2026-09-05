import React from "react";

interface TrustBadgeItem {
  title: string;
  subtitle: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  badgeTag: string;
  renderIcon: () => React.ReactNode;
}

const TRUST_BADGES: TrustBadgeItem[] = [
  {
    title: "Safe for Kids & Pets",
    subtitle: "Eco-conscious, low-toxicity IPM treatments safe for the whole family",
    iconBg: "bg-emerald-50",
    iconBorder: "border-emerald-200/80",
    iconColor: "text-emerald-600",
    badgeTag: "Eco-Friendly",
    renderIcon: () => (
      /* High-clarity Paw Print with Eco styling */
      <svg
        className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-600"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12 10.5C9.5 10.5 7.5 12.8 7.5 15.5C7.5 18 9.3 20 12 20C14.7 20 16.5 18 16.5 15.5C16.5 12.8 14.5 10.5 12 10.5Z" />
        <ellipse cx="5.5" cy="10" rx="2" ry="2.8" transform="rotate(-20 5.5 10)" />
        <ellipse cx="9.5" cy="6.5" rx="2" ry="3" transform="rotate(-8 9.5 6.5)" />
        <ellipse cx="14.5" cy="6.5" rx="2" ry="3" transform="rotate(8 14.5 6.5)" />
        <ellipse cx="18.5" cy="10" rx="2" ry="2.8" transform="rotate(20 18.5 10)" />
      </svg>
    ),
  },
  {
    title: "100% Results Guaranteed",
    subtitle: "Backed by our 6-month warranty & free follow-up protection guarantee",
    iconBg: "bg-emerald-50",
    iconBorder: "border-emerald-200/80",
    iconColor: "text-emerald-700",
    badgeTag: "Money-Back",
    renderIcon: () => (
      /* Official Guaranteed Seal / Checkmark */
      <svg
        className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-700"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12 2L14.3 4.8L17.9 4.3L19.1 7.7L22.4 9.1L21.9 12.7L23.7 15.8L20.8 18L20.3 21.6L16.7 21.9L14.8 25L12 23.6L9.2 25L7.3 21.9L3.7 21.6L3.2 18L0.3 15.8L2.1 12.7L1.6 9.1L4.9 7.7L6.1 4.3L9.7 4.8L12 2Z" />
        <path
          d="M9.5 12.5L11.5 14.5L15.5 9.5"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    title: "Canadian Owned & Operated",
    subtitle: "Proudly Saskatchewan-founded, protecting Saskatoon & local communities",
    iconBg: "bg-red-50",
    iconBorder: "border-red-200/80",
    iconColor: "text-brand-red",
    badgeTag: "Local Pride",
    renderIcon: () => (
      /* Authentic Canadian Maple Leaf SVG */
      <svg
        className="w-9 h-9 sm:w-10 sm:h-10 text-brand-red"
        viewBox="0 0 512 512"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M256 16l19 65 39-16 11 43 51-17 10 39 44-7 4 39 42 16-11 36 29 18-35 34 26 23-44 19 6 38-51 4-6 40-70-13 9 32-35-6-16 38-31-41-3 104-16 0-3-104-31 41-16-38-35 6 9-32-70 13-6-40-51-4 6-38-44-19 26-23-35-34 29-18-11-36 42-16 4-39 44 7 10-39 51 17 11-43 39 16z" />
      </svg>
    ),
  },
  {
    title: "Licensed & Insured Technicians",
    subtitle: "Ministry of Environment certified structural pesticide specialists",
    iconBg: "bg-emerald-50",
    iconBorder: "border-emerald-200/80",
    iconColor: "text-emerald-700",
    badgeTag: "Government Certified",
    renderIcon: () => (
      /* Official Certificate License Diploma Icon matching emerald tone */
      <svg
        className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-700"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="13" rx="2" fill="currentColor" fillOpacity="0.08" />
        <line x1="7" y1="7" x2="13" y2="7" />
        <line x1="7" y1="10" x2="11" y2="10" />
        <circle cx="16.5" cy="15.5" r="3.5" fill="#BE2320" stroke="#BE2320" strokeWidth="1.5" />
        <polyline points="15 15.5 16.2 16.7 18 14.5" stroke="white" strokeWidth="1.6" />
        <path d="M15 19L14 22L16.5 20.5L19 22L18 19" fill="#BE2320" stroke="#BE2320" strokeWidth="1.2" />
      </svg>
    ),
  },
];

interface TrustGuaranteeStripProps {
  className?: string;
}

export default function TrustGuaranteeStrip({ className = "" }: TrustGuaranteeStripProps) {
  return (
    <section
      aria-label="K2 Pest Control Customer Guarantees and Credentials"
      className={`relative z-20 bg-surface-white border-y border-stone-200/90 shadow-2xs ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-stone-200/80">
          {TRUST_BADGES.map((badge, index) => (
            <div
              key={index}
              className={`group flex flex-col items-center text-center p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 ${
                index > 0 ? "pt-6 sm:pt-4" : ""
              }`}
            >
              {/* Icon Container with subtle hover scale */}
              <div
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${badge.iconBg} border ${badge.iconBorder} flex items-center justify-center ${badge.iconColor} shadow-xs group-hover:scale-110 group-hover:shadow-md transition-all duration-300 mb-4`}
              >
                {badge.renderIcon()}
                {/* Micro Tag */}
                <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-white text-[10px] font-mono-data font-bold text-ink border border-stone-200/90 shadow-2xs">
                  {badge.badgeTag}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-ink tracking-tight uppercase group-hover:text-brand-red transition-colors leading-snug">
                {badge.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xs sm:text-[13px] text-neutral-text leading-relaxed mt-2 max-w-[240px]">
                {badge.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
