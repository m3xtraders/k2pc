"use server";

import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validations/service";
import { blogPostSchema } from "@/lib/validations/blogPost";
import { businessInfoSchema } from "@/lib/validations/businessInfo";
import { faqSchema } from "@/lib/validations/faq";
import { sanitizeHtml } from "@/lib/sanitizer";
import { revalidatePath } from "next/cache";

export async function loginAdminAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error: any) {
    return { error: "Incorrect email or password" };
  }
}

// SERVICE ACTIONS
export async function createServiceAction(data: any) {
  const validated = serviceSchema.parse(data);
  const cleanContent = sanitizeHtml(validated.content);

  const service = await prisma.service.create({
    data: {
      ...validated,
      content: cleanContent,
    },
  });

  revalidatePath("/services");
  revalidatePath(`/services/${service.slug}`);
  revalidatePath("/admin/services");
  return { id: service.id, slug: service.slug, title: service.title };
}

export async function updateServiceAction(id: string, data: any) {
  const validated = serviceSchema.parse(data);
  const cleanContent = sanitizeHtml(validated.content);

  const service = await prisma.service.update({
    where: { id },
    data: {
      ...validated,
      content: cleanContent,
    },
  });

  revalidatePath("/services");
  revalidatePath(`/services/${service.slug}`);
  revalidatePath("/admin/services");
  return { id: service.id, slug: service.slug, title: service.title };
}

export async function deleteServiceAction(id: string) {
  await prisma.service.delete({
    where: { id },
  });

  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function reorderServicesAction(items: { id: string; displayOrder: number }[]) {
  await prisma.$transaction(
    items.map((item) =>
      prisma.service.update({
        where: { id: item.id },
        data: { displayOrder: item.displayOrder },
      })
    )
  );

  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true };
}

