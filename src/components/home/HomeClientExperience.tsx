"use client";

import React from "react";
import { HeroSection } from "@/components/hero/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { FeaturedConsultantsSection } from "@/components/sections/FeaturedConsultantsSection";
import { PrivacyConfidentialitySection } from "@/components/sections/PrivacyConfidentialitySection";
import { GlobalSanctuarySection } from "@/components/sections/GlobalSanctuarySection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { SEOContentSection } from "@/components/home/SEOContentSection";
import { ConsultationCategory } from "@/types/category";
import { Consultant } from "@/types/consultant";

interface Props {
  categories: ConsultationCategory[];
  featuredConsultants: Consultant[];
}

export function HomeClientExperience({ categories, featuredConsultants }: Props) {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section - Above the fold */}
      <HeroSection />

      {/* Trust & Credibility Strip - Above the fold */}
      <TrustStrip />

      {/* Structured SSR Sections with CSS-driven viewport entrance */}
      <CategoriesSection categories={categories} />
      <FeaturedConsultantsSection consultants={featuredConsultants} />
      <PrivacyConfidentialitySection />
      <GlobalSanctuarySection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
      <SEOContentSection />
    </div>
  );
}

