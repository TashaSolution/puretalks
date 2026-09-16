"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatTrendProps {
  value: number;
  label?: string;
  size?: "sm" | "md";
}

export function StatTrend({ value, label, size = "sm" }: StatTrendProps) {
  const isPositive = value >= 0;

  return (
    <div className="flex items-center gap-1">
      {isPositive ? (
        <TrendingUp
          className={cn(
            "text-emerald-500",
            size === "sm" ? "w-3 h-3" : "w-4 h-4"
          )}
        />
      ) : (
        <TrendingDown
          className={cn(
            "text-red-500",
            size === "sm" ? "w-3 h-3" : "w-4 h-4"
          )}
        />
      )}
      <span
        className={cn(
          "font-semibold",
          isPositive ? "text-emerald-600" : "text-red-500",
          size === "sm" ? "text-xs" : "text-sm"
        )}
      >
        {isPositive ? "+" : ""}
        {value}%
      </span>
      {label && (
        <span className="text-xs text-[#9CA3AF]">{label}</span>
      )}
    </div>
  );
}
