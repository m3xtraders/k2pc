import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().min(3, "Question must be at least 3 characters").max(500, "Question is too long"),
  answer: z.string().min(5, "Answer must be at least 5 characters"),
  category: z.string().default("General"),
  displayOrder: z.coerce.number().default(0),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("PUBLISHED"),
});

export type FaqFormValues = z.infer<typeof faqSchema>;
