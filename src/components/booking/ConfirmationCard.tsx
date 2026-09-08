"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import { BookingConfirmation } from "@/types/booking";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import {
  CheckCircle2,
  ShieldCheck,
  Copy,
  ExternalLink,
  Home,
} from "lucide-react";

interface Props {
  confirmation: BookingConfirmation;
}

export function ConfirmationCard({ confirmation }: Props) {
  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#4A6B5D", "#C5A869", "#3B82F6", "#F4EFEA"],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(confirmation.meetingLink);
    alert("Encrypted room link copied to clipboard!");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in zoom-in-95 duration-500">
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-[#4A6B5D]/10 text-[#4A6B5D] border border-[#4A6B5D]/30 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C2024] tracking-tight">
          Your Sanctuary Is Reserved!
        </h2>
        <p className="text-sm text-[#6B7280]">
          Booking ID: <span className="font-mono text-[#4A6B5D] font-bold">{confirmation.bookingId}</span>
        </p>
      </div>

      {/* Confirmation Card Details */}
      <Card glass className="p-8 sm:p-10 border-black/[0.08] bg-white shadow-card rounded-2xl space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-black/[0.07]">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-black/10 shrink-0 bg-[#F4EFEA]">
            <Image
              src={confirmation.consultantAvatar}
              alt={confirmation.consultantName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-base font-serif font-bold text-[#1C2024]">
              {confirmation.consultantName}
            </h3>
            <p className="text-xs text-[#4A6B5D] font-semibold">
              {confirmation.consultantTitle}
            </p>
            <p className="text-[11px] text-[#6B7280] mt-0.5">
              {confirmation.categoryTitle} • {confirmation.durationMinutes} mins
            </p>
          </div>
        </div>

        {/* Meeting Credentials Box */}
        <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#4A6B5D]/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#3B5749] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#4A6B5D]" />
              End-to-End Encrypted Room
            </span>
            <span className="text-[11px] text-[#6B7280] font-medium">
              Passcode: <span className="font-mono text-[#1C2024] font-bold">{confirmation.passcode}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              readOnly
              value={confirmation.meetingLink}
              className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2 text-xs text-[#1C2024] font-mono select-all shadow-xs"
            />
            <button
              onClick={copyLink}
              className="p-2.5 rounded-xl bg-white hover:bg-[#F4EFEA] text-[#1C2024] border border-black/10 transition-colors shadow-xs"
              title="Copy Link"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-[#6B7280]">
            Link and calendar invite sent to your Email & WhatsApp. Join 2 minutes before your scheduled start time.
          </p>
        </div>

        {/* Key Times */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/[0.06]">
            <span className="text-[#6B7280] block text-[11px] font-medium">Scheduled Date</span>
            <span className="font-serif font-bold text-[#1C2024] text-base mt-0.5 block">{confirmation.scheduledAt}</span>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/[0.06]">
            <span className="text-[#6B7280] block text-[11px] font-medium">Time Slot</span>
            <span className="font-serif font-bold text-[#4A6B5D] text-base mt-0.5 block">{confirmation.timeSlot}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <a
            href={confirmation.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1"
          >
            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-md shadow-[#4A6B5D]/20 font-bold"
              rightIcon={<ExternalLink className="w-4 h-4" />}
            >
              Open Private Room
            </Button>
          </a>

          <Link href="/" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full font-medium" leftIcon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