// BLOG POST ACTIONS
export async function createBlogPostAction(data: any) {
  const validated = blogPostSchema.parse(data);
  const cleanContent = sanitizeHtml(validated.content);

  const post = await prisma.blogPost.create({
    data: {
      ...validated,
      content: cleanContent,
      publishedAt: validated.publishedAt ? new Date(validated.publishedAt) : null,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/blog");
  return { id: post.id, slug: post.slug, title: post.title };
}

export async function updateBlogPostAction(id: string, data: any) {
  const validated = blogPostSchema.parse(data);
  const cleanContent = sanitizeHtml(validated.content);

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...validated,
      content: cleanContent,
      publishedAt: validated.publishedAt ? new Date(validated.publishedAt) : null,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/blog");
  return { id: post.id, slug: post.slug, title: post.title };
}

export async function deleteBlogPostAction(id: string) {
  await prisma.blogPost.delete({
    where: { id },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { success: true };
}

// BUSINESS INFO ACTIONS
export async function updateBusinessInfoAction(data: any) {
  const validated = businessInfoSchema.parse(data);

  const dbData = {
    companyName: validated.companyName,
    slogan: validated.slogan || null,
    phone: validated.phone,
    email: validated.email,
    addressLine1: validated.addressLine1,
    addressLine2: validated.addressLine2 || null,
    city: validated.city,
    province: validated.province,
    postalCode: validated.postalCode,
    country: validated.country,
    latitude: validated.latitude ?? null,
    longitude: validated.longitude ?? null,
    licenseNumber: validated.licenseNumber || null,
    hoursJson: (validated.hoursJson ?? {}) as any,
    serviceAreas: validated.serviceAreas,
    facebookUrl: validated.facebookUrl || null,
    instagramUrl: validated.instagramUrl || null,
    twitterUrl: validated.twitterUrl || null,
    linkedinUrl: validated.linkedinUrl || null,
    googleBusinessUrl: validated.googleBusinessUrl || null,
    googleMapsUrl: validated.googleMapsUrl || null,
    chatbotEnabled: validated.chatbotEnabled ?? true,
    chatbotName: validated.chatbotName || "K2 Pest Assistant",
    chatbotGreeting: validated.chatbotGreeting || null,
    chatbotSystemPrompt: validated.chatbotSystemPrompt || null,
    chatbotApiKey: validated.chatbotApiKey || null,
    chatbotQuickPrompts: validated.chatbotQuickPrompts || null,
  };

  const existing = await prisma.businessInfo.findFirst();

  if (existing) {
    await prisma.businessInfo.update({
      where: { id: existing.id },
      data: dbData,
    });
  } else {
    await prisma.businessInfo.create({
      data: dbData,
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}

// CONTACT / LEAD ACTIONS
export async function updateLeadStatusAction(
  id: string,
  status: "NEW" | "CONTACTED" | "SCHEDULED" | "IN_PROGRESS" | "CLOSED" | "LOST" | string
) {
  await prisma.contactSubmission.update({
    where: { id },
    data: { status: status as any },
  });

  revalidatePath("/admin/bookings");
  revalidatePath("/admin/warranties");
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteLeadAction(id: string) {
  await prisma.contactSubmission.delete({
    where: { id },
  });

  revalidatePath("/admin/bookings");
  revalidatePath("/admin/warranties");
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { success: true };
}

export async function sendLeadReplyAction(params: {
  leadId: string;
  to: string;
  toName: string;
  subject: string;
  replyMessage: string;
  originalMessage?: string | null;
}) {
  const { sendLeadReplyEmail } = await import("@/lib/email");
  
  await sendLeadReplyEmail({
    to: params.to,
    toName: params.toName,
    subject: params.subject,
    replyMessage: params.replyMessage,
    originalMessage: params.originalMessage,
  });

  // Automatically advance lead status to CONTACTED if it was NEW
  try {
    const existing = await prisma.contactSubmission.findUnique({
      where: { id: params.leadId },
    });
    if (existing && existing.status === "NEW") {
      await prisma.contactSubmission.update({
        where: { id: params.leadId },
        data: { status: "CONTACTED" as any },
      });
    }
  } catch (err) {
    console.warn("Could not auto-advance lead status:", err);
  }

  revalidatePath("/admin/bookings");
  revalidatePath("/admin/warranties");
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { success: true };
}

export async function createManualLeadAction(data: {
  name: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  service?: string | null;
  source: string;
  status?: "NEW" | "CONTACTED" | "SCHEDULED" | "IN_PROGRESS" | "CLOSED" | "LOST" | string;
  notes?: string | null;
}) {
  const sourcePrefix = data.source ? `[Source: ${data.source}]` : "[Source: Manual]";
  const messageBody = data.notes?.trim()
    ? `${sourcePrefix} ${data.notes.trim()}`
    : `${sourcePrefix} Manual booking created by admin`;

  const created = await prisma.contactSubmission.create({
    data: {
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      city: data.city?.trim() || null,
      service: data.service?.trim() || "General Pest Inspection",
      message: messageBody,
      status: ((data.status as any) || "NEW") as any,
    },
  });

  revalidatePath("/admin/bookings");
  revalidatePath("/admin/warranties");
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { success: true, lead: created };
}

export async function updateLeadNotesAction(id: string, notes: string) {
  const updated = await prisma.contactSubmission.update({
    where: { id },
    data: { message: notes },
  });

  revalidatePath("/admin/bookings");
  revalidatePath("/admin/warranties");
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { success: true, lead: updated };
}

// FAQ ACTIONS
export async function createFaqAction(data: any) {
  const validated = faqSchema.parse(data);

  const faq = await prisma.faq.create({
    data: {
      question: validated.question.trim(),
      answer: validated.answer.trim(),
      category: validated.category.trim() || "General",
      displayOrder: validated.displayOrder,
      status: validated.status,
    },
  });

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/contact");
  revalidatePath("/admin/faqs");
  return { success: true, faq };
}

export async function updateFaqAction(id: string, data: any) {
  const validated = faqSchema.parse(data);

  const faq = await prisma.faq.update({
    where: { id },
    data: {
      question: validated.question.trim(),
      answer: validated.answer.trim(),
      category: validated.category.trim() || "General",
      displayOrder: validated.displayOrder,
      status: validated.status,
    },
  });

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/contact");
  revalidatePath("/admin/faqs");
  return { success: true, faq };
}

export async function deleteFaqAction(id: string) {
  await prisma.faq.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/contact");
  revalidatePath("/admin/faqs");
  return { success: true };
}

export async function toggleFaqStatusAction(id: string, currentStatus: "PUBLISHED" | "DRAFT") {
  const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
  const updated = await prisma.faq.update({
    where: { id },
    data: { status: newStatus },
  });

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/contact");
  revalidatePath("/admin/faqs");
  return { success: true, status: updated.status };
}

export async function reorderFaqsAction(items: { id: string; displayOrder: number }[]) {
  await prisma.$transaction(
    items.map((item) =>
      prisma.faq.update({
        where: { id: item.id },
        data: { displayOrder: item.displayOrder },
      })
    )
  );

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/contact");
  revalidatePath("/admin/faqs");
  return { success: true };
}

export async function seedFaqsAction() {
  const { seedDefaultFaqsIfEmpty } = await import("@/lib/content-db");
  await seedDefaultFaqsIfEmpty();

  try {
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/contact");
    revalidatePath("/admin/faqs");
  } catch (_e) {}
  return { success: true };
}

export async function updateLegalPageAction(slug: string, data: {
  title: string;
  subtitle?: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
}) {
  const normalizedSlug = slug.toLowerCase().includes("priv") ? "privacy" : "terms";
  const cleanContent = sanitizeHtml(data.content);

  const existing = await (prisma as any).legalPage.findUnique({
    where: { slug: normalizedSlug },
  });

  if (existing) {
    await (prisma as any).legalPage.update({
      where: { slug: normalizedSlug },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        content: cleanContent,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
      },
    });
  } else {
    await (prisma as any).legalPage.create({
      data: {
        slug: normalizedSlug,
        title: data.title,
        subtitle: data.subtitle,
        content: cleanContent,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
      },
    });
  }

  try {
    revalidatePath("/privacy");
    revalidatePath("/privacy-policy");
    revalidatePath("/terms");
    revalidatePath("/terms-of-service");
    revalidatePath("/admin/legal");
  } catch (_e) {
    // ignore in non-request environments
  }

  return { success: true };
}




