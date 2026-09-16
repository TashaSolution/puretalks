import React from "react";
import { Metadata } from "next";
import { getConsultants } from "@/lib/api/consultants";
import { getCategories } from "@/lib/api/categories";
import { BookingFlowContainer } from "@/components/booking/BookingFlowContainer";
import { Badge } from "@/ui/Badge";
import { Lock } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Book Private Consultation — PureTalks",
  description: "Instant confidential slot reservation with certified psychologists and counselors on PureTalks. Anonymous mode available. Starting from ₹399. Encrypted video/audio rooms.",
  keywords: [
    "book online therapy",
    "pure talks booking",
    "consultation booking India",
    "private counseling session",
    "anonymous therapy booking",
    "PureTalks booking",
  ],
  alternates: {
    canonical: `${siteConfig.url}/book`,
  },
  openGraph: {
    title: "Book Private Consultation — PureTalks",
    description: "Instant confidential slot reservation with certified specialists.",
    url: `${siteConfig.url}/book`,
    type: "website",
    locale: "en_IN",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Book a PureTalks Consultation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Private Consultation — PureTalks",
    description: "Instant confidential slot reservation with certified specialists.",
    images: [siteConfig.ogImage],
  },
};

interface Props {
  searchParams: {
    expert?: string;
    category?: string;
    duration?: string;
  };
}

export default async function BookPage({ searchParams }: Props) {
  const [consultants, categories] = await Promise.all([
    getConsultants(),
    getCategories(),
  ]);

  const durationNum =
    searchParams.duration === "30"
      ? 30
      : searchParams.duration === "60"
      ? 60
      : 45;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Book Private Consultation — PureTalks",
    description: "Instant confidential slot reservation with certified psychologists and counselors on PureTalks.",
    url: `${siteConfig.url}/book`,
    publisher: { "@type": "Organization", name: "PureTalks", url: siteConfig.url },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/book`,
      },
      result: {
        "@type": "Reservation",
        name: "Private Consultation Session",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Book a Session", item: `${siteConfig.url}/book` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="pt-32 pb-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2.5">
        <Badge variant="sage" size="sm" className="font-semibold">
          <Lock className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
          Encrypted Sanctuary Reservation
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">
          Reserve Your Private Sanctuary
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          Peer-to-peer encrypted rooms • Anonymous mode supported • Instant slot confirmation
        </p>
      </div>

      <BookingFlowContainer
        consultants={consultants}
        categories={categories}
        preselectedConsultantSlug={searchParams.expert}
        preselectedCategorySlug={searchParams.category}
        preselectedDuration={durationNum}
      />
      </div>
    </>
  );
}
