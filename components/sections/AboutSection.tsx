import React from "react";
import Image from "next/image";
import { Leaf, SearchCheck, ShieldCheck, Snowflake } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Eco-Friendly Treatments",
    description:
      "We use environmentally responsible methods that protect your home, family, and pets while preserving Saskatoon's natural surroundings.",
  },
  {
    icon: SearchCheck,
    title: "Free Home Pest Inspection",
    description:
      "Every service starts with a thorough, no-cost inspection so we can accurately identify the pest and tailor the right treatment plan.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    description:
      "Our trained, licensed technicians carry full insurance — protecting your home and family throughout every visit.",
  },
  {
    icon: Snowflake,
    title: "Saskatoon Pest Control Specialists",
    description:
      "We know the pests common to Saskatoon and area and apply targeted treatments built for the local climate and conditions.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-16 lg:py-24 bg-surface-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Left: Image */}
          <div className="relative order-2 lg:order-1 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl flex-1 min-h-[450px] lg:min-h-full">
              <Image
                src="/images/about/about-inspection.webp"
                alt="Pest control technician performing professional inspection in Saskatoon"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={80}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 bg-brand-red text-white px-5 py-3 rounded-xl shadow-lg">
                <div className="font-mono-data font-extrabold text-2xl text-action-yellow">
                  3+
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide">
                  Years of Experience
                </div>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-100/60 rounded-full -z-10" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-100/40 rounded-full -z-10" />
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 space-y-6 flex flex-col justify-center">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight leading-[1.15]">
              Professional Pest Control, Tailored to Saskatoon Homes and Businesses
            </h2>

            {/* Paragraph with bold highlighted SEO keywords */}
            <p className="text-base text-neutral-text leading-relaxed">
              Looking for reliable{" "}
              <strong className="text-ink font-semibold">
                pest control in Saskatoon
              </strong>
              ? K2 Pest Control is a locally trusted{" "}
              <strong className="text-ink font-semibold">
                exterminator serving Saskatoon
              </strong>{" "}
              and surrounding communities. We provide professional{" "}
              <strong className="text-ink font-semibold">
                pest control services
              </strong>{" "}
              for both homes and businesses across the city. Known for safe,
              effective, and{" "}
              <strong className="text-ink font-semibold">
                affordable pest control in Saskatoon
              </strong>
              , we handle everything from{" "}
              <strong className="text-ink font-semibold">
                residential pest control
              </strong>{" "}
              to{" "}
              <strong className="text-ink font-semibold">
                commercial pest control
              </strong>{" "}
              for local businesses. Whatever the pest, we deliver fast,
              thorough, and long-lasting results — backed by our commitment to
              your complete satisfaction.
            </p>

            {/* Feature icon boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl border border-stone-200/90 bg-surface-warm hover:border-brand-red/40 hover:shadow-sm transition-all group"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-full bg-red-50 text-brand-red flex items-center justify-center group-hover:bg-brand-red group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm text-ink leading-snug mb-1">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-neutral-text leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
