import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/lib/api/categories";
import { getConsultantsByCategory } from "@/lib/api/consultants";
import { ConsultantGrid } from "@/components/consultants/ConsultantGrid";
import { Badge } from "@/ui/Badge";
import { Lock } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const consultants = await getConsultantsByCategory(category.id);

  return (
    <div className="pt-32 pb-24 container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#6B7280] font-medium mb-8">
        <Link href="/" className="hover:text-[#1C2024]">Home</Link>
        <span>/</span>
        <Link href="/consultations" className="hover:text-[#1C2024]">Consultations</Link>
        <span>/</span>
        <span className="text-[#4A6B5D] font-bold">{category.title}</span>
      </div>

      {/* Category Hero */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-black/[0.07] shadow-card relative overflow-hidden mb-14">
        <div className="max-w-2xl space-y-4">
          <Badge variant="sage" size="sm" className="font-semibold">
            <Lock className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
            100% Confidential Domain
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">
            {category.title}
          </h1>
          <p className="text-sm text-[#6B7280] leading-relaxed font-normal">
            {category.description}
          </p>

          <div className="pt-3 flex flex-wrap gap-2">
            {category.popularTopics.map((topic, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-black/[0.08] text-[#4B5563] font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Matching Consultants */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-[#1C2024] tracking-tight">
            Specialists in {category.title}
          </h2>
          <span className="text-xs text-[#6B7280] font-medium">
            {consultants.length} Experts Available
          </span>
        </div>

        <ConsultantGrid consultants={consultants} />
      </div>
    </div>
  );
}
