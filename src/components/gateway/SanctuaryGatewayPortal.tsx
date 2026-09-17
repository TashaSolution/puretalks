"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Sparkles, ArrowRight, Compass, ShieldCheck, HeartHandshake, Headphones, UserCheck } from "lucide-react";

const SanctuaryGatewayCanvas = dynamic(
  () => import("@/components/3d/SanctuaryGatewayCanvas").then((mod) => mod.SanctuaryGatewayCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-[#0D1117] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/80">
          <div className="w-6 h-6 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold tracking-wide">Loading 3D Mind Sanctuary...</span>
        </div>
      </div>
    ),
  }
);

interface Props {
  onEnterDashboard: () => void;
}

export function SanctuaryGatewayPortal({ onEnterDashboard }: Props) {
  return (
    <div className="relative w-full h-screen bg-[#0D1117] text-white overflow-hidden select-none">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-10">
        <SanctuaryGatewayCanvas onEnterDashboard={onEnterDashboard} />
      </div>

      {/* Top Navigation Bar Overlay */}
      <header className="absolute top-0 left-0 right-0 z-30 px-6 sm:px-10 py-5 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-[#0D1117]/90 via-[#0D1117]/40 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3B5749] to-[#C5A869] flex items-center justify-center shadow-lg shadow-black/40">
            <HeartHandshake className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-serif font-bold tracking-tight text-white">PureTalks</span>
            <span className="text-[10px] block tracking-widest text-[#34D399] uppercase font-semibold">Sanctuary</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onEnterDashboard}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all backdrop-blur-md"
          >
            <span>Skip 3D Intro</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#34D399]" />
          </button>
        </div>
      </header>

      {/* Floating Glassmorphic Card on the Left */}
      <div className="absolute top-24 sm:top-28 left-4 sm:left-10 z-20 max-w-[460px] pointer-events-auto">
        <div
          className="p-7 sm:p-8 rounded-3xl bg-black/50 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80 space-y-5 animate-fade-in-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E11D48]/20 border border-[#E11D48]/40 text-[#FDA4AF] text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#FB7185] animate-pulse" />
            <span>Highly Empathic Sanctuary</span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold text-white leading-[1.2] tracking-tight">
            A Safe Space Where You Are <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F43F5E] via-[#FBBF24] to-[#34D399]">
              Truly Heard & Understood.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
            Step inside our 100% confidential consultation sanctuary. Connect 1-on-1 with certified empathic psychologists, relationship mentors, and clarity experts.
          </p>

          {/* Quick Feature Pillars */}
          <div className="grid grid-cols-2 gap-2.5 pt-1 text-[11px] text-gray-300">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#34D399] shrink-0" />
              <span>100% Encrypted</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
              <Headphones className="w-4 h-4 text-[#FBBF24] shrink-0" />
              <span>Anonymous Audio</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
              <UserCheck className="w-4 h-4 text-[#60A5FA] shrink-0" />
              <span>Licensed Experts</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10">
              <HeartHandshake className="w-4 h-4 text-[#FB7185] shrink-0" />
              <span>Zero Judgement</span>
            </div>
          </div>

          {/* Enter Dashboard Button */}
          <div className="pt-3">
            <button
              onClick={onEnterDashboard}
              className="w-full flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] hover:from-[#34D399] hover:to-[#10B981] text-white font-bold text-base tracking-wide transition-all duration-300 shadow-xl shadow-[#10B981]/30 hover:shadow-[#10B981]/50 hover:scale-[1.02] active:scale-[0.98] group"
            >
              <span>Enter Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Interaction Tip Pill in Center Bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-gray-300 shadow-lg">
        <Compass className="w-3.5 h-3.5 text-[#34D399] animate-spin-slow" />
        <span>Drag to explore 3D space • Click glowing nodes or Enter Dashboard to proceed</span>
      </div>
    </div>
  );
}
