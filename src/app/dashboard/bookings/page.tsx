"use client";

import React, { useState, useMemo } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BookingRow } from "@/components/dashboard/BookingRow";
import { mockBookings } from "@/data/dashboard/mock-bookings";
import { BookingStatus } from "@/types/dashboard";
import { Search, Filter } from "lucide-react";

const statusFilters: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default function BookingsPage() {
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = useMemo(() => {
    return mockBookings.filter((booking) => {
      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;
      const matchesSearch =
        booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchQuery]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: mockBookings.length };
    mockBookings.forEach((b) => {
      counts[b.status] = (counts[b.status] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <DashboardHeader
        title="Bookings"
        subtitle="Manage all your consultation sessions"
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Status Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 min-h-[44px] ${
                statusFilter === filter.value
                  ? "bg-[#4A6B5D] text-white"
                  : "bg-white text-[#6B7280] hover:bg-[#F5EFEB] border border-black/[0.07]"
              }`}
            >
              {filter.label}
              <span
                className={`ml-1.5 px-1.5 py-0.5 rounded-md text-[10px] ${
                  statusFilter === filter.value
                    ? "bg-white/20 text-white"
                    : "bg-[#F5EFEB] text-[#9CA3AF]"
                }`}
              >
                {statusCounts[filter.value] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-black/[0.07] rounded-xl px-3 py-2.5 max-w-md">
          <Search className="w-4 h-4 text-[#9CA3AF] shrink-0" />
          <input
            type="text"
            placeholder="Search by client, category, or booking ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-[#1C2024] placeholder:text-[#9CA3AF] focus:outline-none w-full"
          />
        </div>

        {/* Bookings Table */}
        <Card
          glass
          className="border-black/[0.07] bg-white shadow-card rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-black/[0.07] bg-[#FAF8F5]/50">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Client
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Mode
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Duration
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
                {filteredBookings.map((booking) => (
                  <BookingRow key={booking.id} booking={booking} />
                ))}
              </tbody>
            </table>
          </div>
          {filteredBookings.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-[#9CA3AF]">No bookings found</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
