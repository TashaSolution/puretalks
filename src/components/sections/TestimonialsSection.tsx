"use client";

import React from "react";
import Image from "next/image";
import { testimonialsData } from "@/data/testimonials";
import { Card } from "@/ui/Card";
import { Badge } from "@/ui/Badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/animations/FadeIn";
import { Star, Quote, MessageSquareHeart } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-24 relative bg-[#FAF8F5] border-t border-black/[0.06] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#4A6B5D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn>
            <Badge variant="sage" size="sm" className="mb-3 font-semibold">
              <MessageSquareHeart className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
              Client Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">
              Real Stories of Healing & Clarity
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] mt-3">
              Discover how confidential consultations helped clients worldwide regain clarity and peace of mind.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((item) => (
            <StaggerItem key={item.id}>
              <Card
                glass
                hoverEffect
                className="p-7 h-full flex flex-col justify-between bg-white/95 border-black/[0.07] shadow-card rounded-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#B89748]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-[#4A6B5D]/30" />
                  </div>

                  <p className="text-xs text-[#4B5563] leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center gap-3.5">
                  {item.avatar && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black/10 shrink-0 shadow-xs">
                      <Image
                        src={item.avatar}
                        alt={item.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#1C2024] truncate">
                      {item.author}
                    </h4>
                    <p className="text-[11px] text-[#4A6B5D] font-semibold">
                      {item.authorLocation}
                    </p>
                    <p className="text-[10px] text-[#9CA3AF] truncate mt-0.5">
                      {item.consultantName}
                    </p>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
