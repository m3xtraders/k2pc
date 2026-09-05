import { prisma } from "@/lib/prisma";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { LOCATIONS } from "@/lib/content/locations";
import { SERVICES, getServiceCoverImage } from "@/lib/content/services";
import { BLOG_POSTS } from "@/lib/content/blog";
import { GLOBAL_FAQS } from "@/lib/content/faqs";
import {
  LegalPageData,
  DEFAULT_PRIVACY_POLICY,
  DEFAULT_TERMS_OF_SERVICE,
} from "@/lib/content/legal";
import { Service, BlogPost, LocationCity, FAQItem } from "@/lib/types";

export async function getCompanyDetails() {
  try {
    const info = await prisma.businessInfo.findFirst();
    if (!info) {
      return {
        ...COMPANY_DETAILS,
        serviceLocations: COMPANY_DETAILS.serviceLocations,
      };
    }

    const hoursArr = info.hoursJson
      ? Object.entries(info.hoursJson as Record<string, string>).map(([days, times]) => ({
          days,
          times,
        }))
      : COMPANY_DETAILS.hours;

    let serviceLocations: Array<{ name: string; region: string; badge?: string; description?: string }> = [];
    let regionsServedNames: string[] = [];

    if (Array.isArray(info.serviceAreas) && info.serviceAreas.length > 0) {
      serviceLocations = info.serviceAreas.map((item: any) => {
        if (typeof item === "string") {
          const matched = LOCATIONS.find(
            (l) => l.name.toLowerCase() === item.toLowerCase() || l.slug.toLowerCase() === item.toLowerCase()
          );
          return {
            name: item,
            region: matched?.region || "Saskatoon & Area",
            badge: undefined,
            description: matched?.description || undefined,
          };
        } else if (item && typeof item === "object") {
          const matched = LOCATIONS.find(
            (l) => l.name.toLowerCase() === (item.name || "").toLowerCase()
          );
          return {
            name: item.name || "Saskatoon",
            region: item.region || matched?.region || "Saskatoon & Area",
            badge: item.badge || undefined,
            description: item.description || matched?.description || undefined,
          };
        }
        return { name: String(item), region: "Saskatoon & Area" };
      });
      regionsServedNames = serviceLocations.map((l) => l.name);
    } else {
      serviceLocations = COMPANY_DETAILS.serviceLocations;
      regionsServedNames = COMPANY_DETAILS.regionsServed;
    }

    const rawName = info.companyName || COMPANY_DETAILS.name;
    const cleanName = rawName
      .replace(/K2PC\s*Pest\s*Control/gi, "K2 Pest Control")
      .replace(/K2PC/gi, "K2 Pest Control");

    return {
      name: cleanName,
      tagline: info.slogan || COMPANY_DETAILS.tagline,
      slogan: info.slogan || COMPANY_DETAILS.slogan,
      logoUrl: COMPANY_DETAILS.logoUrl,
      shortName: "K2 Pest Control",
      phone: info.phone,
      phoneRaw: info.phone.replace(/[^0-9]/g, ""),
      email: info.email,
      licenseNumber: info.licenseNumber || COMPANY_DETAILS.licenseNumber,
      provincialBody: COMPANY_DETAILS.provincialBody,
      address: {
        street: info.addressLine1 + (info.addressLine2 ? `, ${info.addressLine2}` : ""),
        city: info.city,
        province: info.province,
        postalCode: info.postalCode,
        country: info.country,
      },
      hours: hoursArr,
      stats: COMPANY_DETAILS.stats,
      guarantee: COMPANY_DETAILS.guarantee,
      serviceRadiusKm: COMPANY_DETAILS.serviceRadiusKm,
      regionsServed: regionsServedNames.length > 0 ? regionsServedNames : COMPANY_DETAILS.regionsServed,
      serviceLocations: serviceLocations.length > 0 ? serviceLocations : COMPANY_DETAILS.serviceLocations,
      facebookUrl: info.facebookUrl,
      instagramUrl: info.instagramUrl,
      twitterUrl: info.twitterUrl,
      linkedinUrl: info.linkedinUrl,
      googleBusinessUrl: info.googleBusinessUrl,
      googleMapsUrl: (info as any).googleMapsUrl || info.googleBusinessUrl || COMPANY_DETAILS.googleMapsUrl,
      googleMapsEmbedUrl: (info as any).googleMapsEmbedUrl || COMPANY_DETAILS.googleMapsEmbedUrl,
      chatbotEnabled: (info as any).chatbotEnabled ?? true,
      chatbotName: (info as any).chatbotName || "K2 Pest Assistant",
      chatbotGreeting: (info as any).chatbotGreeting || "👋 Hello! I'm your K2 Pest Control assistant. How can I help you today? Ask about pricing, safe treatments, or book a fast inspection!",
      chatbotQuickPrompts: Array.isArray((info as any).chatbotQuickPrompts) ? (info as any).chatbotQuickPrompts : [
        "💰 How much does pest removal cost?",
        "🚨 Do you offer 24/7 emergency service?",
        "🐜 How do I prepare for ant treatment?",
        "📅 Can I book a pest inspection?",
      ],
      popupEnabled: (info as any).popupEnabled ?? true,
      popupDelaySeconds: (info as any).popupDelaySeconds ?? 15,
      popupDiscountTitle: (info as any).popupDiscountTitle || "$50 OFF",
      popupDiscountSubtitle: (info as any).popupDiscountSubtitle || "First-Time Pest Inspection & Treatment",
      popupDiscountCode: (info as any).popupDiscountCode || "SAVE50",
      popupHeading: (info as any).popupHeading || "Claim Your Limited-Time Inspection Discount!",
      popupDescription: (info as any).popupDescription || "Fill out this quick form to claim your discount voucher and book a priority Saskatchewan-certified pest inspection.",
    };
  } catch (_error) {
    return {
      ...COMPANY_DETAILS,
      popupEnabled: true,
      popupDelaySeconds: 15,
      popupDiscountTitle: "$50 OFF",
      popupDiscountSubtitle: "First-Time Pest Inspection & Treatment",
      popupDiscountCode: "SAVE50",
      popupHeading: "Claim Your Limited-Time Inspection Discount!",
      popupDescription: "Fill out this quick form to claim your discount voucher and book a priority Saskatchewan-certified pest inspection.",
    };
  }
}

