"use client";

import React from "react";
import { useLanguage } from "@/locales/i18n-context";
import { Card } from "@/ui/Card";
import { Badge } from "@/ui/Badge";
import { FadeIn, StaggerContainer, StaggerItem } from "@/animations/FadeIn";
import { Lock, ShieldCheck, UserX, ServerOff } from "lucide-react";

export function PrivacyConfidentialitySection() {
  const { t } = useLanguage();

  const privacyPoints = [
    {
      icon: UserX,
      title: t.privacy.point1Title,
      desc: t.privacy.point1Desc,
      tag: "Anonymous",
    },
    {
      icon: ServerOff,
      title: t.privacy.point2Title,
      desc: t.privacy.point2Desc,
      tag: "Zero Storage",
    },
    {
      icon: ShieldCheck,
      title: t.privacy.point3Title,
      desc: t.privacy.point3Desc,
      tag: "Strict Ethics",
    },
    {
      icon: Lock,
      title: t.privacy.point4Title,
      desc: t.privacy.point4Desc,
      tag: "Browser Link",
    },
  ];

  return (
    <section className="py-24 relative bg-[#FAF8F5] overflow-hidden">
      {/* Subtle sage ambient aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4A6B5D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn>
            <Badge variant="sage" size="sm" className="mb-3 font-semibold">
              <Lock className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
              {t.privacy.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">
              {t.privacy.title}
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] mt-3 leading-relaxed">
              {t.privacy.subtitle}
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {privacyPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <StaggerItem key={index}>
                <Card
                  glass
                  hoverEffect
                  className="p-7 h-full flex flex-col justify-between bg-white/90 border-black/[0.07] shadow-card rounded-2xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#4A6B5D]/10 border border-[#4A6B5D]/20 text-[#4A6B5D] flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F4EFEA] text-[#3B5749] border border-[#E8DFC5]">
                        {point.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#1C2024] tracking-tight">
                      {point.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] mt-2.5 leading-relaxed font-normal">
                      {point.desc}
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
