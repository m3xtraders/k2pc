import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";
import { COMPANY_DETAILS } from "@/lib/content/company";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "K2PC Pest Control | Exterminator Toronto & GTA",
    template: "%s | K2PC Pest Control",
  },
  description:
    "Licensed, guaranteed exterminator and pest control services in Toronto & Greater Toronto Area. Fast 2-hour emergency response for ants, mice, bed bugs, wasps, and roaches.",
  keywords: [
    "pest control Toronto",
    "exterminator GTA",
    "mouse control Toronto",
    "bed bug heat treatment GTA",
    "ant exterminator Toronto",
    "wasp nest removal Mississauga",
    "commercial pest control GTA",
  ],
  authors: [{ name: "K2PC Pest Control" }],
  creator: "K2PC Pest Control",
  metadataBase: new URL("https://www.k2pc.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.k2pc.ca",
    title: "K2PC Pest Control | Licensed Exterminators Toronto & GTA",
    description:
      "Fast, guaranteed pest control for residential & commercial properties across Toronto and the GTA. Ontario Licensed Applicator #ON-849201-P.",
    siteName: "K2PC Pest Control",
  },
  twitter: {
    card: "summary_large_image",
    title: "K2PC Pest Control | Exterminator Toronto & GTA",
    description: "Licensed & guaranteed pest removal in Toronto & GTA. 2-hour emergency response.",
  },
};

export const viewport: Viewport = {
  themeColor: "#BE2320",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PestControlService",
    name: COMPANY_DETAILS.name,
    description: COMPANY_DETAILS.tagline,
    telephone: COMPANY_DETAILS.phone,
    email: COMPANY_DETAILS.email,
    url: "https://www.k2pc.ca",
    logo: "https://www.k2pc.ca/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_DETAILS.address.street,
      addressLocality: COMPANY_DETAILS.address.city,
      addressRegion: COMPANY_DETAILS.address.province,
      postalCode: COMPANY_DETAILS.address.postalCode,
      addressCountry: COMPANY_DETAILS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.7142,
      longitude: -79.3364,
    },
    areaServed: COMPANY_DETAILS.regionsServed.map((region) => ({
      "@type": "AdministrativeArea",
      name: region,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: COMPANY_DETAILS.stats.googleRating.toString(),
      reviewCount: COMPANY_DETAILS.stats.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    priceRange: "$$",
    license: COMPANY_DETAILS.licenseNumber,
  };

  return (
    <html
      lang="en-CA"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-surface-white text-ink font-sans pb-16 md:pb-0"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-red focus:text-white focus:rounded-md focus:font-semibold"
        >
          Skip to main content
        </a>
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
