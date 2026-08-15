import React from "react";
import { getCompanyDetails } from "@/lib/content-db";
import { MapPin, Phone, Clock, ExternalLink, MessageSquare } from "lucide-react";

interface LocationMapWidgetProps {
  heading?: string;
  subtitle?: string;
}

export default async function LocationMapWidget({
  heading,
  subtitle,
}: LocationMapWidgetProps) {
  const company = await getCompanyDetails();

  const fullAddress = `${company.address.street}, ${company.address.city}, ${company.address.province} ${company.address.postalCode}`;
  
  // Direct Google Maps Link (for "Get Directions" & "Open in Full Google Maps")
  const directMapsUrl =
    company.googleMapsUrl ||
    "https://share.google/IMFOd1tJPGI6JL4OJ";

  // Helper to extract iframe src if the admin pasted the whole <iframe ...> snippet
  const resolveEmbedSrc = (rawInput?: string): string => {
    const DEFAULT_EMBED =
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9792.44774900138!2d-106.68346491284177!3d52.15047400000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4c3c99168292ddd9%3A0xf3d49338a57961d!2sK2%20Pest%20Control%20Ltd!5e0!3m2!1sen!2sus!4v1786799545276!5m2!1sen!2sus";

    if (!rawInput) return DEFAULT_EMBED;

    // Check if user entered an iframe tag
    const iframeSrcMatch = rawInput.match(/src=["']([^"']+)["']/i);
    if (iframeSrcMatch && iframeSrcMatch[1]) {
      return iframeSrcMatch[1];
    }

    if (rawInput.includes("google.com/maps/embed")) {
      return rawInput;
    }

    return DEFAULT_EMBED;
  };

  const embedSrc = resolveEmbedSrc((company as any).googleMapsEmbedUrl || company.googleMapsUrl);

  const hoursString = company.hours && company.hours.length > 0
    ? `${company.hours[0]?.days}: ${company.hours[0]?.times}`
    : "Mon - Sun: 7:00 AM - 9:00 PM | 24/7 Rapid Dispatch";

  return (
    <section className="py-16 bg-surface-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight uppercase">
            {heading || `VISIT OUR DISPATCH CENTER IN ${company.address.city.toUpperCase()}`}
          </h2>
          <p className="text-sm sm:text-base text-neutral-text">
            {subtitle ||
              "Find our exact location on Google Maps and experience certified, rapid pest elimination service in person."}
          </p>
        </div>

        {/* 2-Column Map & Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left: Interactive Google Map Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 shadow-md p-3.5 sm:p-4 flex flex-col justify-between space-y-3">
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-stone-100 bg-stone-100">
              <iframe
                title={`${company.name} Google Map Location`}
                src={embedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Bottom Status Bar below Map */}
            <div className="flex items-center justify-between px-2 pt-1 text-xs text-stone-600 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-stone-800">
                  {company.name} {company.address.city}
                </span>
              </div>
              <a
                href={directMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-brand-red hover:underline font-semibold"
              >
                <span>Open in Full Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Dark Luxury Info Card matching reference */}
          <div className="lg:col-span-5 bg-[#141414] text-white p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-xl flex flex-col justify-between space-y-6">
            {/* Header */}
            <div className="space-y-1">
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase">
                {company.name} {company.address.city}
              </h3>
              <p className="text-xs sm:text-[13px] font-mono-data uppercase tracking-wider text-action-yellow font-bold">
                PREMIER PEST CONTROL, WILDLIFE & RAPID DISPATCH
              </p>
            </div>

            {/* Information Rows */}
            <div className="space-y-5">
              {/* Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-stone-800/80 border border-stone-700 flex items-center justify-center text-action-yellow shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono-data uppercase tracking-wider text-stone-400 font-semibold block">
                    DISPATCH LOCATION
                  </span>
                  <p className="text-sm font-semibold text-stone-100 leading-snug">
                    {fullAddress}, {company.address.country}
                  </p>
                  <a
                    href={directMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-semibold text-action-yellow hover:underline pt-0.5"
                  >
                    View Exact Pin on Google Maps &rarr;
                  </a>
                </div>
              </div>

              {/* Phone & Emergency Line */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-stone-800/80 border border-stone-700 flex items-center justify-center text-action-yellow shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono-data uppercase tracking-wider text-stone-400 font-semibold block">
                    PHONE & EMERGENCY DISPATCH
                  </span>
                  <a
                    href={`tel:${company.phoneRaw}`}
                    className="text-base sm:text-lg font-mono-data font-bold text-white hover:text-action-yellow transition-colors block"
                  >
                    {company.phone}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-stone-800/80 border border-stone-700 flex items-center justify-center text-action-yellow shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono-data uppercase tracking-wider text-stone-400 font-semibold block">
                    WORKING HOURS
                  </span>
                  <p className="text-xs sm:text-sm text-stone-200 leading-snug">
                    {hoursString}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={directMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 bg-action-yellow hover:bg-amber-400 text-stone-950 font-heading font-extrabold text-sm py-3.5 px-5 rounded-xl text-center shadow-md transition-all uppercase tracking-wider"
              >
                GET DIRECTIONS &rarr;
              </a>

              <a
                href={`https://wa.me/${company.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-bold text-sm py-3.5 px-6 rounded-xl text-center shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
