import { Service, PestType } from "../types";
import { STATIC_SERVICES_FALLBACK, ALL_SERVICES_CATALOG } from "./all-services-data";

export const CORE_PESTS: PestType[] = [
  {
    id: "ant",
    name: "Ant Control",
    scientificName: "Formicidae / Camponotus",
    slug: "ant-control",
    description: "Carpenter ants, pavement ants, and pharaoh ants targeted with exterior defense & nest elimination.",
    severity: "High",
    icon: "ant",
    image: "/images/pests/ant.jpg",
  },
  {
    id: "rodent",
    name: "Rodent Control",
    scientificName: "Rattus norvegicus / Mus musculus",
    slug: "rodent-control",
    description: "Humane removal, entry point exclusion sealing, and sanitation for mice & rats in Saskatoon homes.",
    severity: "High",
    icon: "rodent",
    image: "/images/pests/rodent.jpg",
  },
  {
    id: "cockroach",
    name: "Cockroach Control",
    scientificName: "Blattella germanica",
    slug: "cockroach-control",
    description: "German & Oriental cockroach eradication using gel baits, IGRs, and thorough flush treatments.",
    severity: "High",
    icon: "cockroach",
    image: "/images/pests/cockroach.jpg",
  },
  {
    id: "bed-bug",
    name: "Bed Bug Control",
    scientificName: "Cimex lectularius",
    slug: "bed-bug-control",
    description: "Thermal heat treatments and chemical residual applications eliminating bed bugs at all life stages.",
    severity: "High",
    icon: "bed-bug",
    image: "/images/pests/bed-bug.jpg",
  },
  {
    id: "wasp",
    name: "Wasps & Hornets",
    scientificName: "Vespula vulgaris",
    slug: "wasp-removal",
    description: "Safe nest removal and protective barrier sprays for yellowjackets, hornets, and paper wasps.",
    severity: "Medium",
    icon: "wasp",
    image: "/images/pests/wasp.jpg",
  },
  {
    id: "spider",
    name: "Spider Control",
    scientificName: "Araneae",
    slug: "spider-control",
    description: "De-webbing, perimeter barrier treatments, and prey insect reduction for indoor/outdoor spiders.",
    severity: "Low",
    icon: "spider",
    image: "/images/pests/spider.jpg",
  },
  {
    id: "mosquito",
    name: "Mosquito Control",
    scientificName: "Culicidae",
    slug: "mosquito-control",
    description: "Backyard barrier sprays and biological standing water larvicide across Saskatoon river valley areas.",
    severity: "Medium",
    icon: "mosquito",
    image: "/images/pests/wasp.jpg",
  },
];

export const DEFAULT_SERVICE_COVER_IMAGE = "/images/services/default-service.jpg";

export function getServiceCoverImage(service?: {
  featuredImage?: string | null;
  icon?: string | null;
  slug?: string | null;
}): string {
  if (!service) return DEFAULT_SERVICE_COVER_IMAGE;
  if (service.featuredImage && typeof service.featuredImage === "string" && service.featuredImage.trim().length > 0) {
    return service.featuredImage;
  }

  const slug = (service.slug || "").toLowerCase();

  // Generated photography priority mapping
  if (slug.includes("gopher")) return "/images/services/generated/gopher-control.jpg";
  if (slug.includes("squirrel")) return "/images/services/generated/squirrel-removal.jpg";
  if (slug.includes("bat")) return "/images/services/generated/bat-removal.jpg";
  if (slug.includes("skunk") || slug.includes("raccoon")) return "/images/services/generated/skunk-raccoon-removal.jpg";
  if (slug.includes("pigeon")) return "/images/services/generated/pigeon-control.jpg";
  if (slug.includes("bird")) return "/images/services/generated/bird-exclusion.jpg";
  if (slug.includes("fly")) return "/images/services/generated/fly-control.jpg";
  if (slug.includes("silverfish")) return "/images/services/generated/silverfish-control.jpg";
  if (slug.includes("flea") || slug.includes("tick")) return "/images/services/generated/flea-tick-control.jpg";
  if (slug.includes("nuisance") || slug.includes("boxelder")) return "/images/services/generated/nuisance-bugs.jpg";
  if (slug.includes("insect") || slug.includes("pantry")) return "/images/services/generated/insect-control.jpg";
  if (slug.includes("slug") || slug.includes("snail")) return "/images/services/generated/slug-snail-control.jpg";
  if (slug.includes("mice")) return "/images/services/generated/mice-rat-control.jpg";

  // Standard pest asset mapping
  const pestIconMap: Record<string, string> = {
    ant: "/images/pests/ant.jpg",
    rodent: "/images/pests/rodent.jpg",
    cockroach: "/images/pests/cockroach.jpg",
    "bed-bug": "/images/pests/bed-bug.jpg",
    wasp: "/images/pests/wasp.jpg",
    spider: "/images/pests/spider.jpg",
    mosquito: "/images/pests/wasp.jpg",
    home: "/images/services/residential.jpg",
    building: "/images/services/commercial.jpg",
    bird: "/images/services/generated/pigeon-control.jpg",
    paw: "/images/services/generated/skunk-raccoon-removal.jpg",
  };

  if (service.icon && pestIconMap[service.icon]) {
    return pestIconMap[service.icon];
  }

  if (slug.includes("ant")) return "/images/pests/ant.jpg";
  if (slug.includes("rodent") || slug.includes("rat")) return "/images/pests/rodent.jpg";
  if (slug.includes("cockroach") || slug.includes("roach")) return "/images/pests/cockroach.jpg";
  if (slug.includes("bed-bug")) return "/images/pests/bed-bug.jpg";
  if (slug.includes("wasp") || slug.includes("hornet")) return "/images/pests/wasp.jpg";
  if (slug.includes("mosquito")) return "/images/pests/wasp.jpg";
  if (slug.includes("spider")) return "/images/pests/spider.jpg";
  if (slug.includes("commercial")) return "/images/services/commercial.jpg";
  if (slug.includes("residential") || slug.includes("home") || slug.includes("seasonal")) return "/images/services/residential.jpg";

  return DEFAULT_SERVICE_COVER_IMAGE;
}

export const SERVICES: Service[] = STATIC_SERVICES_FALLBACK;
export { ALL_SERVICES_CATALOG };
