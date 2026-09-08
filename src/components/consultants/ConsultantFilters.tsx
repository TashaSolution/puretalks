"use client";

import React from "react";
import { ConsultantFilters as IConsultantFilters } from "@/types/consultant";
import { ConsultationCategory } from "@/types/category";
import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/ui/Input";
import { Button } from "@/ui/Button";

interface Props {
  filters: IConsultantFilters;
  onChange: (filters: IConsultantFilters) => void;
  categories: ConsultationCategory[];
  totalResults: number;
}

export function ConsultantFilters({ filters, onChange, categories, totalResults }: Props) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, searchQuery: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, category: e.target.value });
  };

  const handleModeChange = (mode: "all" | "audio" | "video" | "anonymous") => {
    onChange({ ...filters, mode });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, sortBy: e.target.value as any });
  };

  const resetFilters = () => {
    onChange({
      category: "all",
      mode: "all",
      searchQuery: "",
      sortBy: "recommended",
    });
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-black/[0.07] shadow-card space-y-5">
      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:max-w-md">
          <Input
            value={filters.searchQuery || ""}
            onChange={handleSearch}
            placeholder="Search by counselor name, issue, or topic..."
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-[#6B7280] font-medium">
            {totalResults} experts available
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            className="text-xs text-[#6B7280] hover:text-[#1C2024]"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-black/[0.06]">
        {/* Category Dropdown */}
        <div>
          <label className="block text-[11px] font-bold text-[#1C2024] mb-1">
            Domain Category
          </label>
          <select
            value={filters.category || "all"}
            onChange={handleCategoryChange}
            className="w-full bg-[#FAF8F5] border border-black/10 rounded-xl px-3 py-2 text-xs text-[#1C2024] font-medium focus:outline-none focus:border-[#4A6B5D]"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Mode Filter */}
        <div>
          <label className="block text-[11px] font-bold text-[#1C2024] mb-1">
            Consultation Mode
          </label>
          <div className="flex items-center gap-1">
            {[
              { id: "all", label: "All Modes" },
              { id: "audio", label: "Audio" },
              { id: "video", label: "Video" },
              { id: "anonymous", label: "Anon" },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleModeChange(m.id as any)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex-1 ${
                  (filters.mode || "all") === m.id
                    ? "bg-[#4A6B5D] text-white shadow-xs"
                    : "bg-[#FAF8F5] border border-black/10 text-[#6B7280] hover:text-[#1C2024]"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-[11px] font-bold text-[#1C2024] mb-1">
            Sort By
          </label>
          <select
            value={filters.sortBy || "recommended"}
            onChange={handleSortChange}
            className="w-full bg-[#FAF8F5] border border-black/10 rounded-xl px-3 py-2 text-xs text-[#1C2024] font-medium focus:outline-none focus:border-[#4A6B5D]"
          >
            <option value="recommended">Recommended</option>
            <option value="rating">Highest Rating</option>
            <option value="experience">Experience (High to Low)</option>
            <option value="price-low">Fee (Low to High)</option>
            <option value="price-high">Fee (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
