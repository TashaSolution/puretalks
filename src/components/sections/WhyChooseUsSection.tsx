"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Badge } from "@/ui/Badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/animations/FadeIn";
import { Award, Clock, HeartHandshake, Sparkles, SmilePlus } from "lucide-react";

export function WhyChooseUsSection() {
  const reasons = [
    {
      icon: Award,
      title: "100% Verified Credentials",
      desc: "Every psychologist and counselor undergoes rigorous background vetting, degree authentication, and clinical ethics verification.",
    },
    {
      icon: HeartHandshake,
      title: "Empathetic Guidance",
      desc: "We understand family dynamics, career pressures, relationship intricacies, and modern life challenges without judgment.",
    },
    {
      icon: Clock,
      title: "Zero Waiting Rooms",
      desc: "Direct instant start at your exact scheduled slot. No waiting in clinic lobbies or awkward public spaces.",
    },
    {
      icon: SmilePlus,
      title: "Judgment-Free Sanctuary",
      desc: "Express personal thoughts, fears, marital difficulties, or burnout with unconditional positive regard.",
    },
  ];

  return (
    <section className="py-24 relative bg-[#F4EFEA]/80 border-t border-black/[0.06]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn>
            <Badge variant="gold" size="sm" className="mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[#8A6E2D]" />
              The PureTalks Distinction
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">
              Engineered for Complete Peace of Mind
            </h2>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={idx}>
                <Card glass hoverEffect className="p-7 h-full flex flex-col justify-between bg-white/90 border-black/[0.07] shadow-card rounded-2xl">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#C5A869]/15 border border-[#C5A869]/30 text-[#8A6E2D] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-serif font-bold text-[#1C2024] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] mt-2.5 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
