"use client";

import React from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { KPICard } from "@/components/dashboard/KPICard";
import { performanceMetrics } from "@/data/dashboard/mock-stats";
import { DashboardKPI } from "@/types/dashboard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const performanceKPIs: DashboardKPI[] = [
  {
    label: "Total Sessions",
    value: "184",
    change: 14.2,
    changeLabel: "vs last 6 months",
    icon: "calendar",
  },
  {
    label: "Avg Rating",
    value: "4.95",
    change: 1.0,
    changeLabel: "vs last 6 months",
    icon: "star",
  },
  {
    label: "Utilization Rate",
    value: "78%",
    change: 5.3,
    changeLabel: "vs last 6 months",
    icon: "trending-up",
  },
  {
    label: "Repeat Clients",
    value: "93",
    change: 18.7,
    changeLabel: "vs last 6 months",
    icon: "users",
  },
];

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <DashboardHeader
        title="Performance"
        subtitle="Track your practice metrics and growth trends"
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {performanceKPIs.map((kpi) => (
            <KPICard key={kpi.label} data={kpi} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Sessions Trend */}
          <Card
            glass
            className="p-4 sm:p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
                Sessions Completed
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={performanceMetrics}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(28,32,36,0.06)"
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid rgba(28,32,36,0.07)",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(28,32,36,0.08)",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="sessionsCompleted"
                    fill="#4A6B5D"
                    radius={[6, 6, 0, 0]}
                    name="Sessions"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Rating Trend */}
          <Card
            glass
            className="p-4 sm:p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
                Rating Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={performanceMetrics}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(28,32,36,0.06)"
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[4.9, 5.0]}
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid rgba(28,32,36,0.07)",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(28,32,36,0.08)",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="avgRating"
                    stroke="#C5A869"
                    strokeWidth={2}
                    dot={{ fill: "#C5A869", r: 4 }}
                    name="Avg Rating"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Utilization + Repeat Clients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card
            glass
            className="p-4 sm:p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
                Utilization Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={performanceMetrics}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(28,32,36,0.06)"
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid rgba(28,32,36,0.07)",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(28,32,36,0.08)",
                      fontSize: "12px",
                    }}
                    formatter={(value) => [`${value}%`, "Utilization"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="utilizationRate"
                    stroke="#4A6B5D"
                    strokeWidth={2}
                    dot={{ fill: "#4A6B5D", r: 4 }}
                    name="Utilization"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card
            glass
            className="p-4 sm:p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
                Repeat Clients
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={performanceMetrics}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(28,32,36,0.06)"
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid rgba(28,32,36,0.07)",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(28,32,36,0.08)",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="repeatClients"
                    fill="#C5A869"
                    radius={[6, 6, 0, 0]}
                    name="Repeat Clients"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