export async function getPublishedLocations(): Promise<LocationCity[]> {
  try {
    const company = await getCompanyDetails();
    const rawLocations = (company as any).serviceLocations || [];

    if (!rawLocations || rawLocations.length === 0) {
      return LOCATIONS;
    }

    return rawLocations.map((loc: any) => {
      const cleanName = (loc.name || "Saskatoon").replace(/\s*\(.*\)/g, "").trim();
      const slug =
        loc.slug ||
        cleanName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

      const staticMatch = LOCATIONS.find(
        (l) =>
          l.slug === slug ||
          l.name.toLowerCase() === (loc.name || "").toLowerCase() ||
          l.name.toLowerCase() === cleanName.toLowerCase()
      );

      return {
        name: loc.name,
        region: loc.region || staticMatch?.region || "Saskatoon & Area",
        slug,
        badge: loc.badge || staticMatch?.badge || "2h Fast Response",
        description:
          loc.description ||
          staticMatch?.description ||
          `Fast, licensed pest control across ${loc.name} and surrounding communities.`,
      };
    });
  } catch (_error) {
    return LOCATIONS;
  }
}

function parseArrayField<T>(field: any): T[] {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  if (typeof field === "string") {
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export async function getPublishedServices(): Promise<Service[]> {
  try {
    const dbServices = await prisma.service.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { displayOrder: "asc" },
    });

    if (!dbServices || dbServices.length === 0) return SERVICES;

    return dbServices.map((s: any) => {
      const staticService = SERVICES.find((item) => item.slug === s.slug);
      const dbSigns = parseArrayField<string>(s.signsOfInfestation);
      const dbTreatment = parseArrayField<any>(s.treatmentProcess);
      const dbFaqs = parseArrayField<any>(s.faqs).filter(
        (f) => f && typeof f === "object" && f.question && f.answer
      );

      return {
        id: s.id,
        title: s.title,
        slug: s.slug,
        shortDescription: s.shortDescription || staticService?.shortDescription || "",
        fullDescription: s.content || staticService?.fullDescription || s.shortDescription || "",
        icon: (s.icon as any) || staticService?.icon || "bug",
        pestCategory: s.pestCategory || staticService?.pestCategory || "insects",
        targetPests: staticService?.targetPests || [],
        signsOfInfestation: dbSigns.length > 0
          ? dbSigns
          : (staticService?.signsOfInfestation || [
              "Unusual noises inside walls or subflooring during evening hours",
              "Visible droppings, shed skins, or pest entry trails along baseboards",
              "Damaged food packaging, chewed electrical wires, or wood shavings",
              "Persistent unexplainable odors in dark or damp areas",
            ]),
        treatmentProcess: dbTreatment.length > 0
          ? dbTreatment
          : (staticService?.treatmentProcess || [
              {
                step: 1,
                title: "Comprehensive Inspection",
                description:
                  "Our certified exterminator conducts a full interior and exterior perimeter evaluation to detect nesting spots and access points.",
              },
              {
                step: 2,
                title: "Targeted Eradication Treatment",
                description:
                  "Application of Health Canada approved, pet and child safe IPM solutions specifically calibrated for long-lasting elimination.",
              },
              {
                step: 3,
                title: "Exclusion & Perimeter Sealing",
                description:
                  "Sealing entry points and applying heavy-duty barrier protection to ensure pests cannot re-enter your property.",
              },
            ]),
        pricingStartsAt: s.pricingStartsAt || staticService?.pricingStartsAt || "$189",
        warranty: s.warranty || staticService?.warranty || "Guaranteed Eradication",
        faqs: dbFaqs.length > 0 ? dbFaqs : (staticService?.faqs || []),
        featuredImage: s.featuredImage || staticService?.featuredImage || getServiceCoverImage(s),
      };
    });
  } catch (_error) {
    return SERVICES;
  }
}

