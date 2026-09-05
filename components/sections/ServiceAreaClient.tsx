"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Phone,
  ArrowRight,
  Sparkles,
  Navigation,
  ExternalLink,
  Layers,
  MapPin,
  Compass,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface LocationItem {
  name: string;
  coords: [number, number];
  isHq?: boolean;
  desc: string;
  distance: string;
}

const SASKATOON_CENTER: [number, number] = [52.1332, -106.6700];

const LOCATIONS: LocationItem[] = [
  {
    name: "Saskatoon",
    coords: [52.1332, -106.6700],
    isHq: true,
    desc: "Central Mobile Dispatch HQ • 24/7 Response",
    distance: "City Hub",
  },
  {
    name: "Warman",
    coords: [52.3219, -106.5842],
    desc: "~15-20 min dispatch",
    distance: "18 km North",
  },
  {
    name: "Martensville",
    coords: [52.2897, -106.6689],
    desc: "~15 min dispatch",
    distance: "12 km North-West",
  },
  {
    name: "Osler",
    coords: [52.3667, -106.5333],
    desc: "~20-25 min dispatch",
    distance: "24 km North-East",
  },
  {
    name: "Dalmeny",
    coords: [52.3333, -106.7667],
    desc: "~25 min dispatch",
    distance: "28 km North-West",
  },
  {
    name: "Langham",
    coords: [52.3667, -106.9667],
    desc: "~30 min dispatch",
    distance: "34 km North-West",
  },
  {
    name: "Vanscoy",
    coords: [52.0167, -107.0333],
    desc: "~25 min dispatch",
    distance: "26 km South-West",
  },
  {
    name: "The Willows",
    coords: [52.0750, -106.6950],
    desc: "~10-15 min dispatch",
    distance: "South-West Saskatoon",
  },
  {
    name: "Grasswood",
    coords: [52.0300, -106.6100],
    desc: "~15 min dispatch",
    distance: "14 km South",
  },
  {
    name: "Riverside Estates",
    coords: [52.0200, -106.7300],
    desc: "~15 min dispatch",
    distance: "10 km South",
  },
  {
    name: "Dundurn",
    coords: [51.8167, -106.5000],
    desc: "~35 min dispatch",
    distance: "42 km South-East",
  },
  {
    name: "Clavet",
    coords: [52.0000, -106.3833],
    desc: "~25 min dispatch",
    distance: "25 km South-East",
  },
  {
    name: "Greenbryre",
    coords: [52.0950, -106.5300],
    desc: "~10-15 min dispatch",
    distance: "8 km East",
  },
  {
    name: "Pike Lake",
    coords: [51.9069, -106.8194],
    desc: "~25-30 min dispatch",
    distance: "30 km South-West",
  },
  {
    name: "Whitecap",
    coords: [51.9210, -106.7050],
    desc: "~25 min dispatch",
    distance: "26 km South",
  },
  {
    name: "Delisle",
    coords: [51.9178, -107.1350],
    desc: "~30-35 min dispatch",
    distance: "40 km South-West",
  },
  {
    name: "Corman Park",
    coords: [52.1900, -106.4600],
    desc: "~15-30 min dispatch",
    distance: "Surrounding R.M.",
  },
];

// Dotted highlight boundary polygon outlining the full Saskatoon service area
const SERVICE_POLYGON: [number, number][] = [
  [52.4200, -106.9800], // North-West of Langham
  [52.4300, -106.5200], // North of Osler
  [52.3600, -106.3800], // North-East of Warman
  [52.2200, -106.3200], // East
  [51.9800, -106.2800], // East of Clavet
  [51.7600, -106.4600], // South of Dundurn
  [51.8400, -106.7500], // South of Whitecap & Pike Lake
  [51.8600, -107.2000], // South-West of Delisle
  [52.0500, -107.2200], // West of Delisle & Vanscoy
  [52.2800, -107.0800], // West of Dalmeny
  [52.4200, -106.9800], // Close polygon
];

