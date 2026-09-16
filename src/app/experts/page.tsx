import React from "react";
import { Metadata } from "next";
import { getConsultants } from "@/lib/api/consultants";
import { getCategories } from "@/lib/api/categories";
import { ExpertsDirectoryClient } from "@/components/consultants/ExpertsDirectoryClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Trusted Experts for Online Consultations | PureTalks",
  description: "Meet PureTalks experts across career, relationships, personal growth, youth guidance, mindfulness and emotional wellbeing. Rated 4.96/5 by 1200+ clients.",
  keywords: [
    "PureTalks experts",
    "pure talks counselors",
    "certified counselors India",
    "online psychologists",
    "relationship therapists",
    "executive coaches",
    "mental health professionals",
  ],
  alternates: {
    canonical: `${siteConfig.url}/experts`,
  },
  openGraph: {
    title: "Trusted Experts for Online Consultations | PureTalks",
    description: "Meet PureTalks experts across career, relationships, personal growth, youth guidance, mindfulness and emotional wellbeing.",
    url: `${siteConfig.url}/experts`,
    type: "website",
    locale: "en_IN",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "PureTalks Verified Experts" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trusted Experts | PureTalks",
    description: "Meet PureTalks experts across career, relationships, personal growth, youth guidance, mindfulness and emotional wellbeing.",
    images: [siteConfig.ogImage],
  },
};

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ExpertsPage({ searchParams }: Props) {
  const [consultants, categories] = await Promise.all([
    getConsultants(),
    getCategories(),
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "PureTalks Verified Experts",
    description: "Licensed psychologists, relationship counselors, and executive coaches available for online consultations.",
    url: `${siteConfig.url}/experts`,
    numberOfItems: consultants.length,
    itemListElement: consultants.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: c.name,
        jobTitle: c.title,
        url: `${siteConfig.url}/experts/${c.slug}`,
        image: c.avatar,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: c.rating,
          reviewCount: c.reviewCount,
        },
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <ExpertsDirectoryClient
        initialConsultants={consultants}
        categories={categories}
        searchParams={searchParams}
      />
    </>
  );
}
