"use client";

import React from "react";
import Image from "next/image";
import { Consultant } from "@/types/consultant";
import { ConsultationCategory } from "@/types/category";
import { ConsultationMode } from "@/types/booking";
import { Card } from "@/ui/Card";
import { Badge } from "@/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { Mic, Video, UserX, Lock } from "lucide-react";

interface Props {
  consultant: Consultant;
  category: ConsultationCategory;
  duration: 30 | 45 | 60;
  mode: ConsultationMode;
  date: string;
  timeSlot: string;
  clientName: string;
  isAnonymous: boolean;
}

export function BookingSummary({
  consultant,
  category,
  duration,
  mode,
  date,
  timeSlot,
  clientName,
  isAnonymous,
}: Props) {
  const price =
    duration === 30
      ? consultant.pricing.duration30Min
      : duration === 45
      ? consultant.pricing.duration45Min
      : consultant.pricing.duration60Min;

  const modeIcon =
    mode === "audio" ? (
      <Mic className="w-4 h-4 text-[#4A6B5D]" />
    ) : mode === "video" ? (
      <Video className="w-4 h-4 text-[#3B82F6]" />
    ) : (
      <UserX className="w-4 h-4 text-[#8A6E2D]" />
    );

  return (
    <Card glass className="p-7 border-black/[0.08] bg-white shadow-card rounded-2xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-black/[0.07]">
        <h3 className="text-lg font-serif font-bold text-[#1C2024] tracking-tight">
          Session Summary
        </h3>
        <Badge variant="sage" size="sm" className="font-semibold">
          <Lock className="w-3 h-3 mr-1 text-[#4A6B5D]" />
          {isAnonymous ? "Anonymous Mode" : "Private Session"}
        </Badge>
      </div>

      {/* Consultant Header */}
      <div className="flex items-center gap-3.5">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-black/10 shrink-0 bg-[#F4EFEA]">
          <Image
            src={consultant.avatar}
            alt={consultant.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-serif font-bold text-[#1C2024] truncate">
            {consultant.name}
          </h4>
          <p className="text-xs text-[#4A6B5D] font-semibold truncate">
            {consultant.title}
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-black/[0.06] space-y-1">
          <span className="text-[#6B7280] block text-[11px] font-medium">Domain</span>
          <span className="font-bold text-[#1C2024]">
            {category.title}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-black/[0.06] space-y-1">
          <span className="text-[#6B7280] block text-[11px] font-medium">Duration</span>
          <span className="font-bold text-[#1C2024]">{duration} Minutes</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-black/[0.06] space-y-1">
          <span className="text-[#6B7280] block text-[11px] font-medium">Date & Time</span>
          <span className="font-bold text-[#1C2024]">
            {date} • {timeSlot}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-black/[0.06] space-y-1">
          <span className="text-[#6B7280] block text-[11px] font-medium">Mode</span>
          <span className="font-bold text-[#1C2024] flex items-center gap-1">
            {modeIcon}
            <span className="capitalize">{mode}</span>
          </span>
        </div>
      </div>

      {/* Pricing calculation */}
      <div className="pt-4 border-t border-black/[0.07] space-y-2">
        <div className="flex items-center justify-between text-xs text-[#6B7280] font-medium">
          <span>Consultation Fee ({duration}m)</span>
          <span>{formatPrice(price)}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-[#6B7280] font-medium">
          <span>Encrypted Sanctuary Room Fee</span>
          <span className="text-[#4A6B5D] font-bold">FREE</span>
        </div>
        <div className="flex items-center justify-between text-sm font-bold text-[#1C2024] pt-2 border-t border-black/[0.06]">
          <span>Total Payable</span>
          <span className="text-2xl font-serif text-[#4A6B5D] font-bold">
            {formatPrice(price)}
          </span>
        </div>
      </div>
    </Card>
  );
}
