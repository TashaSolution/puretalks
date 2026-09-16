import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact PureTalks",
  description:
    "Contact PureTalks for questions about consultations, experts, bookings, privacy or platform support.",
  keywords: [
    "contact puretalks",
    "pure talks support",
    "puretalks help",
    "corporate wellness inquiry",
    "online consultation support",
  ],
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: "Contact PureTalks — Get in Touch with Our Team",
    description:
      "Reach out to PureTalks for queries about confidential online consultations, corporate wellness partnerships, or expert onboarding.",
    url: `${siteConfig.url}/contact`,
    siteName: "PureTalks",
    type: "website",
    locale: "en_IN",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Contact PureTalks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact PureTalks — Get in Touch",
    description: "Reach out to PureTalks for queries about consultations and partnerships.",
    images: [siteConfig.ogImage],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact PureTalks",
  description:
    "Reach out to PureTalks for queries about confidential online consultations, corporate wellness partnerships, or expert onboarding.",
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: "PureTalks",
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: siteConfig.phone,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
      email: siteConfig.contact.email,
      availableLanguage: ["English", "Hindi"],
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: `${siteConfig.url}/contact`,
    },
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
