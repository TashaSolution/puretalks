"use client";

import React from "react";
import { Consultant } from "@/types/consultant";
import { ConsultantCard } from "./ConsultantCard";
import { StaggerContainer, StaggerItem } from "@/animations/FadeIn";

export function ConsultantGrid({ consultants }: { consultants: Consultant[] }) {
  if (consultants.length === 0) {
    return (
      <div className="py-16 text-center rounded-2xl glass-panel border border-white/10 max-w-lg mx-auto">
        <p className="text-base text-slate-300 font-medium">
          No experts matched your exact filter criteria.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Try resetting language or specialization filters.
        </p>
      </div>
    );
  }

  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {consultants.map((consultant) => (
        <StaggerItem key={consultant.id}>
          <ConsultantCard consultant={consultant} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
