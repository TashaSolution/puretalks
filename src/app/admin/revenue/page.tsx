"use client";

import React, { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { KPICard } from "@/components/dashboard/KPICard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { DashboardKPI } from "@/types/dashboard";
import {
  getAdminRevenue,
  getAdminDashboardStats,
  RevenueSummary,
  DashboardStats,
} from "@/lib/api/admin";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminRevenuePage() {
  const [revenue, setRevenue] = useState<RevenueSummary | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAdminRevenue(), getAdminDashboardStats()])
      .then(([r, s]) => {
        setRevenue(r);
        setStats(s);
      })
      .finally(() => setLoading(false));
  }, []);

  const revenueKPIs: DashboardKPI[] = stats
    ? [
        {
          label: "Platform Revenue",
          value: `₹${stats.totalRevenue.toLocaleString()}`,
          change: 15.2,
          changeLabel: "vs last month",
          icon: "indian-rupee",
        },
        {
          label: "This Month",
          value: `₹${(revenue?.monthly?.[revenue.monthly.length - 1]?.revenue ?? 0).toLocaleString()}`,
          change: -5.4,
          changeLabel: "vs last month",
          icon: "indian-rupee",
        },
        {
          label: "Avg. per Session",
          value: `₹${stats.totalBookings > 0 ? Math.round(stats.totalRevenue / stats.totalBookings) : 0}`,
          change: 3.2,
          changeLabel: "vs last month",
          icon: "trending-up",
        },
        {
          label: "Total This Year",
          value: `₹${stats.totalRevenue.toLocaleString()}`,
          change: 28.4,
          changeLabel: "vs last year",
          icon: "indian-rupee",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <DashboardHeader
        title="Platform Revenue"
        subtitle="Track all earnings across the platform"
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
            : revenueKPIs.map((kpi) => (
                <KPICard key={kpi.label} data={kpi} />
              ))}
        </div>

        {/* Revenue Chart + Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card
            glass
            className="lg:col-span-2 p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
                Daily Revenue
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="h-[300px] bg-[#FAF8F5] rounded-lg animate-pulse" />
              ) : (
                <RevenueChart data={revenue?.daily ?? []} height={300} />
              )}
            </CardContent>
          </Card>

          <Card
            glass
            className="p-4 sm:p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
                By Category
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="h-[200px] bg-[#FAF8F5] rounded-lg animate-pulse" />
              ) : (
                <DonutChart data={revenue?.byCategory ?? []} height={200} />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Monthly Comparison */}
        <Card
          glass
          className="p-4 sm:p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
        >
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
              Monthly Revenue vs Target
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="h-[300px] bg-[#FAF8F5] rounded-lg animate-pulse" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={revenue?.monthly ?? []}
                  margin={{ top: 10, right: 10, left: 5, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(28,32,36,0.06)"
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid rgba(28,32,36,0.07)",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(28,32,36,0.08)",
                      fontSize: "12px",
                    }}
                    formatter={(value) => [
                      `₹${Number(value).toLocaleString()}`,
                      "",
                    ]}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#1C2024"
                    radius={[6, 6, 0, 0]}
                    name="Revenue"
                  />
                  <Bar
                    dataKey="target"
                    fill="#E5E7EB"
                    radius={[6, 6, 0, 0]}
                    name="Target"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
