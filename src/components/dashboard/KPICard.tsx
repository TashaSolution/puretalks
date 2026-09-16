"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import {
  Calendar,
  IndianRupee,
  Star,
  TrendingUp,
  TrendingDown,
  Users,
} from "lucide-react";
import { DashboardKPI } from "@/types/dashboard";

const iconMap: Record<string, React.ElementType> = {
  calendar: Calendar,
  "indian-rupee": IndianRupee,
  star: Star,
  "trending-up": TrendingUp,
  users: Users,
};

interface KPICardProps {
  data: DashboardKPI;
}

export function KPICard({ data }: KPICardProps) {
  const Icon = iconMap[data.icon] || TrendingUp;
  const isPositive = data.change >= 0;

  return (
    <Card glass className="p-4 sm:p-6 border-black/[0.07] bg-white shadow-card rounded-2xl">
      <div className="flex items-start justify-between">
        <div className="space-y-2 sm:space-y-3">
          <p className="text-[10px] sm:text-xs font-medium text-[#6B7280] uppercase tracking-wider">
            {data.label}
          </p>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1C2024] tracking-tight">
            {data.value}
          </p>
          <div className="flex items-center gap-1.5">
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-red-500" />
            )}
            <span
              className={`text-xs font-semibold ${
                isPositive ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {isPositive ? "+" : ""}
              {data.change}%
            </span>
            <span className="text-xs text-[#9CA3AF]">{data.changeLabel}</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-[#4A6B5D]/10 text-[#4A6B5D] flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
}
