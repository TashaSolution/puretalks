import React from "react";
import { Metadata } from "next";
import { FAQSection } from "@/components/sections/FAQSection";
import { Badge } from "@/ui/Badge";
import { faqsData } from "@/data/faqs";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "PureTalks FAQ — Privacy, Booking & Pricing Answers",
  description: "Find answers to questions about privacy, confidential consultations, booking process, and pricing on PureTalks.",
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
    title: "PureTalks FAQ — Privacy, Booking & Pricing Answers",
    description: "Find answers to questions about privacy, confidential consultations, booking process, and pricing.",
    url: `${siteConfig.url}/faq`,
    type: "website",
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

  return (
    <div className="pt-24 pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQSection />
    </div>
  );
}
