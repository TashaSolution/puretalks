"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/locales/i18n-context";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { ArrowRight, Lock, CheckCircle2, ShieldCheck, Sparkles, Shield, Users, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroDoctorShowcase } from "@/components/hero/HeroDoctorShowcase";

export function HeroSection() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 overflow-hidden bg-mesh-glow">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4A6B5D]/8 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Core Value Proposition & CTAs */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-7 text-left"
          >
            {/* Trust Pill */}
            <div className="inline-flex items-center">
              <Badge
                variant="sage"
                size="md"
                className="px-3.5 py-1.5 rounded-full border-[#4A6B5D]/25 bg-white/90 text-[#3B5749] shadow-soft backdrop-blur-md font-semibold text-xs"
              >
                <Lock className="w-3.5 h-3.5 mr-2 text-[#4A6B5D]" />
                <span>100% Confidential • Anonymous Audio Available</span>
              </Badge>
            </div>

            {/* Main Headline with Editorial Playfair Serif */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#1C2024] leading-[1.12]">
              {t.hero.headlinePart1}{" "}
              <span className="italic text-[#4A6B5D] underline decoration-[#C5A869]/40 underline-offset-8">
                {t.hero.headlineHighlight}
              </span>{" "}
              {t.hero.headlinePart2}
            </h1>

            {/* Subheadline with high legibility */}
            <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl leading-relaxed font-normal">
              {t.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link href="/experts" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="xl"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto shadow-md shadow-[#4A6B5D]/20 font-bold px-8 justify-center"
                >
                  {t.hero.ctaPrimary}
                </Button>
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="xl"
                  className="w-full sm:w-auto font-medium px-7 justify-center bg-white/80 border-black/[0.08]"
                >
                  {t.hero.ctaSecondary}
                </Button>
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-black/[0.07] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-[#4B5563]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4A6B5D] shrink-0" />
                <span>Anonymous Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4A6B5D] shrink-0" />
                <span>Zero Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8A6E2D] shrink-0" />
                <span>Verified Doctors</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#4A6B5D] shrink-0" />
                <span>P2P Encrypted</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Live Doctor & Session Interactive Showcase */}
          <div className="lg:col-span-5 w-full">
            <HeroDoctorShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}

