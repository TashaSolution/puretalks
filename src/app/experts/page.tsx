import React from "react";
import { getConsultants } from "@/lib/api/consultants";
import { getCategories } from "@/lib/api/categories";
import { ExpertsDirectoryClient } from "@/components/consultants/ExpertsDirectoryClient";

export const metadata = {
  title: "Our Verified Experts — PureTalks",
  description: "Browse certified counselors, clinical psychologists, and mentors.",
};

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ExpertsPage({ searchParams }: Props) {
  const [consultants, categories] = await Promise.all([
    getConsultants(),
    getCategories(),
  ]);

  return (
    <ExpertsDirectoryClient
      initialConsultants={consultants}
      categories={categories}
      searchParams={searchParams}
    />
  );
}
