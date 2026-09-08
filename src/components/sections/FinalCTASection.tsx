"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { FadeIn } from "@/animations/FadeIn";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#FAF8F5]">
      {/* Background glowing rings in Sage & Champagne */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#4A6B5D]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
        <FadeIn>
          <Badge variant="sage" size="sm" className="mb-4 font-semibold">
            <Lock className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
            Confidential Private Sanctuary
          </Badge>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C2024] tracking-tight leading-tight">
            You Don’t Have to Carry the Weight Alone. <br />
            <span className="italic text-[#4A6B5D]">Take the First Step Today.</span>
          </h2>

          <p className="text-base text-[#6B7280] mt-5 leading-relaxed max-w-xl mx-auto font-normal">
            Connect privately with certified counselors and clinical psychologists from the comfort and safety of your home.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book">
              <Button
                variant="primary"
                size="xl"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="shadow-md shadow-[#4A6B5D]/20 w-full sm:w-auto font-semibold"
              >
                Book Private Session
              </Button>
            </Link>
            <Link href="/experts">
              <Button
                variant="secondary"
                size="xl"
                className="w-full sm:w-auto font-medium"
              >
                Explore All Experts
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[#6B7280] font-medium">
            <span className="flex items-center gap-1.5 text-[#3B5749]">
              <ShieldCheck className="w-4 h-4 text-[#4A6B5D]" />
              100% Private
            </span>
            <span>•</span>
            <span>Zero App Install</span>
            <span>•</span>
            <span>Instant Slot Booking</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
