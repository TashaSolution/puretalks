"use client";

import React, { useState } from "react";
import { faqsData } from "@/data/faqs";
import { Card } from "@/ui/Card";
import { Badge } from "@/ui/Badge";
import { FadeIn } from "@/animations/FadeIn";
import { HelpCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 relative bg-[#F4EFEA]/70 border-t border-black/[0.06]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn>
            <Badge variant="sage" size="sm" className="mb-3 font-semibold">
              <HelpCircle className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
              Frequently Asked
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">
              Questions You Might Have
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] mt-3">
              Everything you need to know about privacy, anonymous sessions, and booking procedures.
            </p>
          </FadeIn>
        </div>

        <div className="max-w-3xl mx-auto space-y-3.5">
          {faqsData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <FadeIn key={faq.id} delay={idx * 0.05}>
                <Card
                  glass
                  className="bg-white/95 border-black/[0.07] shadow-sm overflow-hidden transition-all duration-200 rounded-2xl"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 group"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#1C2024] group-hover:text-[#4A6B5D] transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-[#9CA3AF] shrink-0 transition-transform duration-300",
                        isOpen && "rotate-180 text-[#4A6B5D]"
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#4B5563] leading-relaxed border-t border-black/[0.04]">
                      {faq.answerNode || faq.answer}
                    </div>
                  )}
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
