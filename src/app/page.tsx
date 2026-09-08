import React from "react";
import { getFeaturedCategories } from "@/lib/api/categories";
import { getFeaturedConsultants } from "@/lib/api/consultants";
import { HomeClientExperience } from "@/components/home/HomeClientExperience";

export default async function HomePage() {
  const [categories, featuredConsultants] = await Promise.all([
    getFeaturedCategories(),
    getFeaturedConsultants(),
  ]);

  return (
    <HomeClientExperience
      categories={categories}
      featuredConsultants={featuredConsultants}
    />
  );
}
