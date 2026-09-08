"use client";

import React from "react";
import Link from "next/link";
import { Consultant } from "@/types/consultant";
import { ConsultantGrid } from "@/consultants/ConsultantGrid";
import { useLanguage } from "@/locales/i18n-context";
import { FadeIn } from "@/animations/FadeIn";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { ArrowRight, Sparkles } from "lucide-react";

export function FeaturedConsultantsSection({ consultants }: { consultants: Consultant[] }) {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative bg-[#F4EFEA]/70 border-t border-black/[0.06]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <FadeIn>
            <Badge variant="gold" size="sm" className="mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Verified Counselors
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">
              Meet Our Featured Specialists
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] mt-2.5 max-w-xl leading-relaxed">
              Licensed clinical psychologists, relationship counselors, and executive coaches dedicated to your growth.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="shrink-0">
            <Link href="/experts">
              <Button
                variant="outline"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-medium"
              >
                {t.common.viewAllExperts}
              </Button>
            </Link>
          </FadeIn>
        </div>

        {/* Grid */}
        <ConsultantGrid consultants={consultants} />
      </div>
    </section>
  );
}