export const ServiceAreaClient: React.FC<any> = ({ companyDetails }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const [activeLocation, setActiveLocation] = useState<LocationItem | null>(null);
  const [mapStyle, setMapStyle] = useState<"streets" | "satellite">("streets");
  const [isMapReady, setIsMapReady] = useState(false);

  const phoneDisplay = companyDetails?.phone || "(306) 407-0007";
  const phoneRaw = companyDetails?.phoneRaw || "3064070007";
  const googleMapsUrl = companyDetails?.googleMapsUrl || "https://share.google/IMFOd1tJPGI6JL4OJ";

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (typeof window === "undefined" || !mapContainerRef.current) return;

      const [L] = await Promise.all([
        import("leaflet").then((m) => m.default),
        import("leaflet/dist/leaflet.css"),
      ]);

      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous map if exists
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initialize map
      const map = L.map(mapContainerRef.current, {
        center: SASKATOON_CENTER,
        zoom: 10,
        minZoom: 8,
        maxZoom: 16,
        scrollWheelZoom: false,
        zoomControl: false,
      });

      mapInstanceRef.current = map;

      // Add Zoom Controls to top right
      L.control.zoom({ position: "topright" }).addTo(map);

      // Real Google Maps Tile Layers — 100% free, crisp, zero watermarks, no API key needed
      const streetTiles = L.tileLayer(
        "https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        {
          subdomains: ["0", "1", "2", "3"],
          attribution: '&copy; Google Maps',
          maxZoom: 20,
        }
      );

      const satelliteTiles = L.tileLayer(
        "https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
        {
          subdomains: ["0", "1", "2", "3"],
          attribution: "&copy; Google Maps Imagery",
          maxZoom: 20,
        }
      );

      if (mapStyle === "streets") {
        streetTiles.addTo(map);
      } else {
        satelliteTiles.addTo(map);
      }

      // 1. Dotted Highlighted Service Coverage Polygon
      const polygon = L.polygon(SERVICE_POLYGON, {
        color: "#BE2320",
        weight: 2.5,
        dashArray: "7, 9",
        fillColor: "#BE2320",
        fillOpacity: 0.08,
      }).addTo(map);

      polygon.bindTooltip("K2 Pest Control Guaranteed 60km Service Zone", {
        sticky: true,
        className: "leaflet-custom-tooltip",
      });

      // 2. Add Pins for each location
      LOCATIONS.forEach((loc) => {
        const isHq = loc.isHq;

        const iconHtml = isHq
          ? `<div class="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#BE2320] text-white shadow-xl ring-4 ring-white border border-red-700 font-heading font-black text-xs cursor-pointer transform hover:scale-110 transition-transform">
               <span class="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
               <span>${loc.name} (HQ)</span>
             </div>`
          : `<div class="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-stone-900 border border-stone-300 shadow-md font-heading font-bold text-[11px] cursor-pointer hover:bg-[#BE2320] hover:text-white hover:border-[#BE2320] hover:scale-105 transition-all">
               <svg class="w-3 h-3 text-[#BE2320] group-hover:text-white shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
               <span class="whitespace-nowrap">${loc.name}</span>
             </div>`;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "custom-map-pill-marker",
          iconSize: isHq ? [140, 36] : [110, 28],
          iconAnchor: isHq ? [70, 18] : [55, 14],
        });

        const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);

        const popupContent = `
          <div style="font-family: inherit; padding: 4px; min-width: 170px;">
            <div style="font-weight: 800; font-size: 14px; color: #0E2F48; margin-bottom: 2px;">
              ${loc.name} ${isHq ? "• Headquarters" : ""}
            </div>
            <div style="font-size: 11px; font-weight: 600; color: #BE2320; margin-bottom: 4px;">
              ${loc.distance}
            </div>
            <div style="font-size: 11px; color: #4E657B; margin-bottom: 8px;">
              ${loc.desc}
            </div>
            <a href="tel:${phoneRaw}" style="display: block; text-align: center; background: #BE2320; color: white; padding: 5px 8px; border-radius: 8px; font-weight: 700; font-size: 11px; text-decoration: none;">
              Call Direct: ${phoneDisplay}
            </a>
          </div>
        `;

        marker.bindPopup(popupContent);

        marker.on("click", () => {
          setActiveLocation(loc);
        });

        markersRef.current[loc.name] = marker;
      });

      setIsMapReady(true);
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapStyle, phoneDisplay, phoneRaw]);

  // Handle clicking on location chips to fly map to location
  const handleFlyToLocation = (loc: LocationItem) => {
    setActiveLocation(loc);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(loc.coords, 12, { duration: 1.2 });
      const marker = markersRef.current[loc.name];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  const handleResetView = () => {
    setActiveLocation(null);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(SASKATOON_CENTER, 10, { duration: 1 });
    }
  };

  return (
    <section className="py-20 lg:py-24 bg-surface-white text-ink relative overflow-hidden border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          
          {/* Left Column: Content & Direct Action (More Breathing Room) */}
          <div className="lg:col-span-6 space-y-7">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3.5 py-1.5 rounded-full border border-red-200/70 shadow-2xs">
              <Navigation className="w-3.5 h-3.5 text-brand-red" />
              <span>Service Area</span>
            </span>

            {/* Heading */}
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight leading-[1.15]">
              Serving Saskatoon &amp; Surrounding Communities
            </h2>

            {/* Body Paragraph with Communities List */}
            <p className="text-base sm:text-lg text-neutral-text leading-relaxed">
              <strong className="text-ink font-semibold">Saskatoon</strong>, Warman, Martensville, Dalmeny, Osler, Langham, Vanscoy, Delisle, Pike Lake, Whitecap, Corman Park, Dundurn, Clavet, Greenbryre, The Willows, Riverside Estates, Grasswood — and surrounding areas.
            </p>

            {/* Subtext Note */}
            <p className="text-xs sm:text-sm text-stone-500 italic">
              Don&apos;t see your area? Call us — we likely cover it.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href={`tel:${phoneRaw}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-brand-red hover:bg-brand-red-dark text-white font-heading font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-brand-red/20 transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>Call {phoneDisplay}</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-action-yellow hover:bg-amber-400 text-ink font-heading font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border border-amber-300/50"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 text-ink" />
              </Link>
            </div>

            {/* Interactive Location Chips */}
            <div className="pt-4 border-t border-stone-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-data font-semibold text-stone-500 uppercase tracking-wider">
                  Click Location to Focus on Map:
                </span>
                <span className="text-[11px] font-mono-data text-brand-red font-semibold">
                  {LOCATIONS.length} Active Service Hubs
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {LOCATIONS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleFlyToLocation(c)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      activeLocation?.name === c.name
                        ? "bg-brand-red text-white shadow-xs scale-105 font-bold"
                        : "bg-surface-warm hover:bg-stone-200/70 text-stone-700 border border-stone-200/60"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Map */}
          <div className="lg:col-span-6">
            <div className="bg-[#F8FAFC] rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden relative">
              
              {/* Map Top Bar with Layer Controls */}
              <div className="bg-white/95 backdrop-blur-md px-4 sm:px-5 py-3 border-b border-stone-200/80 flex items-center justify-between gap-2 z-10 relative">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono-data font-bold text-ink uppercase tracking-wider truncate">
                    {activeLocation ? `Focus: ${activeLocation.name}` : "Saskatoon & Area Coverage"}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl shrink-0">
                  <button
                    type="button"
                    onClick={handleResetView}
                    title="Reset to Full Service Map"
                    className="p-1.5 rounded-lg text-xs text-stone-600 hover:text-ink hover:bg-white transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setMapStyle("streets")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
                      mapStyle === "streets"
                        ? "bg-white text-brand-red shadow-xs"
                        : "text-stone-600 hover:text-ink"
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Map</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMapStyle("satellite")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
                      mapStyle === "satellite"
                        ? "bg-white text-brand-red shadow-xs"
                        : "text-stone-600 hover:text-ink"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Satellite</span>
                  </button>
                </div>
              </div>

              {/* Real Interactive Map Container */}
              <div className="relative w-full h-[430px] sm:h-[470px] bg-stone-100">
                <div
                  ref={mapContainerRef}
                  className="w-full h-full z-0"
                  style={{ minHeight: "430px" }}
                />

                {/* Open in Full Google Maps (Bottom Right) */}
                <div className="absolute bottom-3.5 right-3.5 z-[400] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-200 shadow-md pointer-events-auto">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-brand-red hover:underline"
                  >
                    <span>Full Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

