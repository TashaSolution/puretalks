"use client";

import React from "react";
import { ConsultationMode } from "@/types/booking";
import { Mic, Video, UserX, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  selectedMode: ConsultationMode;
  onSelectMode: (mode: ConsultationMode) => void;
}

export function ConsultationModeSelector({
  selectedMode,
  onSelectMode,
}: Props) {
  const modes: { id: ConsultationMode; title: string; desc: string; icon: any; tag?: string }[] = [
    {
      id: "audio",
      title: "Private Audio Call",
      desc: "High-definition voice call. Camera is disabled by default for relaxed, pressure-free dialogue.",
      icon: Mic,
      tag: "Popular",
    },
    {
      id: "video",
      title: "1-on-1 Video Session",
      desc: "Encrypted face-to-face video consultation in a secure private room.",
      icon: Video,
    },
    {
      id: "anonymous",
      title: "Anonymous Stealth Mode",
      desc: "Use any alias. No camera. Complete confidentiality and privacy guaranteed.",
      icon: UserX,
      tag: "100% Private",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-[#1C2024]">
          Choose Consultation Mode
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {modes.map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMode === m.id;
            return (
              <div
                key={m.id}
                onClick={() => onSelectMode(m.id)}
                className={cn(
                  "p-5 rounded-2xl cursor-pointer transition-all border text-left relative flex flex-col justify-between",
                  isSelected
                    ? "bg-[#4A6B5D]/8 border-[#4A6B5D] ring-2 ring-[#4A6B5D]/20 shadow-sm"
                    : "bg-[#FAF8F5] border-black/10 hover:border-black/20 hover:bg-white"
                )}
              >
                {m.tag && (
                  <span className="absolute top-3 right-3 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-[#4A6B5D]/10 text-[#3B5749] border border-[#4A6B5D]/20">
                    {m.tag}
                  </span>
                )}
                <div>
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
                      isSelected
                        ? "bg-[#4A6B5D] text-white"
                        : "bg-white border border-black/10 text-[#6B7280]"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#1C2024]">{m.title}</h4>
                  <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed font-normal">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? "text-[#4A6B5D]" : "text-[#9CA3AF]"}>
                    {isSelected ? "Selected" : "Select"}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-[#4A6B5D]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
