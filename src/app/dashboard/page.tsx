"use client";

import React from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { doctorKPIs } from "@/data/dashboard/mock-stats";
import { dailyRevenue } from "@/data/dashboard/mock-revenue";
import { mockBookings } from "@/data/dashboard/mock-bookings";
import { Video, Mic, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";

const modeIcons: Record<string, React.ElementType> = {
  video: Video,
  audio: Mic,
  anonymous: EyeOff,
};

export default function DoctorDashboardPage() {
  const upcomingBookings = mockBookings
    .filter((b) => b.status === "confirmed" || b.status === "pending")
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <DashboardHeader
        title="Welcome back, Dr. Soundarapandian"
        subtitle="Here's what's happening with your practice"
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {doctorKPIs.map((kpi) => (
            <KPICard key={kpi.label} data={kpi} />
          ))}
        </div>

        {/* Revenue Chart + Upcoming Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Revenue Chart */}
          <Card
            glass
            className="lg:col-span-2 p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
                  Revenue Overview
                </CardTitle>
                <Link
                  href="/dashboard/revenue"
                  className="text-xs text-[#4A6B5D] font-medium flex items-center gap-1 hover:underline"
                >
                  View details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <RevenueChart data={dailyRevenue} height={260} />
            </CardContent>
          </Card>

          {/* Upcoming Bookings */}
          <Card
            glass
            className="p-4 sm:p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
                  Upcoming Sessions
                </CardTitle>
                <Link
                  href="/dashboard/bookings"
                  className="text-xs text-[#4A6B5D] font-medium flex items-center gap-1 hover:underline"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              {upcomingBookings.map((booking) => {
                const ModeIcon = modeIcons[booking.mode];
                return (
                  <div
                    key={booking.id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAF8F5] transition-colors"
                  >
                    <Avatar
                      alt={booking.clientName}
                      fallback={booking.clientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1C2024] truncate">
                        {booking.clientName}
                      </p>
                      <p className="text-[10px] text-[#9CA3AF]">
                        {booking.date} · {booking.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ModeIcon className="w-3 h-3 text-[#6B7280]" />
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "emerald"
                            : "gold"
                        }
                        size="sm"
                      >
                        {booking.duration}m
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <Card
            glass
            className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <p className="text-xs text-[#6B7280] mb-1">This Week</p>
            <p className="text-2xl font-serif font-bold text-[#1C2024]">
              12 Sessions
            </p>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              +3 from last week
            </p>
          </Card>
          <Card
            glass
            className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <p className="text-xs text-[#6B7280] mb-1">Avg. Session Value</p>
            <p className="text-2xl font-serif font-bold text-[#1C2024]">
              ₹999
            </p>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              +₹50 from last month
            </p>
          </Card>
          <Card
            glass
            className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <p className="text-xs text-[#6B7280] mb-1">Client Satisfaction</p>
            <p className="text-2xl font-serif font-bold text-[#1C2024]">
              4.96 / 5
            </p>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              Based on 245 reviews
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
