"use client";

import React, { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AdminDoctor, getAdminDoctors, getAdminAnalytics, AnalyticsData } from "@/lib/api/admin";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [doctors, setDoctors] = useState<AdminDoctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAdminAnalytics(), getAdminDoctors()])
      .then(([a, d]) => {
        setAnalytics(a);
        setDoctors(d);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <DashboardHeader
        title="Analytics"
        subtitle="Platform performance and trends"
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[100px] rounded-2xl bg-white border border-black/[0.07] animate-pulse"
                />
              ))
            : (
                <>
                  <Card
                    glass
                    className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl"
                  >
                    <p className="text-xs text-[#6B7280] mb-1">Total Sessions</p>
                    <p className="text-2xl font-serif font-bold text-[#1C2024]">
                      {analytics?.totalSessions ?? 0}
                    </p>
                  </Card>
                  <Card
                    glass
                    className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl"
                  >
                    <p className="text-xs text-[#6B7280] mb-1">Active Clients</p>
                    <p className="text-2xl font-serif font-bold text-[#1C2024]">
                      {analytics?.activeClients ?? 0}
                    </p>
                  </Card>
                  <Card
                    glass
                    className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl"
                  >
                    <p className="text-xs text-[#6B7280] mb-1">Completion Rate</p>
                    <p className="text-2xl font-serif font-bold text-[#1C2024]">
                      {analytics?.completionRate ?? 0}%
                    </p>
                  </Card>
                  <Card
                    glass
                    className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl"
                  >
                    <p className="text-xs text-[#6B7280] mb-1">Cancellation Rate</p>
                    <p className="text-2xl font-serif font-bold text-[#1C2024]">
                      {analytics?.cancellationRate ?? 0}%
                    </p>
                  </Card>
                </>
              )}
        </div>

        {/* Sessions by Month */}
        <Card
          glass
          className="p-4 sm:p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
        >
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
              Sessions by Month
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="h-[300px] bg-[#FAF8F5] rounded-lg animate-pulse" />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={analytics?.performanceMetrics ?? []}
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
                    fill="#1C2024"
                    radius={[6, 6, 0, 0]}
                    name="Sessions"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Doctor Performance Table */}
        <Card
          glass
          className="border-black/[0.07] bg-white shadow-card rounded-2xl overflow-hidden"
        >
          <div className="p-6 pb-0">
            <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
              Doctor Performance
            </CardTitle>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-black/[0.07] bg-[#FAF8F5]/50">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Sessions
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Earnings
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Utilization
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i} className="border-b border-black/[0.04]">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <td key={j} className="py-4 px-4">
                            <div className="h-3 w-full bg-[#FAF8F5] rounded animate-pulse" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : doctors.map((doctor) => (
                      <tr
                        key={doctor.id}
                        className="border-b border-black/[0.04] hover:bg-[#FAF8F5]/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <p className="text-sm font-semibold text-[#1C2024]">
                            {doctor.name}
                          </p>
                          <p className="text-xs text-[#9CA3AF]">
                            {doctor.specialization}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-xs text-[#1C2024]">
                            {doctor.sessionsCompleted}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-xs font-semibold text-[#1C2024]">
                            {doctor.rating}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-xs font-semibold text-[#1C2024]">
                            ₹{doctor.totalEarnings.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-[#F5EFEB] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#4A6B5D] rounded-full"
                                style={{
                                  width: `${Math.min(
                                    (doctor.sessionsCompleted / 160) * 100,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                            <span className="text-[10px] text-[#6B7280]">
                              {Math.round((doctor.sessionsCompleted / 160) * 100)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
