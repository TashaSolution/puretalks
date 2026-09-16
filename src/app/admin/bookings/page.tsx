"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BookingRecord, BookingStatus } from "@/types/dashboard";
import { getAdminBookings } from "@/lib/api/admin";
import { Search } from "lucide-react";

const statusConfig: Record<
  string,
  { variant: "emerald" | "gold" | "secondary" | "outline"; label: string }
> = {
  confirmed: { variant: "emerald", label: "Confirmed" },
  pending: { variant: "gold", label: "Pending" },
  completed: { variant: "secondary", label: "Completed" },
  cancelled: { variant: "outline", label: "Cancelled" },
};

export default function AdminBookingsPage() {
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchBookings = useCallback(async (status: string, search: string) => {
    setLoading(true);
    try {
      const data = await getAdminBookings(status, search);
      setBookings(data);
    } catch {
      // API fallback handles mock data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings(statusFilter, searchQuery);
  }, [statusFilter, searchQuery, fetchBookings]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchBookings(statusFilter, value);
    }, 300);
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <DashboardHeader
        title="All Bookings"
        subtitle="Platform-wide consultation management"
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Summary */}
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs text-[#6B7280]">Total Bookings</p>
            {loading ? (
              <div className="h-8 w-16 bg-[#FAF8F5] rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-serif font-bold text-[#1C2024]">
                {bookings.length}
              </p>
            )}
          </div>
          <div>
            <p className="text-xs text-[#6B7280]">Total Revenue</p>
            {loading ? (
              <div className="h-8 w-20 bg-[#FAF8F5] rounded animate-pulse" />
            ) : (
              <p className="text-2xl font-serif font-bold text-[#1C2024]">
                ₹{totalRevenue.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 bg-white border border-black/[0.07] rounded-xl px-3 py-2.5 max-w-sm flex-1 min-w-0">
            <Search className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <input
              type="text"
              placeholder="Search by client, doctor, or ID..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="bg-transparent text-sm text-[#1C2024] placeholder:text-[#9CA3AF] focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 min-w-0">
            {["all", "confirmed", "pending", "completed", "cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() =>
                    setStatusFilter(status as BookingStatus | "all")
                  }
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap min-h-[44px] ${
                    statusFilter === status
                      ? "bg-[#4A6B5D] text-white"
                      : "bg-white text-[#6B7280] hover:bg-[#F5EFEB] border border-black/[0.07]"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Bookings Table */}
        <Card
          glass
          className="border-black/[0.07] bg-white shadow-card rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-black/[0.07] bg-[#FAF8F5]/50">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Client
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <tr key={i} className="border-b border-black/[0.04]">
                        {Array.from({ length: 7 }).map((_, j) => (
                          <td key={j} className="py-4 px-4">
                            <div className="h-3 w-full bg-[#FAF8F5] rounded animate-pulse" />
                          </td>
                        ))}
                      </tr>
                    ))
                  : bookings.map((booking) => {
                      const status = statusConfig[booking.status];
                      return (
                        <tr
                          key={booking.id}
                          className="border-b border-black/[0.04] hover:bg-[#FAF8F5]/50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <span className="text-xs font-mono text-[#6B7280]">
                              {booking.id}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-sm font-semibold text-[#1C2024]">
                              {booking.clientName}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-xs text-[#6B7280]">
                              {booking.consultantName}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-xs text-[#6B7280]">
                              {booking.category}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="text-xs text-[#1C2024]">{booking.date}</p>
                            <p className="text-[10px] text-[#9CA3AF]">
                              {booking.time}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant={status?.variant ?? "outline"} size="sm">
                              {status?.label ?? booking.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span className="text-sm font-semibold text-[#1C2024]">
                              ₹{booking.amount.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
