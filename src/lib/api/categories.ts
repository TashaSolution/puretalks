import { ConsultationCategory } from "@/types/category";
import { categoriesData } from "@/data/categories";
import { apiClient } from "./client";

export async function getCategories(): Promise<ConsultationCategory[]> {
  return apiClient<ConsultationCategory[]>("/categories", {}, () => {
    return categoriesData;
  });
}

export async function getCategoryBySlug(slug: string): Promise<ConsultationCategory | null> {
  return apiClient<ConsultationCategory | null>(`/categories/${slug}`, {}, () => {
    return categoriesData.find((c) => c.slug === slug) || null;
  });
}

export async function getFeaturedCategories(): Promise<ConsultationCategory[]> {
  return apiClient<ConsultationCategory[]>("/categories/featured", {}, () => {
    return categoriesData.slice(0, 6);
  });
}
