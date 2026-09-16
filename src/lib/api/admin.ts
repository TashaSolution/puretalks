/**
 * PureTalks Admin API Client
 *
 * Typed functions for all admin backend endpoints.
 * Falls back to mock data when backend is unavailable.
 */

import {
  DashboardKPI,
  BookingRecord,
  RevenueData,
  CategoryRevenue,
  MonthlyRevenue,
  PerformanceMetric,
  DoctorProfile,
} from "@/types/dashboard";
import { apiClient } from "./client";
import { adminKPIs, mockDoctors, performanceMetrics } from "@/data/dashboard/mock-stats";
import { mockBookings } from "@/data/dashboard/mock-bookings";
import {
  dailyRevenue,
  categoryRevenue,
  monthlyRevenue,
} from "@/data/dashboard/mock-revenue";

// ──────────────────────────────────────────────────────────────
// Dashboard Data
// ──────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalDoctors: number;
  totalBookings: number;
  totalRevenue: number;
  activeClients: number;
  totalUsers: number;
  onlineDoctors: number;
}

export interface RevenueSummary {
  daily: RevenueData[];
  byCategory: CategoryRevenue[];
  monthly: MonthlyRevenue[];
}

export interface AnalyticsData {
  totalSessions: number;
  activeClients: number;
  completionRate: number;
  cancellationRate: number;
  performanceMetrics: PerformanceMetric[];
}

export async function getAdminDashboardStats(): Promise<DashboardStats> {
  return apiClient<DashboardStats>("/admin/dashboard/stats", {}, () => {
    return {
      totalDoctors: 6,
      totalBookings: 892,
      totalRevenue: 234500,
      activeClients: 324,
      totalUsers: 406,
      onlineDoctors: 4,
    };
  });
}

export async function getAdminRevenue(days?: number): Promise<RevenueSummary> {
  const qs = days ? `?days=${days}` : "";
  return apiClient<RevenueSummary>(`/admin/dashboard/revenue${qs}`, {}, () => {
    return {
      daily: dailyRevenue,
      byCategory: categoryRevenue,
      monthly: monthlyRevenue,
    };
  });
}

export async function getAdminBookings(
  status?: string,
  search?: string
): Promise<BookingRecord[]> {
  const params = new URLSearchParams();
  if (status && status !== "all") params.set("status", status);
  if (search) params.set("search", search);
  const qs = params.toString() ? `?${params.toString()}` : "";

  return apiClient<BookingRecord[]>(
    `/admin/dashboard/bookings${qs}`,
    {},
    () => {
      let result = [...mockBookings];
      if (status && status !== "all") {
        result = result.filter((b) => b.status === status);
      }
      if (search) {
        const q = search.toLowerCase();
        result = result.filter(
          (b) =>
            b.clientName.toLowerCase().includes(q) ||
            b.consultantName.toLowerCase().includes(q) ||
            b.id.toLowerCase().includes(q)
        );
      }
      return result;
    }
  );
}

export async function getAdminAnalytics(): Promise<AnalyticsData> {
  return apiClient<AnalyticsData>("/admin/dashboard/analytics", {}, () => {
    return {
      totalSessions: 892,
      activeClients: 324,
      completionRate: 94.2,
      cancellationRate: 3.8,
      performanceMetrics,
    };
  });
}

// ──────────────────────────────────────────────────────────────
// Doctor Management
// ──────────────────────────────────────────────────────────────

export interface AdminDoctor {
  id: string;
  slug: string;
  name: string;
  title: string;
  specialization: string;
  experienceYears: number;
  avatar: string;
  rating: number;
  reviewCount: number;
  sessionsCompleted: number;
  languages: string[];
  categoryIds: string[];
  credentials: string[];
  bio: string;
  consultationTypes: Record<string, boolean>;
  pricing: Record<string, number>;
  availableNext: string;
  badges: Array<Record<string, unknown>>;
  isOnline: boolean;
  totalEarnings: number;
}

export interface CreateDoctorData {
  name: string;
  title: string;
  specialization: string;
  experienceYears: number;
  avatar?: string;
  bio: string;
  languages?: string[];
  categoryIds?: string[];
  credentials?: string[];
  consultationTypes?: Record<string, boolean>;
  pricing?: Record<string, number>;
  isOnline?: boolean;
}

export type UpdateDoctorData = Partial<CreateDoctorData>;

