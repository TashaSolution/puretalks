"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/locales/i18n-context";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { ArrowRight, Lock, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { HeroSanctuaryArtwork3D } from "@/components/hero/HeroSanctuaryArtwork3D";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-32 sm:pt-36 pb-24 overflow-hidden bg-mesh-glow text-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#4A6B5D]/6 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-[#C5A869]/8 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Seamless 3D Sanctuary Artwork above the text */}
          <HeroSanctuaryArtwork3D />

          {/* Trust Pill */}
          <div className="inline-flex items-center justify-center">
            <Badge
              variant="sage"
              size="md"
              className="px-4 py-1.5 rounded-full border-[#4A6B5D]/25 bg-white/85 text-[#3B5749] shadow-soft backdrop-blur-md font-semibold"
            >
              <Lock className="w-3.5 h-3.5 mr-2 text-[#4A6B5D]" />
              <span>{t.hero.badge}</span>
            </Badge>
          </div>

          {/* Main Headline with Playfair Serif Typography */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#1C2024] leading-[1.14]">
            {t.hero.headlinePart1}{" "}
            <span className="italic text-[#4A6B5D] underline decoration-[#C5A869]/40 underline-offset-8">
              {t.hero.headlineHighlight}
            </span>{" "}
            {t.hero.headlinePart2}
          </h1>

          {/* Subheadline with large airy whitespace */}
          <p className="text-base sm:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed font-normal">
            {t.hero.subheadline}
          </p>

          {/* Centered CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/experts" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="xl"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-md shadow-[#4A6B5D]/20 font-bold px-8"
              >
                {t.hero.ctaPrimary}
              </Button>
            </Link>
            <Link href="/how-it-works" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="xl"
                className="w-full sm:w-auto font-medium px-8"
              >
                {t.hero.ctaSecondary}
              </Button>
            </Link>
          </div>

          {/* Trust Points */}
          <div className="pt-8 border-t border-black/[0.07] flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-[#4B5563]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4A6B5D] shrink-0" />
              <span>100% Anonymous Audio Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4A6B5D] shrink-0" />
              <span>Zero App Download</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#8A6E2D] shrink-0" />
              <span>Verified Specialists</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4A6B5D] shrink-0" />
              <span>Peer-to-Peer Encrypted</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
