"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { Sparkles, ShieldCheck } from "lucide-react";

// Dynamic import for 3D canvas to guarantee safe hydration
const HeroScene = dynamic(
  () => import("./HeroScene").then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-28 h-28 rounded-full border border-[#4A6B5D]/20 animate-pulse-subtle bg-[#4A6B5D]/5 flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-[#4A6B5D]/40 animate-pulse" />
        </div>
      </div>
    ),
  }
);

export function SceneContainer() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (reducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="p-8 rounded-3xl bg-white/80 border border-[#4A6B5D]/20 shadow-card text-center backdrop-blur-md max-w-xs">
          <Sparkles className="w-8 h-8 text-[#4A6B5D] mx-auto mb-3" />
          <h3 className="font-serif font-bold text-lg text-[#1C2024]">Private Sanctuary</h3>
          <p className="text-xs text-[#6B7280] mt-1">100% Confidential Consultations</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </div>
  );
}
