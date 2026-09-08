"use client";

import React from "react";
import { ConsultationCategory } from "@/types/category";
import { CategoryCard } from "./CategoryCard";
import { StaggerContainer, StaggerItem } from "@/animations/FadeIn";

export function CategoryGrid({ categories }: { categories: ConsultationCategory[] }) {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <StaggerItem key={category.id}>
          <CategoryCard category={category} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
