import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name (at least 2 characters)."),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number (at least 10 digits).")
    .regex(/^\+?[0-9]{10,15}$/, "Phone number can only contain numbers and an optional leading +."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .optional()
    .or(z.literal("")),
  serviceNeeded: z.string().min(1, "Please select the service or pest issue you are experiencing."),
  propertyType: z.string().min(1, "Please select your house or property type.").optional().or(z.literal("")),
  bedrooms: z.string().optional().or(z.literal("")),
  kitchens: z.string().optional().or(z.literal("")),
  bathrooms: z.string().optional().or(z.literal("")),
  addressOrCity: z.string().min(2, "Please provide your street address or Saskatoon area city."),
  message: z.string().max(1000, "Message must be under 1,000 characters.").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
