import React from "react";

interface TrustItem {
  title: string;
  subtitle: string;
  renderIcon: () => React.ReactNode;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    title: "SAFE FOR KIDS & PETS",
    subtitle: "Eco-friendly, low-toxicity IPM treatments",
    renderIcon: () => (
      /* Bold Solid Green Paw Print */
      <svg
        className="w-14 h-14 sm:w-16 sm:h-16 text-[#059669] transition-transform duration-300 group-hover:scale-110 drop-shadow-xs"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Main central paw pad */}
        <path d="M12 11.2C9.2 11.2 7.2 13.6 7.2 16.5C7.2 19.1 9.2 21.2 12 21.2C14.8 21.2 16.8 19.1 16.8 16.5C16.8 13.6 14.8 11.2 12 11.2Z" />
        {/* Toe 1 (Far Left) */}
        <ellipse cx="4.8" cy="10.2" rx="2.2" ry="3.2" transform="rotate(-24 4.8 10.2)" />
        {/* Toe 2 (Mid Left) */}
        <ellipse cx="9.2" cy="6.2" rx="2.2" ry="3.4" transform="rotate(-8 9.2 6.2)" />
        {/* Toe 3 (Mid Right) */}
        <ellipse cx="14.8" cy="6.2" rx="2.2" ry="3.4" transform="rotate(8 14.8 6.2)" />
        {/* Toe 4 (Far Right) */}
        <ellipse cx="19.2" cy="10.2" rx="2.2" ry="3.2" transform="rotate(24 19.2 10.2)" />
      </svg>
    ),
  },
  {
    title: "RESULTS 100% GUARANTEED",
    subtitle: "Backed by 6-month warranty & re-treatment promise",
    renderIcon: () => (
      /* Bold Scalloped Guaranteed Badge with Checkmark */
      <svg
        className="w-14 h-14 sm:w-16 sm:h-16 text-[#059669] transition-transform duration-300 group-hover:scale-110 drop-shadow-xs"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Scalloped Stamp Badge */}
        <path d="M12 1.5L14.2 3.8L17.3 3.5L18.6 6.4L21.6 7.7L21.4 10.9L23.4 13.4L21.7 16.1L22.1 19.3L19.1 20.3L17.9 23.3L14.8 22.8L12 24.8L9.2 22.8L6.1 23.3L4.9 20.3L1.9 19.3L2.3 16.1L0.6 13.4L2.6 10.9L2.4 7.7L5.4 6.4L6.7 3.5L9.8 3.8L12 1.5Z" />
        {/* White Checkmark */}
        <path
          d="M8.5 12.8L11 15.3L16 9.8"
          stroke="white"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    title: "CANADIAN OWNED & OPERATED",
    subtitle: "Proudly Saskatchewan-founded in Saskatoon",
    renderIcon: () => (
      /* Bold Vibrant Canadian Maple Leaf */
      <svg
        className="w-14 h-14 sm:w-16 sm:h-16 text-[#E00613] transition-transform duration-300 group-hover:scale-110 drop-shadow-xs"
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
    title: "LICENSED & INSURED TECHNICIANS",
    subtitle: "Ministry of Environment certified structural applicators",
    renderIcon: () => (
      /* Bold Framed Certificate / License with Ribbon Seal */
      <svg
        className="w-14 h-14 sm:w-16 sm:h-16 text-[#059669] transition-transform duration-300 group-hover:scale-110 drop-shadow-xs"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer Certificate Frame */}
        <rect x="2.5" y="3.5" width="19" height="14" rx="2" fill="#059669" fillOpacity="0.08" stroke="#059669" strokeWidth="2" />
        {/* Inner Border */}
        <rect x="4.5" y="5.5" width="15" height="10" rx="1" stroke="#059669" strokeWidth="1" strokeDasharray="1.5 1.5" />
        {/* Certificate Text Lines */}
        <line x1="7" y1="8.5" x2="14" y2="8.5" stroke="#059669" strokeWidth="1.8" />
        <line x1="7" y1="11.5" x2="12" y2="11.5" stroke="#059669" strokeWidth="1.8" />
        {/* Official Medal Seal */}
        <circle cx="16.5" cy="15.5" r="3" fill="#BE2320" stroke="#BE2320" strokeWidth="1" />
        {/* Seal Check */}
        <polyline points="15.2 15.5 16.2 16.5 17.8 14.5" stroke="white" strokeWidth="1.4" />
        {/* Ribbon Tails */}
        <path d="M15 18.5L14 21.5L16.5 20L19 21.5L18 18.5" fill="#BE2320" stroke="#BE2320" strokeWidth="0.8" />
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
      aria-label="K2 Pest Control Customer Guarantees"
      className={`bg-white border-y border-stone-200/90 py-10 sm:py-12 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 sm:divide-y-0 sm:divide-x divide-stone-200/80">
          {TRUST_ITEMS.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center px-4 sm:px-6 lg:px-7 transition-transform duration-200 hover:-translate-y-0.5 cursor-default"
            >
              {/* Large Iconic Graphic */}
              <div className="h-16 sm:h-20 flex items-center justify-center mb-4">
                {item.renderIcon()}
              </div>

              {/* Bold Uppercase Headline matching reference */}
              <h3 className="font-heading font-extrabold text-sm sm:text-base text-ink tracking-tight uppercase leading-snug group-hover:text-brand-red transition-colors">
                {item.title}
              </h3>

              {/* Clean Supporting Reassurance */}
              <p className="text-xs text-neutral-text font-normal leading-relaxed mt-1.5 max-w-[220px]">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
