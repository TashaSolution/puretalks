import React from "react";
import { Badge } from "@/ui/Badge";
import { Card } from "@/ui/Card";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ShieldCheck, Video, Mic } from "lucide-react";

export const metadata = {
  title: "How It Works — PureTalks",
  description: "Learn how easy and private it is to book and attend consultations on PureTalks.",
};

export default function HowItWorksPage() {
  return (
    <div className="pt-20">
      <HowItWorksSection />

      {/* Consultation Modes Detailed */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="sage" size="sm" className="mb-2 font-semibold">
            Your Comfort First
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">
            Three Flexible Ways to Connect
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card glass className="p-8 sm:p-10 border-black/[0.07] bg-white shadow-card rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#4A6B5D]/10 text-[#4A6B5D] flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#1C2024]">Private Voice Call</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
              Crystal clear audio call directly inside your browser. No video, no pressure. Ideal for quick check-ins and relaxed emotional processing.
            </p>
          </Card>

          <Card glass className="p-8 sm:p-10 border-black/[0.07] bg-white shadow-card rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#1C2024]">1-on-1 Video Session</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
              High-definition face-to-face video consultation. Recommended for couples therapy, marriage alignment, and executive interview mentoring.
            </p>
          </Card>

          <Card glass className="p-8 sm:p-10 border-black/[0.07] bg-white shadow-card rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C5A869]/15 text-[#8A6E2D] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#1C2024]">Anonymous Stealth Mode</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
              Complete anonymity. Join with an alias name, camera disabled, and zero identifiable digital footprints.
            </p>
          </Card>
        </div>
      </div>

      <FAQSection />
    </div>
  );
}
