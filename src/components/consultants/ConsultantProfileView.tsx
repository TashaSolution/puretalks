"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Consultant } from "@/types/consultant";
import { ClientReview } from "@/types/review";
import { Card } from "@/ui/Card";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { formatPrice } from "@/lib/utils";
import {
  Star,
  CheckCircle2,
  Award,
  Mic,
  Video,
  ShieldCheck,
  Lock,
  Sparkles,
  ArrowRight,
  Quote,
} from "lucide-react";

interface Props {
  consultant: Consultant;
  reviews: ClientReview[];
}

export function ConsultantProfileView({ consultant, reviews }: Props) {
  const [selectedDuration, setSelectedDuration] = useState<30 | 45 | 60>(45);

  const price =
    selectedDuration === 30
      ? consultant.pricing.duration30Min
      : selectedDuration === 45
      ? consultant.pricing.duration45Min
      : consultant.pricing.duration60Min;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#6B7280] font-medium mb-8">
        <Link href="/" className="hover:text-[#1C2024]">Home</Link>
        <span>/</span>
        <Link href="/experts" className="hover:text-[#1C2024]">Experts</Link>
        <span>/</span>
        <span className="text-[#4A6B5D] font-bold">{consultant.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Comprehensive Profile & Reviews */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Card */}
          <Card glass className="p-8 sm:p-10 border-black/[0.07] bg-white shadow-card rounded-2xl">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-black/10 shadow-md shrink-0 bg-[#F4EFEA]">
                <Image
                  src={consultant.avatar}
                  alt={consultant.name}
                  fill
                  sizes="200px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="sage" size="sm" className="font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
                    Verified Professional
                  </Badge>
                  {consultant.badges.map((b, i) => (
                    <Badge key={i} variant="gold" size="sm" className="font-semibold">
                      {b.label}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C2024] tracking-tight">
                  {consultant.name}
                </h1>

                <p className="text-sm font-semibold text-[#4A6B5D]">
                  {consultant.title}
                </p>

                <p className="text-xs text-[#6B7280] leading-relaxed font-normal">
                  {consultant.specialization}
                </p>

                {/* Rating & Stats */}
                <div className="pt-3 flex items-center gap-3 text-xs flex-wrap font-medium">
                  <div className="flex items-center gap-1 text-[#8A6E2D] font-bold bg-[#C5A869]/15 border border-[#C5A869]/30 px-2.5 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{consultant.rating}</span>
                    <span className="text-[#6B7280] font-normal">({consultant.reviewCount} reviews)</span>
                  </div>

                  <div className="text-[#1C2024] bg-[#F4EFEA] border border-[#E8DFC5]/60 px-2.5 py-1 rounded-lg">
                    <span className="font-bold">{consultant.experienceYears}+ yrs</span> Experience
                  </div>

                  <div className="text-[#1C2024] bg-[#F4EFEA] border border-[#E8DFC5]/60 px-2.5 py-1 rounded-lg">
                    <span className="font-bold">{consultant.sessionsCompleted}+</span> Sessions Done
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* About / Clinical Approach */}
          <Card glass className="p-8 border-black/[0.07] bg-white shadow-card rounded-2xl space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#1C2024] tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#4A6B5D]" />
              About & Clinical Approach
            </h2>
            <p className="text-sm text-[#4B5563] leading-relaxed font-normal">
              {consultant.bio}
            </p>
          </Card>

          {/* Credentials & Qualifications */}
          <Card glass className="p-8 border-black/[0.07] bg-white shadow-card rounded-2xl space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#1C2024] tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-[#C5A869]" />
              Verified Credentials & Degrees
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {consultant.credentials.map((cred, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-[#1C2024] p-3.5 rounded-xl bg-[#FAF8F5] border border-black/[0.06] font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#4A6B5D] shrink-0 mt-0.5" />
                  <span>{cred}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Client Reviews */}
          <Card glass className="p-8 border-black/[0.07] bg-white shadow-card rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-[#1C2024] tracking-tight flex items-center gap-2">
                <Quote className="w-5 h-5 text-[#4A6B5D]" />
                Verified Client Reviews
              </h2>
              <span className="text-xs text-[#6B7280] font-medium">
                {reviews.length} Verified Reviews
              </span>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-[#FAF8F5] border border-black/[0.06] space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#4A6B5D]/10 text-[#3B5749] text-xs font-bold flex items-center justify-center border border-[#4A6B5D]/20">
                        {rev.clientAlias[0]}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1C2024]">{rev.clientAlias}</span>
                        <span className="text-[10px] text-[#6B7280] ml-2">({rev.clientLocation})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#B89748]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[#4B5563] leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 text-[10px] text-[#9CA3AF] pt-1 border-t border-black/[0.04] font-medium">
                    <span>{rev.consultationType}</span>
                    <span>•</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Sticky Booking Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <Card
            glass
            className="p-7 border-[#4A6B5D]/30 shadow-card bg-white rounded-2xl space-y-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="sage" size="sm" className="font-semibold">
                  <Lock className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
                  100% Confidential
                </Badge>
                <span className="text-xs text-[#4A6B5D] font-bold">
                  {consultant.availableNext}
                </span>
              </div>

              {/* Price Display */}
              <div className="mt-4 pb-4 border-b border-black/[0.07]">
                <span className="text-xs text-[#6B7280] block font-medium">Consultation Fee</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-serif font-bold text-[#1C2024] tracking-tight">
                    {formatPrice(price)}
                  </span>
                  <span className="text-xs text-[#6B7280]">/ {selectedDuration} mins</span>
                </div>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1C2024]">
                Select Session Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([30, 45, 60] as const).map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setSelectedDuration(dur)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      selectedDuration === dur
                        ? "bg-[#4A6B5D] text-white border-[#3B5749] shadow-sm"
                        : "bg-[#FAF8F5] border-black/10 text-[#4B5563] hover:border-black/20"
                    }`}
                  >
                    {dur} Mins
                  </button>
                ))}
              </div>
            </div>

            {/* Supported Modes */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-[#1C2024]">
                Available Consultation Modes
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-black/[0.06] flex items-center gap-2 text-[#1C2024] font-medium">
                  <Mic className="w-4 h-4 text-[#4A6B5D]" />
                  <span>Private Audio</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-black/[0.06] flex items-center gap-2 text-[#1C2024] font-medium">
                  <Video className="w-4 h-4 text-[#3B82F6]" />
                  <span>1-on-1 Video</span>
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-2">
              <Link
                href={`/book?expert=${consultant.slug}&duration=${selectedDuration}`}
                className="block w-full"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full shadow-md shadow-[#4A6B5D]/20 font-bold"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Proceed to Select Slot
                </Button>
              </Link>
            </div>

            <div className="space-y-2 text-[11px] text-[#6B7280] pt-2 border-t border-black/[0.06] font-medium">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B5D] shrink-0" />
                Free rescheduling up to 2 hours before
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B5D] shrink-0" />
                Encrypted room link sent to Email & WhatsApp
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
