"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, Lock, Mic, Video, CheckCircle2, Calendar, Sparkles, ArrowRight, Shield } from "lucide-react";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";

interface SpecialistPreview {
  id: string;
  name: string;
  slug: string;
  title: string;
  credentials: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  experience: number;
  nextSlot: string;
  price: number;
  specialties: string[];
}

const featuredSpecialists: SpecialistPreview[] = [
  {
    id: "1",
    name: "Dr. K. Soundarapandian",
    slug: "dr-k-soundarapandian",
    title: "Senior Clinical Psychologist",
    credentials: "Ph.D. NIMHANS • 16+ Yrs Exp",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    rating: 4.97,
    reviewsCount: 380,
    experience: 16,
    nextSlot: "Today, 4:30 PM",
    price: 799,
    specialties: ["Anxiety & Panic", "Emotional Healing", "Somatic Therapy"],
  },
  {
    id: "2",
    name: "Priyadarshini Ramasamy",
    slug: "priyadarshini-ramasamy",
    title: "Licensed Relationship Counselor",
    credentials: "M.Phil Psychology • 12+ Yrs Exp",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    rating: 4.98,
    reviewsCount: 520,
    experience: 12,
    nextSlot: "Today, 6:00 PM",
    price: 699,
    specialties: ["Couples Therapy", "Conflict Resolution", "Pre-Marital"],
  },
];

export function HeroDoctorShowcase() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeMode, setActiveMode] = useState<"audio" | "video" | "anonymous">("anonymous");

  const currentDoctor = featuredSpecialists[selectedIdx] || featuredSpecialists[0];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#4A6B5D]/15 via-[#C5A869]/10 to-[#FAF8F5]/0 rounded-[2.5rem] blur-2xl pointer-events-none" />

      {/* Floating Trust Badge - Top Right */}
      <div
        className="absolute -top-4 -right-2 sm:right-2 z-20 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#C5A869]/30 shadow-card backdrop-blur-md flex items-center gap-1.5 text-xs font-semibold text-[#1C2024] animate-slide-in-badge delay-200"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
        <span>Verified Specialist</span>
      </div>

      {/* Main Showcase Card */}
      <div
        className="relative bg-white rounded-3xl border border-black/[0.08] shadow-card overflow-hidden animate-fade-in-up delay-100"
      >
        {/* Top Status Header */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#FAF8F5] border-b border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A6B5D] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4A6B5D]" />
            </span>
            <span className="text-xs font-bold text-[#1C2024]">Live Sanctuary • Available Now</span>
          </div>
          <Badge variant="sage" size="sm" className="font-semibold text-[11px] py-0.5">
            <Lock className="w-3 h-3 mr-1 text-[#4A6B5D]" />
            100% Confidential
          </Badge>
        </div>

        {/* Doctor Content Body */}
        <div className="p-5 sm:p-7 space-y-5">
          {/* Doctor Header & Avatar */}
          <div className="flex items-start gap-4 sm:gap-5">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-black/10 shadow-xs shrink-0 bg-[#F4EFEA]">
              <Image
                src={currentDoctor.avatar}
                alt={currentDoctor.name}
                fill
                priority
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#1C2024] tracking-tight">
                  {currentDoctor.name}
                </h3>
                <ShieldCheck className="w-4 h-4 text-[#4A6B5D] shrink-0" />
              </div>

              <p className="text-xs text-[#4A6B5D] font-semibold leading-snug">
                {currentDoctor.title}
              </p>

              <p className="text-[11px] text-[#6B7280]">
                {currentDoctor.credentials}
              </p>

              {/* Rating & Trust */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-1 bg-[#C5A869]/15 border border-[#C5A869]/30 px-2 py-0.5 rounded-md text-[#8A6E2D] text-xs font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{currentDoctor.rating}</span>
                </div>
                <span className="text-[11px] text-[#6B7280]">
                  ({currentDoctor.reviewsCount}+ verified sessions)
                </span>
              </div>
            </div>
          </div>

          {/* Specialties Pills */}
          <div className="flex flex-wrap gap-1.5">
            {currentDoctor.specialties.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-black/[0.06] text-[#4B5563] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Mode Selector (Audio vs Video vs Anonymous) */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px] text-[#6B7280] font-medium">
              <span>Select Consultation Format:</span>
              <span className="text-[#4A6B5D] font-semibold">Next: {currentDoctor.nextSlot}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveMode("anonymous")}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] border ${
                  activeMode === "anonymous"
                    ? "bg-[#4A6B5D] text-white border-[#4A6B5D] shadow-xs"
                    : "bg-[#FAF8F5] text-[#4B5563] border-black/[0.06] hover:bg-black/[0.03]"
                }`}
              >
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Anonymous</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode("audio")}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] border ${
                  activeMode === "audio"
                    ? "bg-[#4A6B5D] text-white border-[#4A6B5D] shadow-xs"
                    : "bg-[#FAF8F5] text-[#4B5563] border-black/[0.06] hover:bg-black/[0.03]"
                }`}
              >
                <Mic className="w-3.5 h-3.5 shrink-0" />
                <span>Voice Audio</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMode("video")}
                className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all min-h-[40px] border ${
                  activeMode === "video"
                    ? "bg-[#4A6B5D] text-white border-[#4A6B5D] shadow-xs"
                    : "bg-[#FAF8F5] text-[#4B5563] border-black/[0.06] hover:bg-black/[0.03]"
                }`}
              >
                <Video className="w-3.5 h-3.5 shrink-0" />
                <span>HD Video</span>
              </button>
            </div>
          </div>

          {/* Direct Booking CTA */}
          <div className="pt-2 flex items-center gap-3">
            <Link href={`/book?expert=${currentDoctor.slug}&mode=${activeMode}`} className="flex-1">
              <Button
                variant="primary"
                size="lg"
                className="w-full shadow-md shadow-[#4A6B5D]/20 font-bold justify-center"
                leftIcon={<Calendar className="w-4 h-4" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Book Session • ₹{currentDoctor.price}
              </Button>
            </Link>
            
            {/* Quick Switch Specialist Button */}
            <button
              type="button"
              onClick={() => setSelectedIdx((prev) => (prev + 1) % featuredSpecialists.length)}
              className="p-3 rounded-xl bg-[#FAF8F5] border border-black/[0.08] text-[#4B5563] hover:text-[#1C2024] hover:bg-[#F4EFEA] transition-colors text-xs font-semibold shrink-0"
              title="View next specialist"
              aria-label="Switch specialist"
            >
              Next Dr. ↻
            </button>
          </div>
        </div>

        {/* Bottom Trust & Privacy Bar */}
        <div className="px-5 sm:px-6 py-3 bg-[#FAF8F5] border-t border-black/[0.06] flex items-center justify-between text-[11px] text-[#6B7280]">
          <span className="flex items-center gap-1.5 text-[#3B5749] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B5D] shrink-0" />
            Peer-to-Peer Encrypted
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-[#8A6E2D] shrink-0" />
            Zero Recording Policy
          </span>
        </div>
      </div>
    </div>
  );
}

