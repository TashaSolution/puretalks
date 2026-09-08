"use client";

import React from "react";
import Link from "next/link";
import { ConsultationCategory } from "@/types/category";
import { CategoryGrid } from "@/categories/CategoryGrid";
import { useLanguage } from "@/locales/i18n-context";
import { FadeIn } from "@/animations/FadeIn";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { ArrowRight, Sparkles } from "lucide-react";

export function CategoriesSection({ categories }: { categories: ConsultationCategory[] }) {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative bg-[#FAF8F5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <FadeIn>
            <Badge variant="sage" size="sm" className="mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
              Confidential Domains
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">
              Safe Sanctuaries for Every Life Journey
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] mt-2.5 max-w-xl leading-relaxed">
              Choose the exact domain where you need empathy, strategic clarity, or emotional healing.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="shrink-0">
            <Link href="/consultations">
              <Button
                variant="outline"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-medium"
              >
                {t.common.viewAllCategories}
              </Button>
            </Link>
          </FadeIn>
        </div>

        {/* Categories Grid */}
        <CategoryGrid categories={categories} />
      </div>
    </section>
  );
}
