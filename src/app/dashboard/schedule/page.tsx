"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ScheduleGrid } from "@/components/dashboard/ScheduleGrid";
import { mockSchedule } from "@/data/dashboard/mock-schedule";
import { Button } from "@/components/ui/Button";
import { Save, RotateCcw } from "lucide-react";

export default function SchedulePage() {
  const [slots, setSlots] = useState(mockSchedule);

  const handleToggle = (id: string) => {
    setSlots((prev) =>
      prev.map((slot) =>
        slot.id === id ? { ...slot, available: !slot.available } : slot
      )
    );
  };

  const availableCount = slots.filter((s) => s.available).length;
  const totalSlots = slots.length;

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <DashboardHeader
        title="Schedule"
        subtitle="Manage your weekly availability"
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Summary */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs text-[#6B7280]">Available Slots</p>
              <p className="text-2xl font-serif font-bold text-[#1C2024]">
                {availableCount}{" "}
                <span className="text-sm font-normal text-[#9CA3AF]">
                  / {totalSlots}
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6B7280]">Weekly Hours</p>
              <p className="text-2xl font-serif font-bold text-[#1C2024]">
                {availableCount}h
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={() => setSlots(mockSchedule)}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Save className="w-3.5 h-3.5" />}
            >
              Save Schedule
            </Button>
          </div>
        </div>

        {/* Schedule Grid */}
        <Card
          glass
          className="p-4 sm:p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
        >
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
              Weekly Availability
            </CardTitle>
            <p className="text-xs text-[#9CA3AF] mt-1">
              Toggle slots on/off to set your available hours
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <ScheduleGrid slots={slots} onToggle={handleToggle} />
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-4 rounded-full bg-[#4A6B5D] relative">
              <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-white" />
            </div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-4 rounded-full bg-[#E5E7EB] relative">
              <span className="absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white" />
            </div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