export async function getPublishedServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const s = await prisma.service.findFirst({
      where: { slug, status: "PUBLISHED" },
    });

    if (!s) {
      const staticService = SERVICES.find((item) => item.slug === slug);
      return staticService || null;
    }

    const staticService = SERVICES.find((item) => item.slug === s.slug);
    const dbSigns = parseArrayField<string>(s.signsOfInfestation);
    const dbTreatment = parseArrayField<any>(s.treatmentProcess);
    const dbFaqs = parseArrayField<any>(s.faqs).filter(
      (f) => f && typeof f === "object" && f.question && f.answer
    );

    return {
      id: s.id,
      title: s.title,
      slug: s.slug,
      shortDescription: s.shortDescription || staticService?.shortDescription || "",
      fullDescription: s.content || staticService?.fullDescription || s.shortDescription || "",
      icon: (s.icon as any) || staticService?.icon || "bug",
      pestCategory: s.pestCategory || staticService?.pestCategory || "insects",
      targetPests: staticService?.targetPests || [],
      signsOfInfestation: dbSigns.length > 0
        ? dbSigns
        : (staticService?.signsOfInfestation && staticService.signsOfInfestation.length > 0
            ? staticService.signsOfInfestation
            : [
                "Unusual noises inside walls or subflooring during evening hours",
                "Visible droppings, shed skins, or pest entry trails along baseboards",
                "Damaged food packaging, chewed electrical wires, or wood shavings",
                "Persistent unexplainable odors in dark or damp areas",
              ]),
      treatmentProcess: dbTreatment.length > 0
        ? dbTreatment
        : (staticService?.treatmentProcess && staticService.treatmentProcess.length > 0
            ? staticService.treatmentProcess
            : [
                {
                  step: 1,
                  title: "Comprehensive Inspection",
                  description:
                    "Our certified exterminator conducts a full interior and exterior perimeter evaluation to detect nesting spots and access points.",
                },
                {
                  step: 2,
                  title: "Targeted Eradication Treatment",
                  description:
                    "Application of Health Canada approved, pet and child safe IPM solutions specifically calibrated for long-lasting elimination.",
                },
                {
                  step: 3,
                  title: "Exclusion & Perimeter Sealing",
                  description:
                    "Sealing entry points and applying heavy-duty barrier protection to ensure pests cannot re-enter your property.",
                },
              ]),
      pricingStartsAt: s.pricingStartsAt || staticService?.pricingStartsAt || "$189",
      warranty: s.warranty || staticService?.warranty || "Guaranteed Eradication",
      faqs: dbFaqs.length > 0 ? dbFaqs : (staticService?.faqs || []),
      featuredImage: s.featuredImage || staticService?.featuredImage || getServiceCoverImage(s),
    };
  } catch (_error) {
    return SERVICES.find((item) => item.slug === slug) || null;
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    });

    if (!posts || posts.length === 0) return [];

    return posts.map((p: any) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      content: p.content,
      category: (p.category as any) || "Seasonal Advice",
      author: {
        name: p.authorName || "K2 Pest Control Team",
        role: "Extermination Expert",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      publishedAt: p.publishedAt
        ? new Date(p.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : new Date(p.createdAt).toLocaleDateString(),
      readTime: "5 min read",
      image: p.featuredImage || "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80",
      relatedSlugs: [],
    }));
  } catch (_error) {
    return [];
  }
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const p = await prisma.blogPost.findFirst({
      where: { slug, status: "PUBLISHED" },
    });

    if (!p) {
      return null;
    }

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      content: p.content,
      category: (p.category as any) || "Seasonal Advice",
      author: {
        name: p.authorName || "K2 Pest Control Team",
        role: "Extermination Expert",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      publishedAt: p.publishedAt
        ? new Date(p.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : new Date(p.createdAt).toLocaleDateString(),
      readTime: "5 min read",
      image: p.featuredImage || "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80",
      relatedSlugs: [],
    };
  } catch (_error) {
    return null;
  }
}


