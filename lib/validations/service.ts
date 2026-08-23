import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  icon: z.string().optional().nullable(),
  shortDescription: z.string().min(1, "Short description is required"),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional().nullable(),
  metaTitle: z.string().max(70, "Meta title should be 70 characters or less").optional().nullable(),
  metaDescription: z.string().max(160, "Meta description should be 160 characters or less").optional().nullable(),
  displayOrder: z.coerce.number().int().default(0),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .optional()
    .nullable(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
