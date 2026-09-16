import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { ShieldCheck, Heart, Sparkles, Lock, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About PureTalks — Our Consultation Platform",
  description: "Learn about PureTalks, our purpose, consultation approach and the expert-led support available through the platform.",
  keywords: [
    "about PureTalks",
    "PureTalks mission",
    "pure talks philosophy",
    "confidential counseling platform",
    "mental health sanctuary India",
    "private online consultations",
  ],
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: "About PureTalks — Our Consultation Platform",
    description: "Learn about PureTalks, our purpose, consultation approach and expert-led support.",
    url: `${siteConfig.url}/about`,
    type: "website",
    locale: "en_IN",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "About PureTalks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About PureTalks — Our Consultation Platform",
    description: "Learn about PureTalks, our purpose and expert-led consultation platform.",
    images: [siteConfig.ogImage],
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About PureTalks — Our Sanctuary & Philosophy",
    description:
      "Learn why PureTalks was founded to offer private, confidential online consultations. Our mission: a judgment-free sanctuary for mental health, relationships, and career growth.",
    url: `${siteConfig.url}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "PureTalks",
      url: siteConfig.url,
      description: siteConfig.description,
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
        name: "About",
        item: `${siteConfig.url}/about`,
      },
    ],
  };

  return (
    <div className="pt-32 pb-24 container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="sage" size="sm" className="font-semibold">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
          Our Sacred Mission
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C2024] tracking-tight leading-tight">
          About PureTalks
        </h1>
        <p className="text-base text-[#4B5563] leading-relaxed font-normal">
          PureTalks was born from a simple yet profound realization: when navigating deep emotional turmoil, marital conflicts, or career crossroads, true healing happens when you can express yourself in a space of complete confidentiality, safety, and non-judgment.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card glass className="p-8 sm:p-10 border-black/[0.07] bg-white shadow-card rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#4A6B5D]/10 border border-[#4A6B5D]/20 text-[#4A6B5D] flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#1C2024]">Absolute Confidentiality</h3>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
            Privacy is not a feature for us; it is our foundation. With anonymous audio mode, zero session recordings, and end-to-end encrypted rooms, your identity is always protected.
          </p>
        </Card>

        <Card glass className="p-8 sm:p-10 border-black/[0.07] bg-white shadow-card rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C5A869]/15 border border-[#C5A869]/30 text-[#8A6E2D] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#1C2024]">Deep Empathy</h3>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
            Our psychologists and coaches understand personal dynamics, relationship nuances, work pressure, and modern life struggles without prejudice.
          </p>
        </Card>

        <Card glass className="p-8 sm:p-10 border-black/[0.07] bg-white shadow-card rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#1C2024]">Vetted Professional Excellence</h3>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
            We curate only accredited psychologists, ICF certified executive coaches, and licensed counselors with a proven history of empathetic guidance.
          </p>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-xl font-serif font-bold text-[#1C2024]">
          Explore PureTalks
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/consultations" className="text-sm font-semibold text-[#4A6B5D] underline hover:text-[#3B5749]">
            Consultation services
          </Link>
          <Link href="/experts" className="text-sm font-semibold text-[#4A6B5D] underline hover:text-[#3B5749]">
            Meet our experts
          </Link>
          <Link href="/how-it-works" className="text-sm font-semibold text-[#4A6B5D] underline hover:text-[#3B5749]">
            How it works
          </Link>
          <Link href="/faq" className="text-sm font-semibold text-[#4A6B5D] underline hover:text-[#3B5749]">
            Frequently asked questions
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="p-10 sm:p-12 rounded-3xl bg-gradient-to-tr from-[#F4EFEA] to-white border border-[#4A6B5D]/25 shadow-card text-center max-w-3xl mx-auto space-y-5">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C2024]">
          Ready to experience genuine clarity and peace of mind?
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-lg mx-auto font-normal">
          Take the first step today with our certified counselors and mentors.
        </p>
        <Link href="/book" className="inline-block">
          <Button variant="primary" size="lg" className="font-bold shadow-md shadow-[#4A6B5D]/20" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Book a Confidential Session
          </Button>
        </Link>
      </div>
    </div>
  );
}
