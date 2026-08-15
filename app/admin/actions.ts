"use server";

import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validations/service";
import { blogPostSchema } from "@/lib/validations/blogPost";
import { businessInfoSchema } from "@/lib/validations/businessInfo";
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
export async function updateLeadStatusAction(id: string, status: "NEW" | "CONTACTED" | "CLOSED") {
  await prisma.contactSubmission.update({
    where: { id },
    data: { status: status as any },
  });

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteLeadAction(id: string) {
  await prisma.contactSubmission.delete({
    where: { id },
  });

  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { success: true };
}
