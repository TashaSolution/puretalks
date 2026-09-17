import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/locales/i18n-context";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { DeferredAnalytics } from "@/components/analytics/DeferredAnalytics";
import { siteConfig } from "@/config/site";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const serifFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PureTalks",
  alternateName: ["Pure Talk", "PureTalk", "pure talks", "puretalks"],
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo/image.png`,
  description: siteConfig.description,
  foundingDate: "2024",
  sameAs: [
    siteConfig.links.twitter,
    siteConfig.links.instagram,
    siteConfig.links.linkedin,
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phone,
    contactType: "customer service",
    email: siteConfig.contact.email,
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "India",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  knowsAbout: [
    "Mental Health Counseling",
    "Relationship Therapy",
    "Executive Coaching",
    "Youth Mentoring",
    "Mindfulness Training",
    "Career Guidance",
    "Online Therapy",
    "Confidential Consultations",
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Private Online Consultations",
      description: "Confidential video, audio, and anonymous consultations with licensed professionals.",
    },
  },
};

const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "PureTalks",
  description: "India's private online mental health consultation platform offering confidential video, audio, and anonymous sessions with licensed psychologists, relationship counselors, and executive coaches.",
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.contact.email,
  priceRange: "₹399 - ₹1999",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "India",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "13.0827",
    longitude: "80.2707",
  },
  medicalSpecialty: [
    "Psychiatry",
    "Psychology",
    "Counseling",
    "Clinical Psychology",
    "Relationship Therapy",
  ],
  availableService: [
    {
      "@type": "MedicalTherapy",
      name: "Online Video Therapy",
      description: "Confidential video consultation with licensed psychologists.",
    },
    {
      "@type": "MedicalTherapy",
      name: "Online Audio Therapy",
      description: "Voice-only consultation for those who prefer not to use video.",
    },
    {
      "@type": "MedicalTherapy",
      name: "Anonymous Consultation",
      description: "Complete anonymous audio consultation with zero identity disclosure.",
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.96",
    reviewCount: "1230",
    bestRating: "5",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF8F5",
};

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "PureTalks — Private Online Consultations & Mental Clarity Sanctuary",
    template: "%s | PureTalks",
  },
  description:
    "100% confidential, private online consultations with licensed psychologists, relationship counselors, and executive mentors. Safe sanctuary with anonymous mode available.",
  keywords: siteConfig.keywords,
  authors: [{ name: "PureTalks Team" }],
  creator: "PureTalks",
  publisher: "PureTalks",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "PureTalks — Private Online Consultations",
    description:
      "A safe, confidential sanctuary to speak your heart with certified psychologists and counselors.",
    url: siteConfig.url,
    siteName: "PureTalks",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "PureTalks — Private Online Consultations & Mental Clarity Sanctuary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PureTalks — Private Online Consultations",
    description: "100% confidential online consultations with licensed specialists.",
    images: [siteConfig.ogImage],
    creator: "@puretalks_in",
    site: "@puretalks_in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessSchema) }}
        />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${sansFont.variable} ${serifFont.variable} font-sans min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C2024] antialiased selection:bg-[#5C7C6D]/20 selection:text-[#1C2024]`}>
        <LanguageProvider>
          <AuthProvider>
            <SiteLayout>{children}</SiteLayout>
          </AuthProvider>
        </LanguageProvider>
        <DeferredAnalytics
          gaId={process.env.NEXT_PUBLIC_GA_ID}
          gtmId={process.env.NEXT_PUBLIC_GTM_ID}
        />
      </body>
    </html>
  );
}
