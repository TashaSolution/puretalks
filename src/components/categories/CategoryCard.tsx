"use client";

import React from "react";
import Link from "next/link";
import { ConsultationCategory } from "@/types/category";
import { Card } from "@/ui/Card";
import { Badge } from "@/ui/Badge";
import { formatPrice } from "@/lib/utils";
import {
  HeartPulse,
  Users2,
  TrendingUp,
  Compass,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Shield,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  HeartPulse,
  Users2,
  TrendingUp,
  Compass,
  GraduationCap,
  Sparkles,
};

export function CategoryCard({ category }: { category: ConsultationCategory }) {
  const IconComponent = iconMap[category.iconName] || Shield;

  return (
    <Card
      glass
      hoverEffect
      className="p-7 flex flex-col justify-between h-full group bg-white/90 border-black/[0.07] shadow-card rounded-2xl"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 duration-300 bg-[#4A6B5D]/10 border border-[#4A6B5D]/20 text-[#4A6B5D]">
            <IconComponent className="w-6 h-6" />
          </div>

          <Badge variant="secondary" size="sm" className="bg-[#F4EFEA] text-[#4B5563] font-medium border border-[#E8DFC5]/60">
            {category.availableConsultantsCount} Specialists
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif font-bold text-[#1C2024] group-hover:text-[#4A6B5D] transition-colors tracking-tight">
          {category.title}
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-[#6B7280] mt-2.5 leading-relaxed font-normal">
          {category.subtitle}
        </p>

        {/* Popular Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {category.popularTopics.slice(0, 3).map((topic, i) => (
            <span
              key={i}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-[#F4EFEA] text-[#4B5563] font-medium border border-[#E8DFC5]/40"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between">
        <div>
          <span className="text-[11px] text-[#9CA3AF] block font-medium">
            Starts from
          </span>
          <span className="text-base font-bold text-[#4A6B5D]">
            {formatPrice(category.startingPrice)}
          </span>
        </div>

        <Link
          href={`/consultations/${category.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C2024] group-hover:text-[#4A6B5D] transition-colors"
        >
          <span>View Experts</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#4A6B5D]" />
        </Link>
      </div>
    </Card>
  );
}
