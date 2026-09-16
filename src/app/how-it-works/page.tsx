import React from "react";
import { Metadata } from "next";
import { Badge } from "@/ui/Badge";
import { Card } from "@/ui/Card";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ShieldCheck, Video, Mic } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "How Online Consultations Work | PureTalks",
  description: "Learn how PureTalks private online consultations work, from choosing an expert to booking and attending a session. No app download needed.",
  keywords: [
    "how PureTalks works",
    "pure talks consultation process",
    "online consultation process",
    "private therapy booking",
    "anonymous counseling mode",
    "video consultation India",
  ],
  alternates: {
    canonical: `${siteConfig.url}/how-it-works`,
  },
  openGraph: {
    title: "How Online Consultations Work | PureTalks",
    description: "Learn how PureTalks private online consultations work, from booking to session.",
    url: `${siteConfig.url}/how-it-works`,
    type: "website",
    locale: "en_IN",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "How PureTalks Works" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Online Consultations Work | PureTalks",
    description: "Learn how PureTalks private online consultations work.",
    images: [siteConfig.ogImage],
  },
};

export default function HowItWorksPage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Book a Private Consultation on PureTalks",
    description:
      "Three simple steps to book a confidential online consultation with licensed psychologists and counselors on PureTalks.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose Your Expert",
        text: "Browse verified psychologists, relationship counselors, and executive coaches. Filter by specialization, availability, and rating.",
        url: `${siteConfig.url}/experts`,
      },
      {
        "@type": "HowToStep",
        name: "Book a Confidential Slot",
        text: "Select your preferred date, time, and consultation mode — video, audio, or anonymous stealth mode. Payment starts from ₹399.",
        url: `${siteConfig.url}/book`,
      },
      {
        "@type": "HowToStep",
        name: "Connect in a Private Room",
        text: "At your scheduled time, click the encrypted room link. No app download needed. Join from any browser on phone or laptop.",
        url: `${siteConfig.url}/how-it-works`,
      },
    ],
    totalTime: "PT10M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: "399",
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
        name: "How It Works",
        item: `${siteConfig.url}/how-it-works`,
      },
    ],
  };

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C2024] tracking-tight text-center">
          How PureTalks Online Consultations Work
        </h1>
      </div>
      <HowItWorksSection />

      {/* Consultation Modes Detailed */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="sage" size="sm" className="mb-2 font-semibold">
            Your Comfort First
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">
            Three Flexible Ways to Connect
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card glass className="p-8 sm:p-10 border-black/[0.07] bg-white shadow-card rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4A6B5D]/10 text-[#4A6B5D] flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#1C2024]">Private Voice Call</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
              Crystal clear audio call directly inside your browser. No video, no pressure. Ideal for quick check-ins and relaxed emotional processing.
            </p>
          </Card>

          <Card glass className="p-8 sm:p-10 border-black/[0.07] bg-white shadow-card rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#1C2024]">1-on-1 Video Session</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
              High-definition face-to-face video consultation. Recommended for couples therapy, marriage alignment, and executive interview mentoring.
            </p>
          </Card>

          <Card glass className="p-8 sm:p-10 border-black/[0.07] bg-white shadow-card rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C5A869]/15 text-[#8A6E2D] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#1C2024]">Anonymous Stealth Mode</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
              Complete anonymity. Join with an alias name, camera disabled, and zero identifiable digital footprints.
            </p>
          </Card>
        </div>
      </div>

      <FAQSection />
    </div>
  );
}
