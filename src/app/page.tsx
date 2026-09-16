import type { Metadata } from "next";
import React from "react";
import { getFeaturedCategories } from "@/lib/api/categories";
import { getFeaturedConsultants } from "@/lib/api/consultants";
import { HomeClientExperience } from "@/components/home/HomeClientExperience";
import { siteConfig } from "@/config/site";
import { faqsData } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Private Online Consultations & Expert Guidance | PureTalks",
  description:
    "Private online consultations with experienced PureTalks experts for career, relationships, personal growth, mindfulness and emotional clarity. Starting from ₹399.",
  keywords: [
    "pure talks",
    "puretalks",
    "pure talk",
    "online consultation india",
    "private therapy",
    "confidential counseling",
    "mental health platform",
    "anonymous psychologist online",
    "online psychologist india",
    "mental health consultation online india",
    "video therapy india",
    "online counseling india",
    "best psychologist online india",
    "teletherapy india",
    "online therapist india",
    "couples counseling online india",
    "online anxiety counseling india",
    "online depression therapy india",
    "affordable online therapy india",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Private Online Consultations & Expert Guidance | PureTalks",
    description:
      "Private online consultations with experienced PureTalks experts for career, relationships, personal growth, mindfulness and emotional clarity.",
    url: siteConfig.url,
    siteName: "PureTalks",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "PureTalks — Private Online Consultations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PureTalks — Private Online Consultations",
    description:
      "100% confidential online consultations with licensed specialists. Anonymous mode available.",
    images: [siteConfig.ogImage],
  },
};

export default async function HomePage() {
  const [categories, featuredConsultants] = await Promise.all([
    getFeaturedCategories(),
    getFeaturedConsultants(),
  ]);

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PureTalks",
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/consultations?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "PureTalks — Private Online Consultations",
    description: "100% confidential online consultations with licensed psychologists, relationship counselors, and executive mentors. Anonymous mode available.",
    provider: {
      "@type": "Organization",
      name: "PureTalks",
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: [
      "Mental Health Counseling",
      "Relationship Therapy",
      "Executive Coaching",
      "Youth Mentoring",
      "Mindfulness Training",
      "Career Guidance",
    ],
    offers: {
      "@type": "AggregateOffer",
      lowPrice: 399,
      highPrice: 1999,
      priceCurrency: "INR",
      offerCount: 6,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.96,
      reviewCount: 1230,
      bestRating: 5,
      worstRating: 1,
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
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.slice(0, 5).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PureTalks",
    url: siteConfig.url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".text-gradient-sage", "h1"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <HomeClientExperience
        categories={categories}
        featuredConsultants={featuredConsultants}
      />
    </>
  );
}
