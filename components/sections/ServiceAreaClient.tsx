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
  Clock,
} from "lucide-react";
import Link from "next/link";

interface LocationItem {
  name: string;
  category: "saskatoon" | "surrounding";
  coords: [number, number];
  isHq?: boolean;
  desc: string;
  distance: string;
  seoDescription: string;
  commonPests: string[];
}

const SASKATOON_CENTER: [number, number] = [52.1332, -106.6700];

const LOCATIONS: LocationItem[] = [
  // Headquarters
  {
    name: "Saskatoon (HQ)",
    category: "saskatoon",
    coords: [52.1332, -106.6700],
    isHq: true,
    desc: "Central Mobile Dispatch HQ • 24/7 Response",
    distance: "Central City Hub",
    commonPests: ["Ants", "Cockroaches", "Mice", "Bed Bugs", "Spiders"],
    seoDescription:
      "Operating from our central Saskatoon headquarters, K2 Pest Control delivers fast same-day extermination across all residential subdivisions, heritage character homes, commercial kitchens, and multi-unit residential complexes throughout Saskatoon. Licensed, certified, and fully insured.",
  },

  // Saskatoon Neighborhoods & Communities
  {
    name: "Hampton Village",
    category: "saskatoon",
    coords: [52.1585, -106.7420],
    desc: "~10-12 min dispatch",
    distance: "West Saskatoon",
    commonPests: ["Field Mice", "Pavement Ants", "Yellowjackets", "Spiders"],
    seoDescription:
      "Bordering Saskatoon's western open prairie perimeter and airport lands, Hampton Village properties frequently face field mice seeking basement shelter during autumn cool-downs, pavement ants tunneling beneath driveways, and aggressive yellowjacket wasps nesting under eaves. K2 Pest Control provides dedicated residential pest exclusion and rapid mobile dispatch across Hampton Village.",
  },
  {
    name: "Confederation Park",
    category: "saskatoon",
    coords: [52.1465, -106.7210],
    desc: "~10-12 min dispatch",
    distance: "West Saskatoon",
    commonPests: ["Carpenter Ants", "Mice", "Boxelder Bugs", "Spiders"],
    seoDescription:
      "An established West Saskatoon neighborhood with mature trees, detached homes, and large backyards. Common pest challenges include carpenter ants invading aging tree stumps and deck footings, boxelder bugs gathering on warm south-facing siding, and mice entering through older foundation utility penetrations.",
  },
  {
    name: "Parkridge",
    category: "saskatoon",
    coords: [52.1310, -106.7550],
    desc: "~12-15 min dispatch",
    distance: "Far West Saskatoon",
    commonPests: ["Ground Squirrels (Gophers)", "Prairie Mice", "Spiders", "Wasps"],
    seoDescription:
      "Perched along Saskatoon's western perimeter near Hart Road and agricultural fields, Parkridge properties face recurring Richardson ground squirrel (gopher) burrowing on lawns, migrating prairie mice in autumn, and wasp nests along fencing and shed overhangs. Our pet-safe, Health Canada-approved treatments keep Parkridge homes protected.",
  },
  {
    name: "College Park",
    category: "saskatoon",
    coords: [52.1180, -106.5980],
    desc: "~10 min dispatch",
    distance: "East Saskatoon",
    commonPests: ["Bed Bugs", "German Cockroaches", "Mice", "Pavement Ants"],
    seoDescription:
      "Located conveniently near 8th Street East and the University of Saskatchewan campus, College Park features single-family residences and high-density student rentals. K2 Pest Control provides discreet, high-heat bed bug remediation, German cockroach eradication, and preventative mouse baiting tailored for homeowners and landlords.",
  },
  {
    name: "Willowgrove",
    category: "saskatoon",
    coords: [52.1480, -106.5610],
    desc: "~12 min dispatch",
    distance: "Northeast Saskatoon",
    commonPests: ["Spiders", "Field Mice", "Yellowjackets", "Ants"],
    seoDescription:
      "Designed around natural coulees, green spaces, and stone-accented architecture, Willowgrove homes frequently see heightened spider activity on exterior stucco, autumn field mice intrusions from nearby prairie drainage swales, and yellowjacket nests under soffits. We provide odorless, pet-friendly barrier treatments.",
  },
  {
    name: "Brighton",
    category: "saskatoon",
    coords: [52.1220, -106.5390],
    desc: "~12-15 min dispatch",
    distance: "Far East Saskatoon",
    commonPests: ["Prairie Mice", "Ground Beetles", "Spiders", "Boxelder Bugs"],
    seoDescription:
      "As Saskatoon's premier fast-growing master-planned community on the eastern edge, ongoing soil excavation and new builds in Brighton displace field mice, wolf spiders, and ground beetles into fresh home foundations. Our exterior perimeter shield seals new construction against pest ingress.",
  },
  {
    name: "Briarwood",
    category: "saskatoon",
    coords: [52.1030, -106.5750],
    desc: "~12 min dispatch",
    distance: "Southeast Saskatoon",
    commonPests: ["Mosquitoes", "Exterior Spiders", "Mice", "Voles"],
    seoDescription:
      "A scenic southeast neighborhood centered around Briarwood Lake and park pathways. The proximity to wetland reserves produces heavy summer mosquito activity and spider webs across patio enclosures, while autumn brings garden voles and field mice toward heated basements. We provide targeted outdoor and indoor barrier protection.",
  },
  {
    name: "Stonebridge",
    category: "saskatoon",
    coords: [52.0880, -106.6350],
    desc: "~10 min dispatch",
    distance: "South Saskatoon",
    commonPests: ["Boxelder Bugs", "Wasps", "Cockroaches", "Mice"],
    seoDescription:
      "A bustling south Saskatoon neighborhood with modern single-family dwellings, townhouses, and busy commercial retail plazas. Stonebridge homes frequently contend with boxelder bugs clustering on vinyl siding, wasp colonies under elevated decks, and shared-wall pest concerns in multi-unit condos. K2 delivers prompt, guaranteed control.",
  },
  {
    name: "Silverwood Heights",
    category: "saskatoon",
    coords: [52.1860, -106.6350],
    desc: "~12-15 min dispatch",
    distance: "North Saskatoon",
    commonPests: ["Elm Seed Bugs", "Spiders", "Mice", "Tree Squirrels"],
    seoDescription:
      "Overlooking the Meewasin Valley trail network in north Saskatoon, Silverwood Heights is known for its mature elm and maple tree canopy. Residents routinely battle nuisance elm seed bugs, exterior spider webs along river-facing decks, and squirrels attempting attic entry. We provide non-toxic exclusion and exterior sprays.",
  },
  {
    name: "Marquis Industrial",
    category: "saskatoon",
    coords: [52.1950, -106.6780],
    desc: "~12-15 min dispatch",
    distance: "North Industrial Park",
    commonPests: ["Rats & Mice", "Drain Flies", "Cockroaches", "Pigeons"],
    seoDescription:
      "Saskatoon's primary industrial, manufacturing, and commercial logistics corridor along Marquis Drive and 71st Street. We provide commercial IPM pest management, CFIA-compliant rodent baiting stations, electronic fly traps, and architectural pigeon exclusion netting for warehouses and commercial facilities.",
  },
  {
    name: "Evergreen",
    category: "saskatoon",
    coords: [52.1640, -106.5650],
    desc: "~12-15 min dispatch",
    distance: "Northeast Saskatoon",
    commonPests: ["Field Mice", "Wasps", "Ants", "Spiders"],
    seoDescription:
      "Bordering the environmentally sensitive Northeast Swale, Evergreen homeowners require pest control that respects local ecology. K2 Pest Control utilizes targeted, Health Canada PMRA-compliant Integrated Pest Management methods to eliminate mice, yellowjackets, and ants without endangering native wildlife habitats.",
  },
  {
    name: "University Heights",
    category: "saskatoon",
    coords: [52.1540, -106.5890],
    desc: "~10-12 min dispatch",
    distance: "Northeast Commercial Hub",
    commonPests: ["Mice", "Kitchen Roaches", "Wasps", "Ants"],
    seoDescription:
      "A lively suburban hub on Attridge Drive serving residential neighborhoods and high-traffic shopping centers. We provide same-day emergency pest dispatch for homeowners and food-safe commercial pest control for restaurants and retail grocery stores throughout University Heights.",
  },
  {
    name: "River Heights",
    category: "saskatoon",
    coords: [52.1620, -106.6430],
    desc: "~10 min dispatch",
    distance: "North Central Saskatoon",
    commonPests: ["Elm Seed Bugs", "Carpenter Ants", "Squirrels", "Mice"],
    seoDescription:
      "Located along the South Saskatchewan River with mature gardens and established architectural homes. Common calls include elm seed bug foundation sprays, humane squirrel and bat attic exclusion, and structural carpenter ant treatments around older wooden decking and retaining walls.",
  },
  {
    name: "Riverside Estates",
    category: "saskatoon",
    coords: [52.0200, -106.7300],
    desc: "~15 min dispatch",
    distance: "South River Acreages",
    commonPests: ["Gophers", "Deer Mice", "Bats", "Skunks"],
    seoDescription:
      "Prestigious riverfront acreage properties south of Saskatoon. Due to expansive lawns and natural prairie river banks, acreage owners frequently require specialized Richardson ground squirrel control, humane bat attic eviction, and heavy-duty rodent perimeter defenses for garages, workshops, and residences.",
  },
  {
    name: "Wildwood",
    category: "saskatoon",
    coords: [52.1080, -106.6020],
    desc: "~10 min dispatch",
    distance: "Southeast Saskatoon",
    commonPests: ["Mosquitoes", "Skunks", "Spiders", "Mice"],
    seoDescription:
      "Bordered by Lakewood Park and the Wildwood Golf Course, this leafy southeast community experiences high summer mosquito pressure, yard spiders, and nuisance skunks denning beneath backyard sheds and decks. Our humane wildlife and yard barrier treatments restore peace of mind.",
  },
  {
    name: "Lakewood Suburban Centre",
    category: "saskatoon",
    coords: [52.0980, -106.5900],
    desc: "~10-12 min dispatch",
    distance: "Southeast Condo District",
    commonPests: ["Cockroaches", "Bed Bugs", "Mice", "Pavement Ants"],
    seoDescription:
      "A dense residential district centered around Slimmon Road and Herold Court featuring numerous multi-story condominiums, apartments, and senior residences. K2 Pest Control provides certified condo-board IPM programs, discreet bed bug and roach remediation, and common-element rodent defense.",
  },
  {
    name: "Montgomery Place",
    category: "saskatoon",
    coords: [52.1150, -106.7320],
    desc: "~12 min dispatch",
    distance: "Southwest Heritage Lots",
    commonPests: ["Raccoons", "Tree Squirrels", "Carpenter Ants", "Mosquitoes"],
    seoDescription:
      "Famous for its expansive half-acre lots, towering spruce and deciduous trees, and rich veteran history. The heavy tree canopy frequently attracts tree squirrels and raccoons into attic soffits, alongside carpenter ants in mature wood. We specialize in non-lethal, humane wildlife removal and structural barriers.",
  },
  {
    name: "The Willows",
    category: "saskatoon",
    coords: [52.0750, -106.6950],
    desc: "~10-15 min dispatch",
    distance: "Southwest Golf Community",
    commonPests: ["Spiders", "Wasps", "Field Mice", "Mosquitoes"],
    seoDescription:
      "An upscale residential golf community in southwest Saskatoon surrounded by fairways and rolling natural topography. We provide low-toxicity exterior spider web elimination, deck wasp nest removal, and perimeter mouse barriers designed to preserve the elegance of Willows estates.",
  },
  {
    name: "Greenbryre",
    category: "saskatoon",
    coords: [52.0950, -106.5300],
    desc: "~10-15 min dispatch",
    distance: "East Luxury Estates",
    commonPests: ["Field Mice", "Gophers", "Mosquitoes", "Spiders"],
    seoDescription:
      "Luxury estate community east of Saskatoon featuring custom architectural homes and golf greens. Open prairie borders require dedicated Richardson ground squirrel remediation, seasonal yard mosquito suppression, and tamper-proof rodent baiting stations.",
  },
  {
    name: "Grasswood",
    category: "saskatoon",
    coords: [52.0300, -106.6100],
    desc: "~15 min dispatch",
    distance: "14 km South Acreages",
    commonPests: ["Mice & Voles", "Gophers", "Raccoons", "Spiders"],
    seoDescription:
      "A thriving acreage and commercial service hub south of Saskatoon on Highway 11. We protect rural estate properties, equestrian barns, and commercial workshops against severe prairie rodent infestations, voles, and nuisance wildlife.",
  },

  // Surrounding Regional Municipalities & Towns
  {
    name: "Warman",
    category: "surrounding",
    coords: [52.3219, -106.5842],
    desc: "~15-20 min dispatch",
    distance: "18 km North",
    commonPests: ["Mice", "Ants", "Wasps", "Spiders"],
    seoDescription:
      "Saskatchewan's fastest-growing city just north of Saskatoon. K2 Pest Control has dedicated mobile response vehicles serving Warman daily for new-home rodent proofing, yellowjacket nest removal, and exterior ant colony elimination.",
  },
  {
    name: "Martensville",
    category: "surrounding",
    coords: [52.2897, -106.6689],
    desc: "~12-15 min dispatch",
    distance: "12 km North-West",
    commonPests: ["Field Mice", "Wasps", "Mosquitoes", "Spiders"],
    seoDescription:
      "A close-knit community just minutes north of Saskatoon along Highway 12. We deliver prompt, guaranteed exterminator services across Martensville, from residential basement pest proofing to local commercial facility protection.",
  },
  {
    name: "Osler",
    category: "surrounding",
    coords: [52.3667, -106.5333],
    desc: "~20-25 min dispatch",
    distance: "24 km North-East",
    commonPests: ["Mice & Rats", "Flies", "Wasps", "Gophers"],
    seoDescription:
      "Serving Osler and surrounding agricultural properties with comprehensive rural and residential pest management. Specializing in grain bin and acreage rodent control, fly reduction, and home insect defense.",
  },
  {
    name: "Dalmeny",
    category: "surrounding",
    coords: [52.3333, -106.7667],
    desc: "~20-25 min dispatch",
    distance: "28 km North-West",
    commonPests: ["Mice", "Wasps", "Ants", "Spiders"],
    seoDescription:
      "Providing reliable, family-safe pest control services for Dalmeny homeowners and business properties. Fast emergency dispatch for wasp nests, interior rodent removal, and seasonal preventative spraying.",
  },
  {
    name: "Langham",
    category: "surrounding",
    coords: [52.3667, -106.9667],
    desc: "~25-30 min dispatch",
    distance: "34 km North-West",
    commonPests: ["Mice", "Spiders", "Wasps", "Bats"],
    seoDescription:
      "Located along Highway 16 northwest of Saskatoon, Langham properties receive expert extermination for prairie mice, attic bat exclusion, and exterior spider perimeter barriers.",
  },
  {
    name: "Vanscoy",
    category: "surrounding",
    coords: [52.0167, -107.0333],
    desc: "~20-25 min dispatch",
    distance: "26 km South-West",
    commonPests: ["Rodents", "Ants", "Spiders", "Wasps"],
    seoDescription:
      "Servicing Vanscoy and nearby potash mining corridor residences with certified pest control. We offer complete structural protection against cold-weather rodent intrusions and summer insect pests.",
  },
  {
    name: "Delisle",
    category: "surrounding",
    coords: [51.9178, -107.1350],
    desc: "~30-35 min dispatch",
    distance: "40 km South-West",
    commonPests: ["Mice", "Gophers", "Wasps", "Spiders"],
    seoDescription:
      "Comprehensive pest control and extermination for Delisle homes, shops, and rural properties. We eradicate mice colonies, eliminate exterior wasp hazards, and provide guaranteed seasonal barrier sprays.",
  },
  {
    name: "Pike Lake",
    category: "surrounding",
    coords: [51.9069, -106.8194],
    desc: "~25-30 min dispatch",
    distance: "30 km South-West",
    commonPests: ["Mosquitoes", "Spiders", "Mice", "Bats"],
    seoDescription:
      "Surrounding the Pike Lake Provincial Park recreation area, lakefront cottages and year-round homes benefit from our specialized mosquito barrier misting, spider de-webbing, and humane bat exclusion.",
  },
  {
    name: "Whitecap",
    category: "surrounding",
    coords: [51.9210, -106.7050],
    desc: "~20-25 min dispatch",
    distance: "26 km South",
    commonPests: ["Mice", "Gophers", "Wasps", "Spiders"],
    seoDescription:
      "Serving Whitecap Dakota First Nation community and commercial hospitality venues with respectful, eco-friendly Integrated Pest Management and dependable emergency service.",
  },
  {
    name: "Corman Park",
    category: "surrounding",
    coords: [52.1900, -106.4600],
    desc: "~15-30 min dispatch",
    distance: "Surrounding R.M.",
    commonPests: ["Field Mice", "Gophers", "Skunks", "Bats"],
    seoDescription:
      "Covering the extensive rural municipality surrounding Saskatoon. We specialize in large-scale rural acreage pest control, outbuilding rodent defense, gopher reduction, and humane wildlife eviction.",
  },
  {
    name: "Dundurn",
    category: "surrounding",
    coords: [51.8167, -106.5000],
    desc: "~35 min dispatch",
    distance: "42 km South-East",
    commonPests: ["Mice", "Wasps", "Spiders", "Ants"],
    seoDescription:
      "Serving the Town of Dundurn and military/rural residential properties south along Highway 11 with certified, professional pest extermination and prevention.",
  },
  {
    name: "Clavet",
    category: "surrounding",
    coords: [52.0000, -106.3833],
    desc: "~20-25 min dispatch",
    distance: "25 km South-East",
    commonPests: ["Mice", "Grain Pests", "Wasps", "Spiders"],
    seoDescription:
      "Just southeast of Saskatoon on Highway 16, Clavet homes and agricultural facilities rely on K2 Pest Control for rapid wasp removal, industrial rodent suppression, and exterior bug shields.",
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
  const activeLocationRef = useRef<LocationItem | null>(null);

  const [activeLocation, setActiveLocation] = useState<LocationItem | null>(null);
  const [filterTab, setFilterTab] = useState<"all" | "saskatoon" | "surrounding">("all");
  const [mapStyle, setMapStyle] = useState<"streets" | "satellite">("streets");
  const [isMapReady, setIsMapReady] = useState(false);

  const phoneDisplay = companyDetails?.phone || "(306) 407-0007";
  const phoneRaw = companyDetails?.phoneRaw || "3064070007";
  const googleMapsUrl = companyDetails?.googleMapsUrl || "https://share.google/IMFOd1tJPGI6JL4OJ";

  useEffect(() => {
    activeLocationRef.current = activeLocation;
  }, [activeLocation]);

  useEffect(() => {
    let isMounted = true;
    let observer: IntersectionObserver | null = null;

    const initMap = async () => {
      if (typeof window === "undefined" || !mapContainerRef.current) return;

      const [L] = await Promise.all([
        import("leaflet").then((m) => m.default),
        import("leaflet/dist/leaflet.css"),
      ]);

      if (!isMounted || !mapContainerRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapContainerRef.current, {
        center: SASKATOON_CENTER,
        zoom: 10,
        minZoom: 8,
        maxZoom: 17,
        scrollWheelZoom: false,
        zoomControl: false,
      });

      mapInstanceRef.current = map;

      // Add Zoom Controls to top right
      L.control.zoom({ position: "topright" }).addTo(map);

      // Tile layers
      const streetTiles = L.tileLayer(
        "https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        {
          subdomains: ["0", "1", "2", "3"],
          attribution: "&copy; Google Maps",
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

      // Coverage boundary
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

      // Add Markers
      LOCATIONS.forEach((loc) => {
        const isHq = loc.isHq;
        const isNeighborhood = loc.category === "saskatoon" && !isHq;

        const iconHtml = isHq
          ? `<div class="-translate-x-1/2 -translate-y-1/2 w-max pointer-events-auto select-none">
               <div class="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BE2320] text-white shadow-xl ring-4 ring-white border border-red-700 font-heading font-black text-xs cursor-pointer transform hover:scale-105 transition-all">
                 <span class="w-2.5 h-2.5 rounded-full bg-white animate-ping shrink-0"></span>
                 <span class="whitespace-nowrap tracking-wide">${loc.name}</span>
               </div>
             </div>`
          : isNeighborhood
          ? `<div class="-translate-x-1/2 -translate-y-1/2 w-max pointer-events-auto select-none">
               <div class="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-stone-900 border border-brand-red/60 shadow-md font-heading font-bold text-[11px] cursor-pointer hover:bg-[#BE2320] hover:text-white hover:border-[#BE2320] hover:scale-105 transition-all">
                 <span class="w-2 h-2 rounded-full bg-brand-red group-hover:bg-white shrink-0"></span>
                 <span class="whitespace-nowrap">${loc.name}</span>
               </div>
             </div>`
          : `<div class="-translate-x-1/2 -translate-y-1/2 w-max pointer-events-auto select-none">
               <div class="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-stone-900 border border-stone-300 shadow-md font-heading font-bold text-[11px] cursor-pointer hover:bg-[#BE2320] hover:text-white hover:border-[#BE2320] hover:scale-105 transition-all">
                 <svg class="w-3.5 h-3.5 text-[#BE2320] group-hover:text-white shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                 <span class="whitespace-nowrap">${loc.name}</span>
               </div>
             </div>`;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "custom-map-pill-wrapper",
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        const marker = L.marker(loc.coords, { icon: customIcon });

        const popupContent = `
          <div style="font-family: inherit; padding: 4px; min-width: 190px;">
            <div style="font-weight: 800; font-size: 13px; color: #0E2F48; margin-bottom: 2px;">
              ${loc.name} ${isHq ? "• Central HQ" : ""}
            </div>
            <div style="font-size: 11px; font-weight: 600; color: #BE2320; margin-bottom: 4px;">
              ${loc.distance} • ${loc.desc}
            </div>
            <div style="font-size: 10px; color: #4E657B; margin-bottom: 8px; line-height: 1.4;">
              Fast local extermination & pest defense in ${loc.name}.
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

        // Add regional hubs immediately; neighborhoods appear on zoom >= 12 or on click
        if (isHq || loc.category === "surrounding") {
          marker.addTo(map);
        }
      });

      // Dynamic Zoom Handler: show neighborhoods when zoomed in (zoom >= 12)
      const handleZoomEnd = () => {
        const currentZoom = map.getZoom();
        LOCATIONS.forEach((loc) => {
          const marker = markersRef.current[loc.name];
          if (!marker) return;

          if (loc.isHq || loc.category === "surrounding") {
            if (!map.hasLayer(marker)) marker.addTo(map);
          } else {
            if (currentZoom >= 12 || activeLocationRef.current?.name === loc.name) {
              if (!map.hasLayer(marker)) marker.addTo(map);
            } else {
              if (map.hasLayer(marker)) map.removeLayer(marker);
            }
          }
        });
      };

      map.on("zoomend", handleZoomEnd);

      setIsMapReady(true);
    };

    if (typeof window !== "undefined" && "IntersectionObserver" in window && mapContainerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            initMap();
            if (observer && mapContainerRef.current) {
              observer.unobserve(mapContainerRef.current);
            }
          }
        },
        { rootMargin: "300px" }
      );
      observer.observe(mapContainerRef.current);
    } else {
      initMap();
    }

    return () => {
      isMounted = false;
      if (observer) observer.disconnect();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapStyle, phoneDisplay, phoneRaw]);

  // Handle clicking on location chips to fly map to location and switch SEO card
  const handleFlyToLocation = (loc: LocationItem) => {
    setActiveLocation(loc);
    activeLocationRef.current = loc;

    if (mapInstanceRef.current) {
      const targetZoom = loc.category === "saskatoon" ? 14 : 12;
      mapInstanceRef.current.flyTo(loc.coords, targetZoom, { duration: 1.2 });

      const marker = markersRef.current[loc.name];
      if (marker) {
        if (!mapInstanceRef.current.hasLayer(marker)) {
          marker.addTo(mapInstanceRef.current);
        }
        setTimeout(() => {
          marker.openPopup();
        }, 600);
      }
    }
  };

  const handleResetView = () => {
    setActiveLocation(null);
    activeLocationRef.current = null;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(SASKATOON_CENTER, 10, { duration: 1 });
      mapInstanceRef.current.closePopup();
    }
  };

  const filteredLocations = LOCATIONS.filter((loc) => {
    if (filterTab === "all") return true;
    return loc.category === filterTab;
  });

  return (
    <section className="py-20 lg:py-24 bg-surface-white text-ink relative overflow-hidden border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
          
          {/* Left Column: Dynamic SEO Content & Interactive Community Switcher */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 text-xs font-mono-data font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3.5 py-1.5 rounded-full border border-red-200/70 shadow-2xs">
                <Navigation className="w-3.5 h-3.5 text-brand-red" />
                <span>Service Area &amp; Coverage</span>
              </span>
              <span className="text-xs font-mono-data text-stone-500 font-semibold">
                30+ Active Hubs
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight leading-[1.15]">
              Serving Saskatoon &amp; Surrounding Communities
            </h2>

            {/* DYNAMIC CONTENT AREA: Switches between All Communities and Specific Location Card */}
            {activeLocation ? (
              <div className="bg-white rounded-2xl border-2 border-brand-red/30 p-5 sm:p-6 shadow-md space-y-3.5 transition-all animate-in fade-in duration-200">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono-data font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-brand-red border border-red-200">
                        <MapPin className="w-3 h-3" />
                        {activeLocation.category === "saskatoon"
                          ? "Saskatoon Community"
                          : "Regional Town / R.M."}
                      </span>
                      <span className="text-xs font-mono-data font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        ✓ {activeLocation.distance}
                      </span>
                    </div>
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink mt-2">
                      {activeLocation.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetView}
                    className="text-xs font-mono-data font-semibold text-stone-500 hover:text-brand-red underline shrink-0 cursor-pointer pt-1"
                  >
                    ✕ View All Areas
                  </button>
                </div>

                {/* Specific SEO Description for the selected location */}
                <p className="text-sm sm:text-base text-neutral-text leading-relaxed">
                  {activeLocation.seoDescription}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs font-mono-data text-stone-600 border-t border-stone-100">
                  <span className="flex items-center gap-1.5 text-brand-red font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    {activeLocation.desc}
                  </span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Guaranteed Results
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-base sm:text-lg text-neutral-text leading-relaxed">
                  <strong className="text-ink font-semibold">Saskatoon</strong>, Hampton Village, Brighton, Stonebridge, Willowgrove, Confederation Park, Silverwood Heights, Evergreen, Briarwood, Marquis Industrial, Warman, Martensville, Dalmeny, Osler, Langham, Vanscoy, Delisle, Pike Lake, Whitecap, Corman Park, Dundurn, Clavet, Greenbryre, The Willows, Riverside Estates, Grasswood — and surrounding areas.
                </p>
                <p className="text-xs sm:text-sm text-stone-500 italic">
                  Click any community below or zoom in on the map to explore local pest challenges and dispatch times.
                </p>
              </div>
            )}

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
          </div>

          {/* Right Column: Live Interactive Map with Real Zoom Triggers */}
          <div className="lg:col-span-6">
            <div className="bg-[#F8FAFC] rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden relative">
              
              {/* Map Top Bar with Layer Controls */}
              <div className="bg-white/95 backdrop-blur-md px-4 sm:px-5 py-3 border-b border-stone-200/80 flex items-center justify-between gap-2 z-10 relative">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-xs font-mono-data font-bold text-ink uppercase tracking-wider truncate">
                    {activeLocation ? `Focus: ${activeLocation.name}` : "Saskatoon & Regional Coverage"}
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
              <div className="relative w-full h-[430px] sm:h-[470px] lg:h-[500px] bg-stone-100">
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

        {/* Full-Width Interactive Community Selector Section Below Map */}
        <div className="pt-8 border-t border-stone-200/90 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-mono-data font-bold text-brand-red uppercase tracking-wider block">
                Interactive Coverage Directory
              </span>
              <h3 className="font-heading font-bold text-base sm:text-lg text-ink">
                Select Any Saskatoon Community or Surrounding Hub to Focus on Map:
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl w-fit shrink-0 flex-wrap">
              <button
                type="button"
                onClick={() => setFilterTab("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
                  filterTab === "all"
                    ? "bg-white text-brand-red shadow-xs"
                    : "text-stone-600 hover:text-ink"
                }`}
              >
                All Hubs ({LOCATIONS.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterTab("saskatoon")}
                className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
                  filterTab === "saskatoon"
                    ? "bg-white text-brand-red shadow-xs"
                    : "text-stone-600 hover:text-ink"
                }`}
              >
                Saskatoon Communities ({LOCATIONS.filter((l) => l.category === "saskatoon").length})
              </button>
              <button
                type="button"
                onClick={() => setFilterTab("surrounding")}
                className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
                  filterTab === "surrounding"
                    ? "bg-white text-brand-red shadow-xs"
                    : "text-stone-600 hover:text-ink"
                }`}
              >
                Surrounding Towns ({LOCATIONS.filter((l) => l.category === "surrounding").length})
              </button>
            </div>
          </div>

          {/* Full-Width Chips Wrap - Expands naturally without scrollbar */}
          <div className="flex flex-wrap gap-2 pt-1">
            {filteredLocations.map((c) => {
              const isSelected = activeLocation?.name === c.name;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => handleFlyToLocation(c)}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-brand-red text-white shadow-md scale-105 font-bold ring-2 ring-brand-red/30"
                      : "bg-surface-warm hover:bg-stone-200/80 text-stone-700 border border-stone-200/80 hover:border-stone-300"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isSelected
                        ? "bg-white"
                        : c.category === "saskatoon"
                        ? "bg-brand-red"
                        : "bg-stone-400"
                    }`}
                  />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
