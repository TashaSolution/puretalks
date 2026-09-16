"use client";

import React, { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { MoreVertical, Shield, User, Stethoscope } from "lucide-react";
import {
  getAdminUsers,
  getAdminUserStats,
  AdminUser,
  UserStats,
} from "@/lib/api/admin";

const roleBadgeVariant: Record<string, "emerald" | "sage" | "outline"> = {
  admin: "emerald",
  consultant: "sage",
  user: "outline",
};

const roleIcon: Record<string, React.ReactNode> = {
  admin: <Shield className="w-3 h-3" />,
  consultant: <Stethoscope className="w-3 h-3" />,
  user: <User className="w-3 h-3" />,
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([
      getAdminUsers({ role: roleFilter !== "all" ? roleFilter : undefined, search: search || undefined }),
      getAdminUserStats(),
    ])
      .then(([u, s]) => {
        setUsers(u);
        setStats(s);
      })
      .finally(() => setLoading(false));
  }, [roleFilter, search]);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <DashboardHeader
        title="Manage Users"
        subtitle="View and manage all platform users"
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[100px] rounded-2xl bg-white border border-black/[0.07] animate-pulse"
                />
              ))
            : [
                { label: "Total Users", value: stats?.total ?? 0 },
                { label: "Admins", value: stats?.admins ?? 0 },
                { label: "Consultants", value: stats?.consultants ?? 0 },
                { label: "Regular Users", value: stats?.users ?? 0 },
              ].map((s) => (
                <Card
                  key={s.label}
                  glass
                  className="p-5 border-black/[0.07] bg-white shadow-card rounded-2xl"
                >
                  <p className="text-xs text-[#6B7280] mb-1">{s.label}</p>
                  <p className="text-2xl font-serif font-bold text-[#1C2024]">
                    {s.value}
                  </p>
                </Card>
              ))}
        </div>

        {/* Filters */}
        <Card
          glass
          className="p-4 border-black/[0.07] bg-white shadow-card rounded-2xl"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 text-sm rounded-xl border border-black/10 bg-[#FAF8F5] text-[#1C2024] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#4A6B5D] focus:ring-2 focus:ring-[#4A6B5D]/20"
            />
            <div className="flex gap-2">
              {["all", "admin", "consultant", "user"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                    roleFilter === r
                      ? "bg-[#4A6B5D] text-white"
                      : "bg-[#FAF8F5] text-[#6B7280] hover:bg-[#F4EFEA]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Users Table */}
        <Card
          glass
          className="border-black/[0.07] bg-white shadow-card rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-black/[0.07] bg-[#FAF8F5]/50">
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    User
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Role
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                    Joined
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
                            <div className="h-3 w-24 bg-[#FAF8F5] rounded animate-pulse" />
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="h-3 w-32 bg-[#FAF8F5] rounded animate-pulse" />
                        </td>
                        <td className="py-4 px-4">
                          <div className="h-5 w-16 bg-[#FAF8F5] rounded-full animate-pulse" />
                        </td>
                        <td className="py-4 px-4">
                          <div className="h-3 w-20 bg-[#FAF8F5] rounded animate-pulse" />
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="h-6 w-6 bg-[#FAF8F5] rounded animate-pulse ml-auto" />
                        </td>
                      </tr>
                    ))
                  : users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-black/[0.04] hover:bg-[#FAF8F5]/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={user.image}
                              alt={user.name}
                              fallback={user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                              size="sm"
                            />
                            <span className="text-sm font-semibold text-[#1C2024]">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-xs text-[#6B7280]">
                            {user.email}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            variant={roleBadgeVariant[user.role] ?? "outline"}
                            size="sm"
                          >
                            <span className="flex items-center gap-1">
                              {roleIcon[user.role]}
                              {user.role}
                            </span>
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-xs text-[#9CA3AF]">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
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
