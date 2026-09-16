export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";

export type ConsultationMode = "audio" | "video" | "anonymous";

export interface DashboardKPI {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
}

export interface BookingRecord {
  id: string;
  clientName: string;
  clientEmail: string;
  clientAvatar?: string;
  consultantId: string;
  consultantName: string;
  category: string;
  mode: ConsultationMode;
  date: string;
  time: string;
  duration: number;
  status: BookingStatus;
  amount: number;
  rating?: number;
  notes?: string;
}

export interface RevenueData {
  date: string;
  amount: number;
  sessions: number;
}

export interface CategoryRevenue {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  target: number;
}

export interface ScheduleSlot {
  id: string;
  day: string;
  dayIndex: number;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface WeeklySchedule {
  slots: ScheduleSlot[];
}

export interface PerformanceMetric {
  period: string;
  sessionsCompleted: number;
  avgRating: number;
  earnings: number;
  utilizationRate: number;
  repeatClients: number;
}

export interface ClientHistory {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  totalSessions: number;
  lastSession: string;
  avgRating: number;
  totalSpent: number;
  categories: string[];
}

export interface DoctorProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  totalSessions: number;
  totalEarnings: number;
  joinDate: string;
  isOnline: boolean;
}
