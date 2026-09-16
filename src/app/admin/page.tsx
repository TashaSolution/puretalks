"use client";

import React, { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { DashboardKPI, DoctorProfile, RevenueData } from "@/types/dashboard";
import {
  getAdminDashboardStats,
  getAdminRevenue,
  getAdminDoctors,
  DashboardStats,
  RevenueSummary,
  AdminDoctor,
} from "@/lib/api/admin";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [revenue, setRevenue] = useState<RevenueSummary | null>(null);
  const [doctors, setDoctors] = useState<AdminDoctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAdminDashboardStats(),
      getAdminRevenue(),
      getAdminDoctors(),
    ])
      .then(([s, r, d]) => {
        setStats(s);
        setRevenue(r);
        setDoctors(d);
      })
      .finally(() => setLoading(false));
  }, []);

  const kpis: DashboardKPI[] = stats
    ? [
        {
          label: "Total Doctors",
          value: String(stats.totalDoctors),
          change: 0,
          changeLabel: "active professionals",
          icon: "users",
        },
        {
          label: "Platform Revenue",
          value: `₹${stats.totalRevenue.toLocaleString()}`,
          change: 15.2,
          changeLabel: "vs last month",
          icon: "indian-rupee",
        },
        {
          label: "Total Bookings",
          value: String(stats.totalBookings),
          change: 18.7,
          changeLabel: "vs last month",
          icon: "calendar",
        },
        {
          label: "Active Clients",
          value: String(stats.activeClients),
          change: 9.4,
          changeLabel: "vs last month",
          icon: "users",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <DashboardHeader
        title="Admin Dashboard"
        subtitle="Platform overview and management"
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[120px] rounded-2xl bg-white border border-black/[0.07] animate-pulse"
                />
              ))
            : kpis.map((kpi) => <KPICard key={kpi.label} data={kpi} />)}
        </div>

        {/* Revenue + Top Doctors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card
            glass
            className="lg:col-span-2 p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
                Platform Revenue
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="h-[260px] bg-[#FAF8F5] rounded-lg animate-pulse" />
              ) : (
                <RevenueChart data={revenue?.daily ?? []} height={260} />
              )}
            </CardContent>
          </Card>

          <Card
            glass
            className="p-4 sm:p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
                  Top Doctors
                </CardTitle>
                <Link
                  href="/admin/doctors"
                  className="text-xs text-[#4A6B5D] font-medium flex items-center gap-1 hover:underline"
                >
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-3">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-2">
                      <div className="w-8 h-8 rounded-full bg-[#FAF8F5] animate-pulse" />
                      <div className="flex-1 space-y-1">
                        <div className="h-3 w-24 bg-[#FAF8F5] rounded animate-pulse" />
                        <div className="h-2 w-16 bg-[#FAF8F5] rounded animate-pulse" />
                      </div>
                    </div>
                  ))
                : doctors.slice(0, 4).map((doctor) => (
                    <div
                      key={doctor.id}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#FAF8F5] transition-colors"
                    >
                      <Avatar
                        src={doctor.avatar}
                        alt={doctor.name}
                        fallback={doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                        size="sm"
                        isOnline={doctor.isOnline}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#1C2024] truncate">
                          {doctor.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-[#C5A869] fill-[#C5A869]" />
                          <span className="text-[10px] text-[#6B7280]">
                            {doctor.rating} · {doctor.sessionsCompleted} sessions
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#1C2024]">
                        ₹{(doctor.totalEarnings / 1000).toFixed(1)}k
                      </span>
                    </div>
                  ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
