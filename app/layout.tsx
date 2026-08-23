import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";
import { COMPANY_DETAILS } from "@/lib/content/company";
import { getCompanyDetails, getPublishedServices } from "@/lib/content-db";

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
    default: "K2 Pest Control | Exterminator Toronto & GTA",
    template: "%s | K2 Pest Control",
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
  authors: [{ name: "K2 Pest Control" }],
  creator: "K2 Pest Control",
  metadataBase: new URL("https://www.k2pc.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.k2pc.ca",
    title: "K2 Pest Control | Licensed Exterminators Toronto & GTA",
    description:
      "Fast, guaranteed pest control for residential & commercial properties across Toronto and the GTA. Ontario Licensed Applicator #ON-849201-P.",
    siteName: "K2 Pest Control",
    images: [
      {
        url: "https://www.k2pc.ca/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "K2 Pest Control - Licensed Exterminators Toronto & GTA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "K2 Pest Control | Exterminator Toronto & GTA",
    description: "Licensed & guaranteed pest removal in Toronto & GTA. 2-hour emergency response.",
    images: ["https://www.k2pc.ca/assets/logo.png"],
  },
  icons: {
    icon: "/assets/logo.png",
    shortcut: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  verification: {
    google: "cmt_uIRcZGXRyGLIOOhaHHyKo_tqGX8Wk1ey79Ct-e8",
  },
  other: {
    "geo.region": "CA-ON",
    "geo.placename": "Toronto",
    "geo.position": "43.7142;-79.3364",
    "ICBM": "43.7142, -79.3364",
  },
};

export const viewport: Viewport = {
  themeColor: "#BE2320",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [companyDetails, services] = await Promise.all([
    getCompanyDetails(),
    getPublishedServices(),
  ]);

  const sameAsLinks = Array.from(
    new Set(
      [
        companyDetails.googleMapsUrl || COMPANY_DETAILS.googleMapsUrl,
        (companyDetails as any).googleBusinessUrl,
        (companyDetails as any).facebookUrl,
        (companyDetails as any).instagramUrl,
        (companyDetails as any).twitterUrl,
        (companyDetails as any).linkedinUrl,
      ].filter(Boolean)
    )
  );

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: companyDetails.name || COMPANY_DETAILS.name,
    url: "https://www.k2pc.ca",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.k2pc.ca/services?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PestControlService",
    name: companyDetails.name || COMPANY_DETAILS.name,
    description: companyDetails.slogan || companyDetails.tagline || COMPANY_DETAILS.tagline,
    telephone: companyDetails.phone || COMPANY_DETAILS.phone,
    email: companyDetails.email || COMPANY_DETAILS.email,
    url: "https://www.k2pc.ca",
    logo: "https://www.k2pc.ca/assets/logo.png",
    image: "https://www.k2pc.ca/assets/logo.png",
    hasMap: companyDetails.googleMapsUrl || COMPANY_DETAILS.googleMapsUrl,
    sameAs: sameAsLinks.length > 0 ? sameAsLinks : undefined,
    currenciesAccepted: "CAD",
    paymentAccepted: "Cash, Credit Card, Debit, Interac e-Transfer",
    priceRange: "$$",
    license: companyDetails.licenseNumber || COMPANY_DETAILS.licenseNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyDetails.address?.street || COMPANY_DETAILS.address.street,
      addressLocality: companyDetails.address?.city || COMPANY_DETAILS.address.city,
      addressRegion: companyDetails.address?.province || COMPANY_DETAILS.address.province,
      postalCode: companyDetails.address?.postalCode || COMPANY_DETAILS.address.postalCode,
      addressCountry: companyDetails.address?.country || COMPANY_DETAILS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.7142,
      longitude: -79.3364,
    },
    areaServed: (companyDetails.regionsServed || COMPANY_DETAILS.regionsServed).map((region: string) => ({
      "@type": "AdministrativeArea",
      name: region,
    })),
    knowsAbout: [
      "Pest Control",
      "Exterminator Services",
      "Bed Bug Heat Treatment",
      "Mouse & Rat Control",
      "Cockroach Extermination",
      "Carpenter Ant Removal",
      "Wasp & Hornet Nest Removal",
      "Commercial Integrated Pest Management",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pest Control Services",
      itemListElement: (services || []).map((s: any) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          url: `https://www.k2pc.ca/services/${s.slug}`,
        },
      })),
    },
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
  };

  return (
    <html
      lang="en-CA"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-surface-white text-ink font-sans pb-16 md:pb-0"
        suppressHydrationWarning
      >
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8EHS2WM33H"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-8EHS2WM33H');
          `}
        </Script>

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-red focus:text-white focus:rounded-md focus:font-semibold"
        >
          Skip to main content
        </a>
        <PublicLayoutWrapper companyDetails={companyDetails} services={services}>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
