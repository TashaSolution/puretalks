import React from "react";
import { Metadata } from "next";
import { FAQSection } from "@/components/sections/FAQSection";
import { Badge } from "@/ui/Badge";
import { faqsData } from "@/data/faqs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "PureTalks FAQ — Consultations, Booking & Privacy",
  description: "Find answers about PureTalks consultations, expert selection, booking, privacy, sessions, payments and what to expect.",
  keywords: [
    "pure talks faq",
    "puretalks questions",
    "online consultation faq",
    "therapy booking help",
    "counseling pricing india",
  ],
  alternates: {
    canonical: `${siteConfig.url}/faq`,
  },
  openGraph: {
    title: "PureTalks FAQ — Consultations, Booking & Privacy",
    description: "Find answers about PureTalks consultations, booking, privacy and sessions.",
    url: `${siteConfig.url}/faq`,
    type: "website",
    locale: "en_IN",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "PureTalks FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PureTalks FAQ — Consultations, Booking & Privacy",
    description: "Find answers about PureTalks consultations, booking, privacy and sessions.",
    images: [siteConfig.ogImage],
  },
};

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${siteConfig.url}/faq` },
    ],
  };

  return (
    <div className="pt-24 pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight text-center">
          PureTalks Frequently Asked Questions
        </h1>
      </div>
      <FAQSection />
    </div>
  );
}
