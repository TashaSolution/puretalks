import React from "react";
import { Metadata } from "next";
import { getConsultants } from "@/lib/api/consultants";
import { getCategories } from "@/lib/api/categories";
import { ExpertsDirectoryClient } from "@/components/consultants/ExpertsDirectoryClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "PureTalks Verified Experts — Licensed Counselors & Coaches",
  description: "Browse certified counselors, clinical psychologists, relationship therapists, and executive coaches on PureTalks. Rated 4.96/5 by 1200+ clients. Starting from ₹399.",
  keywords: [
    "PureTalks experts",
    "pure talks counselors",
    "certified counselors India",
    "online psychologists",
    "relationship therapists",
    "executive coaches",
    "mental health professionals",
  ],
  alternates: {
    canonical: `${siteConfig.url}/experts`,
  },
  openGraph: {
    title: "PureTalks Verified Experts — Licensed Counselors & Coaches",
    description: "Browse certified counselors, clinical psychologists, and mentors on PureTalks.",
    url: `${siteConfig.url}/experts`,
    type: "website",
  },
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
