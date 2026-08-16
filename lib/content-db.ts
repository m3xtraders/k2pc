import { prisma } from "@/lib/prisma";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { SERVICES, getServiceCoverImage } from "@/lib/content/services";
import { BLOG_POSTS } from "@/lib/content/blog";
import { Service, BlogPost } from "@/lib/types";

export async function getCompanyDetails() {
  try {
    const info = await prisma.businessInfo.findFirst();
    if (!info) return COMPANY_DETAILS;

    const hoursArr = info.hoursJson
      ? Object.entries(info.hoursJson as Record<string, string>).map(([days, times]) => ({
          days,
          times,
        }))
      : COMPANY_DETAILS.hours;

    const serviceAreasArr = Array.isArray(info.serviceAreas)
      ? (info.serviceAreas as string[])
      : COMPANY_DETAILS.regionsServed;

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
      regionsServed: serviceAreasArr.length > 0 ? serviceAreasArr : COMPANY_DETAILS.regionsServed,
      facebookUrl: info.facebookUrl,
      instagramUrl: info.instagramUrl,
      twitterUrl: info.twitterUrl,
      linkedinUrl: info.linkedinUrl,
      googleBusinessUrl: info.googleBusinessUrl,
      googleMapsUrl: (info as any).googleMapsUrl || info.googleBusinessUrl || COMPANY_DETAILS.googleMapsUrl,
      googleMapsEmbedUrl: (info as any).googleMapsEmbedUrl || COMPANY_DETAILS.googleMapsEmbedUrl,
    };
  } catch (_error) {
    return COMPANY_DETAILS;
  }
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

      return {
        id: s.id,
        title: s.title,
        slug: s.slug,
        shortDescription: s.shortDescription || staticService?.shortDescription || "",
        fullDescription: s.content || staticService?.fullDescription || s.shortDescription || "",
        icon: (s.icon as any) || staticService?.icon || "bug",
        pestCategory: staticService?.pestCategory || "insects",
        targetPests: staticService?.targetPests || [],
        signsOfInfestation: staticService?.signsOfInfestation || [
          "Unusual noises inside walls or subflooring during evening hours",
          "Visible droppings, shed skins, or pest entry trails along baseboards",
          "Damaged food packaging, chewed electrical wires, or wood shavings",
          "Persistent unexplainable odors in dark or damp areas",
        ],
        treatmentProcess: staticService?.treatmentProcess || [
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
        ],
        pricingStartsAt: staticService?.pricingStartsAt || "Contact for Quote",
        warranty: staticService?.warranty || "Guaranteed Eradication",
        faqs: staticService?.faqs || [],
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

    return {
      id: s.id,
      title: s.title,
      slug: s.slug,
      shortDescription: s.shortDescription || staticService?.shortDescription || "",
      fullDescription: s.content || staticService?.fullDescription || s.shortDescription || "",
      icon: (s.icon as any) || staticService?.icon || "bug",
      pestCategory: staticService?.pestCategory || "insects",
      targetPests: staticService?.targetPests || [],
      signsOfInfestation: staticService?.signsOfInfestation && staticService.signsOfInfestation.length > 0
        ? staticService.signsOfInfestation
        : [
            "Unusual noises inside walls or subflooring during evening hours",
            "Visible droppings, shed skins, or pest entry trails along baseboards",
            "Damaged food packaging, chewed electrical wires, or wood shavings",
            "Persistent unexplainable odors in dark or damp areas",
          ],
      treatmentProcess: staticService?.treatmentProcess && staticService.treatmentProcess.length > 0
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
          ],
      pricingStartsAt: staticService?.pricingStartsAt || "Contact for Quote",
      warranty: staticService?.warranty || "Guaranteed Eradication",
      faqs: staticService?.faqs || [],
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

    if (!posts || posts.length === 0) return BLOG_POSTS;

    return posts.map((p: any) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      category: (p.category as any) || "Seasonal Advice",
      author: {
        name: p.authorName || "K2PC Specialist",
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
    return BLOG_POSTS;
  }
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const p = await prisma.blogPost.findFirst({
      where: { slug, status: "PUBLISHED" },
    });

    if (!p) {
      return BLOG_POSTS.find((b) => b.slug === slug) || null;
    }

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      category: (p.category as any) || "Seasonal Advice",
      author: {
        name: p.authorName || "K2PC Specialist",
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
    return BLOG_POSTS.find((b) => b.slug === slug) || null;
  }
}
