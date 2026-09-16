"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ScheduleGridProps {
  slots: {
    id: string;
    day: string;
    dayIndex: number;
    startTime: string;
    endTime: string;
    available: boolean;
  }[];
  onToggle: (id: string) => void;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export function ScheduleGrid({ slots, onToggle }: ScheduleGridProps) {
  const getSlot = (day: string, time: string) =>
    slots.find((s) => s.day === day && s.startTime === time);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            <th className="py-3 px-3 text-left">
              <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                Time
              </span>
            </th>
            {days.map((day) => (
              <th key={day} className="py-3 px-3 text-center">
                <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  {day}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time} className="border-t border-black/[0.04]">
              <td className="py-3 px-3">
                <span className="text-xs text-[#6B7280] font-medium">{time}</span>
              </td>
              {days.map((day) => {
                const slot = getSlot(day, time);
                if (!slot) return <td key={day} className="py-3 px-3" />;
                return (
                  <td key={day} className="py-3 px-3 text-center">
                    <button
                      onClick={() => onToggle(slot.id)}
                      className={cn(
                        "w-12 h-7 rounded-full transition-all duration-200 relative",
                        slot.available
                          ? "bg-[#4A6B5D]"
                          : "bg-[#E5E7EB]"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                          slot.available ? "translate-x-[22px]" : "translate-x-1"
                        )}
                      />
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
