"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Consultant } from "@/types/consultant";
import { Card } from "@/ui/Card";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { formatPrice } from "@/lib/utils";
import {
  Star,
  CheckCircle2,
  Mic,
  Video,
  ArrowRight,
} from "lucide-react";

export function ConsultantCard({ consultant }: { consultant: Consultant }) {
  return (
    <Card
      glass
      hoverEffect
      className="flex flex-col justify-between h-full group bg-white/95 border-black/[0.07] shadow-card rounded-2xl"
    >
      <div>
        {/* Top Profile Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-4">
            {/* Doctor Portrait */}
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-black/10 bg-[#F4EFEA] shrink-0 shadow-sm">
              <Image
                src={consultant.avatar}
                alt={consultant.name}
                fill
                sizes="(max-width: 768px) 80px, 120px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {consultant.isOnline && (
                <span
                  className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-[#4A6B5D] rounded-full border-2 border-white"
                  title="Available Today"
                />
              )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-lg font-serif font-bold text-[#1C2024] group-hover:text-[#4A6B5D] transition-colors truncate">
                  {consultant.name}
                </h3>
                <CheckCircle2 className="w-4 h-4 text-[#4A6B5D] shrink-0" />
              </div>

              <p className="text-xs text-[#4A6B5D] font-medium mt-0.5 line-clamp-1">
                {consultant.title}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-[#C5A869]/15 border border-[#C5A869]/30 px-2 py-0.5 rounded-md text-[#8A6E2D] text-xs font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{consultant.rating}</span>
                </div>
                <span className="text-[11px] text-[#6B7280]">
                  ({consultant.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Mode Badges */}
          <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs">
            <div className="text-xs text-[#6B7280] font-medium">
              <span>{consultant.experienceYears}+ Yrs Experience</span>
            </div>
            <div className="flex items-center gap-2 text-[#6B7280]">
              {consultant.consultationTypes.audio && (
                <span className="flex items-center gap-1 text-[#4A6B5D]" title="Audio Call">
                  <Mic className="w-3.5 h-3.5" />
                </span>
              )}
              {consultant.consultationTypes.video && (
                <span className="flex items-center gap-1 text-[#3B82F6]" title="Video Session">
                  <Video className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
          </div>

          {/* Bio snippet */}
          <p className="text-xs text-[#6B7280] mt-3 line-clamp-2 leading-relaxed font-normal">
            {consultant.bio}
          </p>
        </div>
      </div>

      {/* Footer Pricing & Booking CTA */}
      <div className="p-6 pt-0 border-t border-black/[0.06] mt-2 pt-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-[#9CA3AF] block uppercase font-bold tracking-wider">
            30 mins session
          </span>
          <span className="text-lg font-bold text-[#1C2024]">
            {formatPrice(consultant.pricing.duration30Min)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/experts/${consultant.slug}`}>
            <Button variant="ghost" size="sm" className="text-xs font-semibold text-[#4B5563]">
              Profile
            </Button>
          </Link>
          <Link href={`/book?expert=${consultant.slug}`}>
            <Button
              variant="primary"
              size="sm"
              className="shadow-sm font-semibold"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Book
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
