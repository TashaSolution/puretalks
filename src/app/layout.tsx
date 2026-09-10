import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { LanguageProvider } from "@/locales/i18n-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serifFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
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

export const metadata: Metadata = {
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
    locale: "en_US",
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
      </head>
      <body className={`${sansFont.variable} ${serifFont.variable} font-sans min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C2024] antialiased selection:bg-[#5C7C6D]/20 selection:text-[#1C2024]`}>
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"} />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX"} />
      </body>
    </html>
  );
}
