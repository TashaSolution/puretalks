"use client";

import React, { useState, useMemo } from "react";
import { Consultant, ConsultantFilters as IConsultantFilters } from "@/types/consultant";
import { ConsultationCategory } from "@/types/category";
import { ConsultantFilters } from "@/components/consultants/ConsultantFilters";
import { ConsultantGrid } from "@/components/consultants/ConsultantGrid";
import { Badge } from "@/ui/Badge";
import { Users } from "lucide-react";

interface Props {
  initialConsultants: Consultant[];
  categories: ConsultationCategory[];
  searchParams?: { [key: string]: string | string[] | undefined };
}

export function ExpertsDirectoryClient({
  initialConsultants,
  categories,
  searchParams,
}: Props) {
  const initialCategory = typeof searchParams?.category === "string" ? searchParams.category : "all";

  const [filters, setFilters] = useState<IConsultantFilters>({
    category: initialCategory,
    mode: "all",
    searchQuery: "",
    sortBy: "recommended",
  });

  const filteredConsultants = useMemo(() => {
    let result = [...initialConsultants];

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.specialization.toLowerCase().includes(q) ||
          c.bio.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== "all") {
      result = result.filter((c) => c.categoryIds.includes(filters.category!));
    }

    if (filters.mode && filters.mode !== "all") {
      result = result.filter((c) => {
        if (filters.mode === "audio") return c.consultationTypes.audio;
        if (filters.mode === "video") return c.consultationTypes.video;
        if (filters.mode === "anonymous") return c.consultationTypes.anonymous;
        return true;
      });
    }

    if (filters.sortBy) {
      if (filters.sortBy === "rating") {
        result.sort((a, b) => b.rating - a.rating);
      } else if (filters.sortBy === "experience") {
        result.sort((a, b) => b.experienceYears - a.experienceYears);
      } else if (filters.sortBy === "price-low") {
        result.sort((a, b) => a.pricing.duration30Min - b.pricing.duration30Min);
      } else if (filters.sortBy === "price-high") {
        result.sort((a, b) => b.pricing.duration30Min - a.pricing.duration30Min);
      }
    }

    return result;
  }, [initialConsultants, filters]);

  return (
    <div className="pt-32 pb-24 container mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="gold" size="sm" className="font-semibold">
          <Users className="w-3.5 h-3.5 mr-1 text-[#8A6E2D]" />
          Verified Experts Directory
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C2024] tracking-tight">
          Find Your Personal Mentor
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed font-normal">
          Browse certified clinical psychologists, relationship therapists, and executive coaches.
        </p>
      </div>

      {/* Interactive Filters Bar */}
      <ConsultantFilters
        filters={filters}
        onChange={setFilters}
        categories={categories}
        totalResults={filteredConsultants.length}
      />

      {/* Grid */}
      <ConsultantGrid consultants={filteredConsultants} />
    </div>
  );
}
