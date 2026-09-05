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
      /* Official National Flag of Canada */
      <svg
        className="w-14 h-10 sm:w-16 sm:h-11 lg:w-20 lg:h-14 transition-transform duration-300 group-hover:scale-110 drop-shadow-md rounded-lg overflow-hidden border border-stone-200/90 shrink-0"
        viewBox="0 0 1000 500"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left Red Band */}
        <rect width="250" height="500" fill="#E00613" />
        {/* Central White Square */}
        <rect x="250" width="500" height="500" fill="#FFFFFF" />
        {/* Right Red Band */}
        <rect x="750" width="250" height="500" fill="#E00613" />
        {/* Official Stylized 11-Point Canadian Maple Leaf */}
        <path
          d="M500,430 L488,430 L485,348 L418,375 L432,328 L370,332 L398,284 L335,268 L348,242 L262,228 L308,188 L278,168 L368,145 L360,118 L432,142 L455,80 L488,110 L500,60 L512,110 L545,80 L568,142 L640,118 L632,145 L722,168 L692,188 L738,228 L652,242 L665,268 L602,284 L630,332 L568,328 L582,375 L515,348 L512,430 Z"
          fill="#E00613"
        />
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
      className={`bg-white border-y border-stone-200/90 py-8 sm:py-10 lg:py-12 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-3 sm:gap-x-6 lg:gap-0 lg:divide-x lg:divide-stone-200/80">
          {TRUST_ITEMS.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center px-2 sm:px-4 lg:px-7 transition-transform duration-200 hover:-translate-y-0.5 cursor-default"
            >
              {/* Large Iconic Graphic */}
              <div className="h-14 sm:h-16 lg:h-20 flex items-center justify-center mb-3 sm:mb-4">
                {item.renderIcon()}
              </div>

              {/* Bold Uppercase Headline */}
              <h3 className="font-heading font-extrabold text-xs sm:text-sm lg:text-base text-ink tracking-tight uppercase leading-tight sm:leading-snug group-hover:text-brand-red transition-colors">
                {item.title}
              </h3>

              {/* Clean Supporting Reassurance */}
              <p className="text-[11px] sm:text-xs text-neutral-text font-normal leading-relaxed mt-1 sm:mt-1.5 max-w-[190px] sm:max-w-[220px]">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
