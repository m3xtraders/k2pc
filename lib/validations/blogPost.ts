import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  authorName: z.string().optional().nullable(),
  metaTitle: z.string().max(70, "Meta title should be 70 characters or less").optional().nullable(),
  metaDescription: z.string().max(160, "Meta description should be 160 characters or less").optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  publishedAt: z.string().optional().nullable(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
