"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, Lock, Mic, Video, CheckCircle2, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";

export function HeroDoctorShowcase() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Background Soft Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#4A6B5D]/10 via-[#C5A869]/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />

      {/* Main Luxury Doctor Showcase Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white rounded-3xl border border-black/[0.08] shadow-card overflow-hidden"
      >
        {/* Top Header Badge */}
        <div className="px-6 py-4 bg-[#FAF8F5] border-b border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4A6B5D] animate-pulse" />
            <span className="text-xs font-bold text-[#1C2024]">Available for Online Session</span>
          </div>
          <Badge variant="sage" size="sm" className="font-semibold text-[11px]">
            <Lock className="w-3 h-3 mr-1 text-[#4A6B5D]" />
            100% Confidential
          </Badge>
        </div>

        {/* Doctor Photo & Details */}
        <div className="p-6 sm:p-7 space-y-6">
          <div className="flex items-start gap-5">
            {/* High Quality Doctor Portrait */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-black/10 shadow-sm shrink-0 bg-[#F4EFEA]">
              <Image
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"
                alt="Dr. K. Soundarapandian - Senior Clinical Psychologist"
                fill
                priority
                sizes="150px"
                className="object-cover"
              />
            </div>

            {/* Doctor Info */}
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg font-serif font-bold text-[#1C2024] tracking-tight">
                  Dr. K. Soundarapandian
                </h3>
                <ShieldCheck className="w-4 h-4 text-[#4A6B5D] shrink-0" />
              </div>

              <p className="text-xs text-[#4A6B5D] font-semibold">
                Senior Clinical Psychologist & Mind-Body Therapist
              </p>

              <p className="text-[11px] text-[#6B7280] font-medium">
                Ph.D. NIMHANS • 16+ Years Experience
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-1 bg-[#C5A869]/15 border border-[#C5A869]/30 px-2 py-0.5 rounded-md text-[#8A6E2D] text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>4.97</span>
                </div>
                <span className="text-[11px] text-[#6B7280]">
                  (380+ Verified Sessions)
                </span>
              </div>
            </div>
          </div>

          {/* Specialization Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              "Emotional Healing",
              "Anxiety & Stress",
              "Somatic Mindfulness",
              "Panic Recovery",
            ].map((tag, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-black/[0.06] text-[#4B5563] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Supported Session Modes Strip */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-black/[0.06] flex items-center justify-between text-xs">
            <div className="flex items-center gap-3 text-[#1C2024] font-medium">
              <span className="flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-[#4A6B5D]" />
                Audio
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Video className="w-4 h-4 text-[#3B82F6]" />
                Video
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#8A6E2D]">
                <Lock className="w-3.5 h-3.5" />
                Anonymous
              </span>
            </div>
            <span className="text-xs font-bold text-[#4A6B5D]">Next: 4:30 PM</span>
          </div>

          {/* Quick Book Button */}
          <Link href="/book?expert=dr-k-soundarapandian" className="block w-full">
            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-md shadow-[#4A6B5D]/20 font-bold"
              leftIcon={<Calendar className="w-4 h-4" />}
            >
              Book Private Consultation
            </Button>
          </Link>
        </div>

        {/* Bottom Trust Micro-bar */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-t border-black/[0.06] flex items-center justify-between text-[11px] text-[#6B7280]">
          <span className="flex items-center gap-1 text-[#3B5749] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B5D]" />
            Peer-to-Peer Encrypted
          </span>
          <span>Zero Recording Guarantee</span>
        </div>
      </motion.div>
    </div>
  );
}
