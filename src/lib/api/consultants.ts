import { Consultant, ConsultantFilters } from "@/types/consultant";
import { consultantsData } from "@/data/consultants";
import { apiClient } from "./client";

export async function getConsultants(filters?: ConsultantFilters): Promise<Consultant[]> {
  try {
    return await apiClient<Consultant[]>("/consultants", {}, () => {
      let result = [...consultantsData];

      if (!filters) return result;

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
    });
  } catch {
    return consultantsData;
  }
}

export async function getFeaturedConsultants(): Promise<Consultant[]> {
  const all = await getConsultants();
  return all.slice(0, 6);
}

export async function getConsultantBySlug(slug: string): Promise<Consultant | null> {
  try {
    return await apiClient<Consultant | null>(`/consultants/${slug}`, {}, () => {
      return consultantsData.find((c) => c.slug === slug) || null;
    });
  } catch {
    return consultantsData.find((c) => c.slug === slug) || null;
  }
}

export async function getConsultantsByCategory(categoryId: string): Promise<Consultant[]> {
  const all = await getConsultants();
  return all.filter((c) => c.categoryIds.includes(categoryId));
}
