"use client";

import React, { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Star, MoreVertical } from "lucide-react";
import {
  getAdminDoctors,
  AdminDoctor,
} from "@/lib/api/admin";

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<AdminDoctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDoctors().finally(() => setLoading(false)).then(setDoctors);
  }, []);

  const totalDoctors = doctors.length;
  const onlineNow = doctors.filter((d) => d.isOnline).length;
  const avgRating =
    doctors.length > 0
      ? (doctors.reduce((sum, d) => sum + d.rating, 0) / doctors.length).toFixed(2)
      : "0.00";

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <DashboardHeader
        title="Manage Doctors"
        subtitle="View and manage all registered professionals"
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Card
            glass
            className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <p className="text-xs text-[#6B7280] mb-1">Total Doctors</p>
            {loading ? (
              <div className="h-8 w-12 bg-[#FAF8F5] rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-serif font-bold text-[#1C2024]">
                {totalDoctors}
              </p>
            )}
          </Card>
          <Card
            glass
            className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <p className="text-xs text-[#6B7280] mb-1">Online Now</p>
            {loading ? (
              <div className="h-8 w-12 bg-[#FAF8F5] rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-serif font-bold text-[#1C2024]">
                {onlineNow}
              </p>
            )}
          </Card>
          <Card
            glass
            className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <p className="text-xs text-[#6B7280] mb-1">Avg. Rating</p>
            {loading ? (
              <div className="h-8 w-12 bg-[#FAF8F5] rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-serif font-bold text-[#1C2024]">
                {avgRating}
              </p>
            )}
          </Card>
        </div>

        {/* Doctors Table */}
        <Card
          glass
          className="border-black/[0.07] bg-white shadow-card rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-black/[0.07] bg-[#FAF8F5]/50">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Sessions
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Earnings
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i} className="border-b border-black/[0.04]">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#FAF8F5] animate-pulse" />
                            <div className="space-y-1">
                              <div className="h-3 w-24 bg-[#FAF8F5] rounded animate-pulse" />
                              <div className="h-2 w-16 bg-[#FAF8F5] rounded animate-pulse" />
                            </div>
                          </div>
                        </td>
                        {Array.from({ length: 5 }).map((_, j) => (
                          <td key={j} className="py-4 px-4">
                            <div className="h-3 w-16 bg-[#FAF8F5] rounded animate-pulse" />
                          </td>
                        ))}
                        <td className="py-4 px-4 text-right">
                          <div className="h-6 w-6 bg-[#FAF8F5] rounded animate-pulse ml-auto" />
                        </td>
                      </tr>
                    ))
                  : doctors.map((doctor) => (
                      <tr
                        key={doctor.id}
                        className="border-b border-black/[0.04] hover:bg-[#FAF8F5]/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
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
                            <div>
                              <p className="text-sm font-semibold text-[#1C2024] truncate max-w-[120px]">
                                {doctor.name}
                              </p>
                              <p className="text-xs text-[#9CA3AF] truncate max-w-[120px]">
                                {doctor.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="sage" size="sm">
                            {doctor.specialization.split(" ")[0]}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-[#C5A869] fill-[#C5A869]" />
                            <span className="text-xs font-semibold text-[#1C2024]">
                              {doctor.rating}
                            </span>
                            <span className="text-[10px] text-[#9CA3AF]">
                              ({doctor.reviewCount})
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-xs text-[#1C2024]">
                            {doctor.sessionsCompleted}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-xs font-semibold text-[#1C2024]">
                            ₹{doctor.totalEarnings.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            variant={doctor.isOnline ? "emerald" : "outline"}
                            size="sm"
                          >
                            {doctor.isOnline ? "Online" : "Offline"}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button className="p-1.5 rounded-lg hover:bg-[#F5EFEB] transition-colors">
                            <MoreVertical className="w-4 h-4 text-[#6B7280]" />
                          </button>
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
