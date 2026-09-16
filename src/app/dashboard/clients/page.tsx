"use client";

import React from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { mockClients } from "@/data/dashboard/mock-stats";
import { Star, Mail, Calendar } from "lucide-react";

export default function ClientsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <DashboardHeader
        title="Clients"
        subtitle="View your client history and session details"
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <Card
            glass
            className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <p className="text-xs text-[#6B7280] mb-1">Total Clients</p>
            <p className="text-2xl font-serif font-bold text-[#1C2024]">
              {mockClients.length}
            </p>
          </Card>
          <Card
            glass
            className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <p className="text-xs text-[#6B7280] mb-1">Repeat Rate</p>
            <p className="text-2xl font-serif font-bold text-[#1C2024]">
              62%
            </p>
          </Card>
          <Card
            glass
            className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl"
          >
            <p className="text-xs text-[#6B7280] mb-1">Avg. Sessions/Client</p>
            <p className="text-2xl font-serif font-bold text-[#1C2024]">4.7</p>
          </Card>
        </div>

        {/* Client List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {mockClients.map((client) => (
            <Card
              key={client.id}
              glass
              className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-start gap-4">
                <Avatar
                  alt={client.name}
                  fallback={client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                  size="lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-serif font-bold text-[#1C2024] truncate min-w-0">
                      {client.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#C5A869] fill-[#C5A869]" />
                      <span className="text-xs font-semibold text-[#1C2024]">
                        {client.avgRating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[#9CA3AF] mb-2">
                    <Mail className="w-3 h-3" />
                    <span className="text-xs truncate max-w-[180px]">{client.email}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-[#9CA3AF]" />
                      <span className="text-xs text-[#6B7280]">
                        {client.totalSessions} sessions
                      </span>
                    </div>
                    <span className="text-xs text-[#9CA3AF]">·</span>
                    <span className="text-xs text-[#6B7280]">
                      Last: {client.lastSession}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                      {client.categories.map((cat) => (
                        <Badge key={cat} variant="sage" size="sm">
                          {cat.split(" ")[0]}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-[#1C2024]">
                      ₹{client.totalSpent.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
