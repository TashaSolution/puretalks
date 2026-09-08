"use client";

import React from "react";
import { ShieldCheck, Star, Users, Globe2 } from "lucide-react";
import { FadeIn } from "@/animations/FadeIn";

export function TrustStrip() {
  const trustStats = [
    {
      icon: ShieldCheck,
      stat: "100%",
      label: "Private & Confidential",
    },
    {
      icon: Star,
      stat: "4.96 / 5",
      label: "Client Trust Score",
    },
    {
      icon: Users,
      stat: "7,500+",
      label: "Sessions Completed",
    },
    {
      icon: Globe2,
      stat: "14+ Countries",
      label: "Global Reach",
    },
  ];

  return (
    <section className="relative py-10 bg-[#F4EFEA]/80 border-y border-black/[0.06]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {trustStats.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn key={index} delay={index * 0.08}>
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/60 border border-black/[0.04] shadow-xs">
                  <div className="w-11 h-11 rounded-xl bg-[#4A6B5D]/10 border border-[#4A6B5D]/20 text-[#4A6B5D] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-serif font-bold text-[#1C2024] tracking-tight">
                      {item.stat}
                    </div>
                    <div className="text-xs text-[#6B7280] font-medium">
                      {item.label}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
