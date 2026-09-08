"use client";

import React from "react";
import { TimeSlot } from "@/types/booking";
import { Clock, Sun, Moon, Sunrise, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  slots: TimeSlot[];
  selectedSlot: string;
  onSelectSlot: (slotTime: string) => void;
}

export function TimeSlotSelector({ slots, selectedSlot, onSelectSlot }: Props) {
  const morningSlots = slots.filter((s) => s.period === "morning");
  const afternoonSlots = slots.filter((s) => s.period === "afternoon");
  const eveningSlots = slots.filter((s) => s.period === "evening" || s.period === "night");

  const renderSlotGroup = (
    title: string,
    icon: React.ReactNode,
    items: TimeSlot[]
  ) => {
    if (items.length === 0) return null;

    return (
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C2024]">
          {icon}
          <span>{title}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {items.map((slot) => {
            const isSelected = selectedSlot === slot.time;
            return (
              <button
                key={slot.id}
                type="button"
                disabled={!slot.available}
                onClick={() => onSelectSlot(slot.time)}
                className={cn(
                  "py-3 px-4 rounded-xl text-xs font-bold transition-all border flex items-center justify-between disabled:opacity-30 disabled:cursor-not-allowed",
                  isSelected
                    ? "bg-[#4A6B5D] text-white border-[#3B5749] shadow-sm"
                    : "bg-white border-black/10 hover:border-black/20 text-[#1C2024] hover:bg-[#FAF8F5]"
                )}
              >
                <span>{slot.time}</span>
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5 pt-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold text-[#1C2024] flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#4A6B5D]" />
          <span>Select Available Time Slot</span>
        </label>
        <span className="text-[11px] text-[#4A6B5D] font-bold">All Slots in Local Time</span>
      </div>

      <div className="space-y-4 p-6 rounded-2xl bg-[#FAF8F5] border border-black/[0.07]">
        {renderSlotGroup(
          "Morning Slots",
          <Sunrise className="w-4 h-4 text-[#C5A869]" />,
          morningSlots
        )}
        {renderSlotGroup(
          "Afternoon Slots",
          <Sun className="w-4 h-4 text-[#D97706]" />,
          afternoonSlots
        )}
        {renderSlotGroup(
          "Evening & Night Slots",
          <Moon className="w-4 h-4 text-[#4A6B5D]" />,
          eveningSlots
        )}
      </div>
    </div>
  );
}
