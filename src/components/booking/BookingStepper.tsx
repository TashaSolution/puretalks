"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  currentStep: number;
  steps: string[];
}

export function BookingStepper({ currentStep, steps }: Props) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Progress connecting line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] bg-black/[0.08] -z-0" />
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] bg-[#4A6B5D] transition-all duration-500 -z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={idx} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 border-2",
                  isCompleted && "bg-[#4A6B5D] border-[#3B5749] text-white shadow-md",
                  isCurrent && "bg-white border-[#4A6B5D] text-[#4A6B5D] ring-4 ring-[#4A6B5D]/20 scale-110 shadow-sm",
                  !isCompleted && !isCurrent && "bg-[#F4EFEA] border-black/15 text-[#9CA3AF]"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : stepNum}
              </div>
              <span
                className={cn(
                  "text-[10px] mt-2 hidden sm:block font-semibold text-center max-w-[80px]",
                  isCurrent ? "text-[#4A6B5D] font-bold" : "text-[#6B7280]"
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
