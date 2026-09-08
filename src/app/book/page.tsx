import React from "react";
import { getConsultants } from "@/lib/api/consultants";
import { getCategories } from "@/lib/api/categories";
import { BookingFlowContainer } from "@/components/booking/BookingFlowContainer";
import { Badge } from "@/ui/Badge";
import { Lock } from "lucide-react";

export const metadata = {
  title: "Book Private Consultation — PureTalks",
  description: "Instant confidential slot reservation with certified psychologists and counselors.",
};

interface Props {
  searchParams: {
    expert?: string;
    category?: string;
    duration?: string;
  };
}

export default async function BookPage({ searchParams }: Props) {
  const [consultants, categories] = await Promise.all([
    getConsultants(),
    getCategories(),
  ]);

  const durationNum =
    searchParams.duration === "30"
      ? 30
      : searchParams.duration === "60"
      ? 60
      : 45;

  return (
    <div className="pt-32 pb-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2.5">
        <Badge variant="sage" size="sm" className="font-semibold">
          <Lock className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
          Encrypted Sanctuary Reservation
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">
          Reserve Your Private Sanctuary
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          Peer-to-peer encrypted rooms • Anonymous mode supported • Instant slot confirmation
        </p>
      </div>

      <BookingFlowContainer
        consultants={consultants}
        categories={categories}
        preselectedConsultantSlug={searchParams.expert}
        preselectedCategorySlug={searchParams.category}
        preselectedDuration={durationNum}
      />
    </div>
  );
}
