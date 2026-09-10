import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact PureTalks — Get in Touch with Our Team",
  description:
    "Reach out to PureTalks for queries about confidential online consultations, corporate wellness partnerships, or expert onboarding. Email, WhatsApp, and more.",
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
    locale: "en_US",
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