export async function getPublishedFaqs(): Promise<FAQItem[]> {
  try {
    const faqs = await prisma.faq.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { displayOrder: "asc" },
    });

    if (!faqs || faqs.length === 0) {
      return [];
    }

    return faqs.map((f: any) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category || "General",
    }));
  } catch (_error) {
    return [];
  }
}

export async function getAllFaqs() {
  try {
    return await prisma.faq.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch (_error) {
    return [];
  }
}

export async function seedDefaultFaqsIfEmpty() {
  try {
    const count = await prisma.faq.count();
    if (count === 0) {
      for (let i = 0; i < GLOBAL_FAQS.length; i++) {
        const item = GLOBAL_FAQS[i];
        await prisma.faq.create({
          data: {
            question: item.question,
            answer: item.answer,
            category: item.category || "General",
            displayOrder: i,
            status: "PUBLISHED",
          },
        });
      }
    }
  } catch (err) {
    console.error("Error seeding default FAQs:", err);
  }
}

export async function getLegalPageBySlug(slug: string): Promise<LegalPageData> {
  const normalizedSlug = slug.toLowerCase().includes("priv") ? "privacy" : "terms";
  const defaultDoc = normalizedSlug === "privacy" ? DEFAULT_PRIVACY_POLICY : DEFAULT_TERMS_OF_SERVICE;

  try {
    const page = await (prisma as any).legalPage?.findFirst({
      where: {
        slug: {
          in: [normalizedSlug, `${normalizedSlug}-policy`, `${normalizedSlug}-of-service`],
        },
      },
    });

    if (!page) {
      return defaultDoc;
    }

    const formattedDate = page.updatedAt
      ? new Date(page.updatedAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : defaultDoc.lastUpdated;

    return {
      slug: normalizedSlug,
      title: page.title || defaultDoc.title,
      subtitle: page.subtitle || defaultDoc.subtitle,
      content: page.content || defaultDoc.content,
      metaTitle: page.metaTitle || defaultDoc.metaTitle,
      metaDescription: page.metaDescription || defaultDoc.metaDescription,
      lastUpdated: formattedDate,
    };
  } catch (_error) {
    return defaultDoc;
  }
}

export async function getAllLegalPages(): Promise<LegalPageData[]> {
  const [privacy, terms] = await Promise.all([
    getLegalPageBySlug("privacy"),
    getLegalPageBySlug("terms"),
  ]);
  return [privacy, terms];
}



