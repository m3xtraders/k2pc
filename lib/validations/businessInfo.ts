import { z } from "zod";

export const serviceAreaItemSchema = z.object({
  name: z.string().min(1, "Area / City name is required"),
  region: z.string().default("Saskatoon & Area"),
  badge: z.string().optional().nullable(),
});

export type ServiceAreaItem = z.infer<typeof serviceAreaItemSchema>;

export const businessInfoSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  slogan: z.string().optional().nullable(),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional().nullable(),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().default("Canada"),
  latitude: z.coerce.number().optional().nullable(),
  longitude: z.coerce.number().optional().nullable(),
  licenseNumber: z.string().optional().nullable(),
  hoursJson: z.record(z.string(), z.string()).optional().nullable(),
  serviceAreas: z.union([z.array(serviceAreaItemSchema), z.array(z.string())]).default([]),
  facebookUrl: z.string().url("Invalid URL").or(z.literal("")).optional().nullable(),
  instagramUrl: z.string().url("Invalid URL").or(z.literal("")).optional().nullable(),
  twitterUrl: z.string().url("Invalid URL").or(z.literal("")).optional().nullable(),
  linkedinUrl: z.string().url("Invalid URL").or(z.literal("")).optional().nullable(),
  googleBusinessUrl: z.string().url("Invalid URL").or(z.literal("")).optional().nullable(),
  googleMapsUrl: z.string().optional().nullable(),
  chatbotEnabled: z.boolean().default(true),
  chatbotName: z.string().default("K2 Pest Assistant"),
  chatbotGreeting: z.string().optional().nullable(),
  chatbotSystemPrompt: z.string().optional().nullable(),
  chatbotApiKey: z.string().optional().nullable(),
  chatbotQuickPrompts: z.array(z.string()).optional().nullable(),
});

export type BusinessInfoInput = z.infer<typeof businessInfoSchema>;
