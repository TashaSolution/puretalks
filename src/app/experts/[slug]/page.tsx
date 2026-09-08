import React from "react";
import { notFound } from "next/navigation";
import { getConsultantBySlug, getConsultants } from "@/lib/api/consultants";
import { reviewsData } from "@/data/reviews";
import { ConsultantProfileView } from "@/components/consultants/ConsultantProfileView";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const consultants = await getConsultants();
  return consultants.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const consultant = await getConsultantBySlug(params.slug);
  if (!consultant) return { title: "Expert Not Found — PureTalks" };

  return {
    title: `${consultant.name} — ${consultant.title} | PureTalks`,
    description: consultant.bio,
  };
}

export default async function ExpertDetailPage({ params }: Props) {
  const consultant = await getConsultantBySlug(params.slug);

  if (!consultant) {
    notFound();
  }

  const consultantReviews = reviewsData.filter(
    (r) => r.consultantId === consultant.id
  );

  return (
    <div className="pt-20">
      <ConsultantProfileView
        consultant={consultant}
        reviews={consultantReviews}
      />
    </div>
  );
}
