"use client";

import React from "react";
import { DayAvailability } from "@/types/booking";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  days: DayAvailability[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export function DatePicker({ days, selectedDate, onSelectDate }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-bold text-[#1C2024] flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#4A6B5D]" />
          <span>Select Consultation Date</span>
        </label>
        <span className="text-xs text-[#6B7280] font-medium">Next 7 Days Available</span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2.5">
        {days.map((day) => {
          const isSelected = selectedDate === day.date;
          return (
            <button
              key={day.date}
              type="button"
              disabled={!day.isAvailable}
              onClick={() => onSelectDate(day.date)}
              className={cn(
                "p-3 rounded-2xl flex flex-col items-center justify-center transition-all border text-center group disabled:opacity-30 disabled:cursor-not-allowed",
                isSelected
                  ? "bg-[#4A6B5D] text-white border-[#3B5749] shadow-md scale-105"
                  : "bg-[#FAF8F5] border-black/10 hover:border-[#4A6B5D]/50 hover:bg-white text-[#1C2024]"
              )}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider block opacity-70">
                {day.dayName}
              </span>
              <span className="text-xl font-serif font-bold my-1 block">{day.dayNumber}</span>
              <span className="text-[10px] block opacity-70">{day.monthName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
