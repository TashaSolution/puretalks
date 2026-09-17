"use client";

import React from "react";
import Image from "next/image";
import { Star, Mic, Lock } from "lucide-react";

export function HeroFloatingCards() {
  return (
    <>
      {/* Top Left Floating Badge - Anonymous Audio */}
      <div
        className="absolute -top-6 -left-4 sm:left-4 z-20 p-3.5 rounded-2xl bg-white/90 border border-black/[0.08] shadow-card flex items-center gap-3 animate-fade-in-left delay-400 backdrop-blur-xl"
      >
        <div className="w-10 h-10 rounded-xl bg-[#4A6B5D]/10 text-[#4A6B5D] flex items-center justify-center border border-[#4A6B5D]/25 shrink-0">
          <Mic className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse" />
            <p className="text-xs font-bold text-[#1C2024]">
              100% Anonymous Audio
            </p>
          </div>
          <p className="text-[11px] text-[#6B7280] mt-0.5">
            Camera off • Pseudonym ready
          </p>
        </div>
      </div>

      {/* Bottom Right Floating Card - Verified Experts */}
      <div
        className="absolute -bottom-6 -right-2 sm:right-4 z-20 p-4 rounded-2xl bg-white/95 border border-[#C5A869]/30 shadow-card flex items-center gap-3.5 animate-fade-in-right delay-600 backdrop-blur-xl max-w-[260px]"
      >
        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#C5A869]/40 shrink-0 shadow-xs">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
            alt="Priyadarshini Ramasamy"
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-1 text-[#B89748]">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold text-[#1C2024]">4.98</span>
            <span className="text-[10px] text-[#6B7280]">(500+ reviews)</span>
          </div>
          <p className="text-xs font-bold text-[#1C2024] mt-0.5 line-clamp-1">
            Priyadarshini (Couples Therapy)
          </p>
          <span className="text-[10px] text-[#4A6B5D] font-semibold">
            Certified Specialist
          </span>
        </div>
      </div>

      {/* Center Subtle Encryption Pill */}
      <div
        className="absolute bottom-4 left-6 z-20 px-3.5 py-1.5 rounded-full bg-white/90 border border-black/[0.08] shadow-sm backdrop-blur-md flex items-center gap-2 text-[11px] text-[#4B5563] font-medium animate-scale-in delay-800"
      >
        <Lock className="w-3.5 h-3.5 text-[#4A6B5D]" />
        <span>End-to-End Encrypted Sanctuary</span>
      </div>
    </>
  );
}