function mapDoctorToProfile(d: AdminDoctor): DoctorProfile {
  return {
    id: d.id,
    name: d.name,
    title: d.title,
    avatar: d.avatar,
    specialization: d.specialization,
    rating: d.rating,
    reviewCount: d.reviewCount,
    totalSessions: d.sessionsCompleted,
    totalEarnings: d.totalEarnings,
    joinDate: "",
    isOnline: d.isOnline,
  };
}

export async function getAdminDoctors(): Promise<AdminDoctor[]> {
  return apiClient<AdminDoctor[]>("/admin/doctors", {}, () => {
    return mockDoctors.map((d, i) => ({
      id: String(i + 1),
      slug: d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: d.name,
      title: d.title,
      specialization: d.specialization,
      experienceYears: 8 + i * 2,
      avatar: d.avatar,
      rating: d.rating,
      reviewCount: d.reviewCount,
      sessionsCompleted: d.totalSessions,
      languages: ["English", "Tamil"],
      categoryIds: [],
      credentials: [],
      bio: "",
      consultationTypes: { audio: true, video: true, anonymous: false },
      pricing: { duration30Min: 999, duration45Min: 1499, duration60Min: 1999 },
      availableNext: "",
      badges: [],
      isOnline: d.isOnline,
      totalEarnings: d.totalEarnings,
    }));
  });
}

export async function getAdminDoctor(id: string): Promise<AdminDoctor> {
  return apiClient<AdminDoctor>(`/admin/doctors/${id}`, {}, () => {
    const doc = mockDoctors.find((d) => d.id === id);
    if (!doc) throw new Error("Doctor not found");
    return {
      id: doc.id,
      slug: doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: doc.name,
      title: doc.title,
      specialization: doc.specialization,
      experienceYears: 10,
      avatar: doc.avatar,
      rating: doc.rating,
      reviewCount: doc.reviewCount,
      sessionsCompleted: doc.totalSessions,
      languages: ["English"],
      categoryIds: [],
      credentials: [],
      bio: "",
      consultationTypes: { audio: true, video: true, anonymous: false },
      pricing: { duration30Min: 999, duration45Min: 1499, duration60Min: 1999 },
      availableNext: "",
      badges: [],
      isOnline: doc.isOnline,
      totalEarnings: doc.totalEarnings,
    };
  });
}

export async function createAdminDoctor(
  data: CreateDoctorData
): Promise<AdminDoctor> {
  return apiClient<AdminDoctor>(
    "/admin/doctors",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    () => {
      throw new Error("Cannot create doctor without backend");
    }
  );
}

export async function updateAdminDoctor(
  id: string,
  data: UpdateDoctorData
): Promise<AdminDoctor> {
  return apiClient<AdminDoctor>(
    `/admin/doctors/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    () => {
      throw new Error("Cannot update doctor without backend");
    }
  );
}

export async function deleteAdminDoctor(id: string): Promise<void> {
  return apiClient<void>(
    `/admin/doctors/${id}`,
    { method: "DELETE" },
    () => {
      throw new Error("Cannot delete doctor without backend");
    }
  );
}

// ──────────────────────────────────────────────────────────────
// User Management
// ──────────────────────────────────────────────────────────────

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  image?: string;
  role: string;
  createdAt: string;
}

export interface UserStats {
  total: number;
  admins: number;
  consultants: number;
  users: number;
}

export async function getAdminUsers(params?: {
  role?: string;
  search?: string;
}): Promise<AdminUser[]> {
  const qs = new URLSearchParams();
  if (params?.role) qs.set("role", params.role);
  if (params?.search) qs.set("search", params.search);
  const query = qs.toString() ? `?${qs.toString()}` : "";

  return apiClient<AdminUser[]>(`/admin/users${query}`, {}, () => []);
}

export async function getAdminUserStats(): Promise<UserStats> {
  return apiClient<UserStats>("/admin/users/stats", {}, () => ({
    total: 0,
    admins: 0,
    consultants: 0,
    users: 0,
  }));
}

export async function getAdminUser(id: number): Promise<AdminUser> {
  return apiClient<AdminUser>(`/admin/users/${id}`, {}, () => {
    throw new Error("Cannot fetch user without backend");
  });
}

export async function updateAdminUserRole(
  id: number,
  role: string
): Promise<AdminUser> {
  return apiClient<AdminUser>(
    `/admin/users/${id}/role`,
    {
      method: "PUT",
      body: JSON.stringify({ role }),
    },
    () => {
      throw new Error("Cannot update user without backend");
    }
  );
}

export async function deleteAdminUser(id: number): Promise<void> {
  return apiClient<void>(
    `/admin/users/${id}`,
    { method: "DELETE" },
    () => {
      throw new Error("Cannot delete user without backend");
    }
  );
}
