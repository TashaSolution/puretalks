"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/locales/i18n-context";
import { Card } from "@/ui/Card";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { FadeIn } from "@/animations/FadeIn";
import { Globe2, Check, ArrowRight, ShieldCheck } from "lucide-react";

export function GlobalSanctuarySection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 relative bg-[#F4EFEA]/80 border-t border-black/[0.06] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <FadeIn className="lg:col-span-7 space-y-6">
            <Badge variant="gold" size="sm" className="font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#8A6E2D]" />
              {t.globalSanctuary.badge}
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight leading-tight">
              {t.globalSanctuary.title}
            </h2>

            <p className="text-base text-[#4B5563] leading-relaxed">
              {t.globalSanctuary.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white/80 border border-black/[0.06] shadow-xs">
                <div className="flex items-center gap-2 text-[#4A6B5D] font-bold text-sm">
                  <Check className="w-4 h-4" />
                  <span>{t.globalSanctuary.perk1Title}</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                  {t.globalSanctuary.perk1Desc}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-black/[0.06] shadow-xs">
                <div className="flex items-center gap-2 text-[#8A6E2D] font-bold text-sm">
                  <Check className="w-4 h-4" />
                  <span>{t.globalSanctuary.perk2Title}</span>
                </div>
                <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                  {t.globalSanctuary.perk2Desc}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/experts">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="font-semibold"
                >
                  Browse Verified Counselors
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* Right Global Reach Card */}
          <FadeIn delay={0.2} className="lg:col-span-5">
            <Card
              glass
              className="p-8 border-[#C5A869]/20 bg-white/90 shadow-card rounded-2xl relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#C5A869]/15 border border-[#C5A869]/30 text-[#8A6E2D] flex items-center justify-center mb-6">
                <Globe2 className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-serif font-bold text-[#1C2024] tracking-tight">
                {t.globalSanctuary.globalTitle}
              </h3>
              <p className="text-xs text-[#6B7280] mt-2 leading-relaxed font-normal">
                {t.globalSanctuary.globalDesc}
              </p>

              {/* Country Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "India",
                  "Singapore",
                  "United Arab Emirates",
                  "United Kingdom",
                  "United States",
                  "Canada",
                  "Australia",
                  "Malaysia",
                ].map((country, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-black/[0.08] text-[#4B5563] font-semibold"
                  >
                    {country}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4A6B5D] animate-ping" />
                <span className="text-xs text-[#3B5749] font-bold">
                  Timezone-aligned flexible scheduling
                </span>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
