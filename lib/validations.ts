import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name (at least 2 characters)."),
  phone: z
    .string()
    .min(10, "Please enter a valid 10-digit phone number so we can reach you quickly.")
    .regex(/^[\d\+\-\(\)\s\.]+$/, "Please enter a valid phone format."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .optional()
    .or(z.literal("")),
  serviceNeeded: z.string().min(1, "Please select the service or pest issue you are experiencing."),
  addressOrCity: z.string().min(2, "Please provide your street address or GTA city."),
  message: z.string().max(1000, "Message must be under 1,000 characters.").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
