"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/locales/i18n-context";
import { Card } from "@/ui/Card";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/animations/FadeIn";
import { Search, CalendarCheck, ShieldAlert, Sparkles, ArrowRight, Video } from "lucide-react";

export function HowItWorksSection() {
  const { t } = useLanguage();

  const steps = [
    {
      num: "01",
      icon: Search,
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
    },
    {
      num: "02",
      icon: CalendarCheck,
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
    },
    {
      num: "03",
      icon: ShieldAlert,
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
    },
    {
      num: "04",
      icon: Video,
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
    },
  ];

  return (
    <section className="py-24 relative bg-[#FAF8F5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn>
            <Badge variant="sage" size="sm" className="mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
              Seamless Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">
              {t.howItWorks.title}
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] mt-3 leading-relaxed">
              {t.howItWorks.subtitle}
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={idx}>
                <Card
                  glass
                  hoverEffect
                  className="p-7 h-full flex flex-col justify-between bg-white/90 border-black/[0.07] shadow-card rounded-2xl relative group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-serif font-bold text-[#1C2024]/20 group-hover:text-[#4A6B5D]/40 transition-colors">
                        {step.num}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-[#4A6B5D]/10 border border-[#4A6B5D]/20 text-[#4A6B5D] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-base font-serif font-bold text-[#1C2024] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] mt-2.5 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn delay={0.3} className="text-center mt-12">
          <Link href="/book">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="font-semibold shadow-md shadow-[#4A6B5D]/20"
            >
              Get Started Now
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
