import React from "react";
import { getCategories } from "@/lib/api/categories";
import { CategoryGrid } from "@/components/categories/CategoryGrid";
import { Badge } from "@/ui/Badge";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Consultation Categories — PureTalks",
  description: "Browse all private consultation categories available on PureTalks.",
};

export default async function ConsultationsPage() {
  const categories = await getCategories();

  return (
    <div className="pt-32 pb-24 container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <Badge variant="sage" size="sm" className="font-semibold">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
          Specialized Domains
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C2024] tracking-tight">
          Private Consultation Categories
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed font-normal">
          From emotional healing to relationship counseling and executive career coaching, find empathetic support tailored to your unique journey.
        </p>
      </div>

      <CategoryGrid categories={categories} />
    </div>
  );
}
