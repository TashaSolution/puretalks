import { RevenueData, CategoryRevenue, MonthlyRevenue } from "@/types/dashboard";

export const dailyRevenue: RevenueData[] = [
  { date: "Sep 1", amount: 2498, sessions: 3 },
  { date: "Sep 2", amount: 1598, sessions: 2 },
  { date: "Sep 3", amount: 3497, sessions: 4 },
  { date: "Sep 4", amount: 1998, sessions: 2 },
  { date: "Sep 5", amount: 2997, sessions: 3 },
  { date: "Sep 6", amount: 4496, sessions: 5 },
  { date: "Sep 7", amount: 1499, sessions: 2 },
  { date: "Sep 8", amount: 2598, sessions: 3 },
  { date: "Sep 9", amount: 3996, sessions: 4 },
  { date: "Sep 10", amount: 1998, sessions: 2 },
  { date: "Sep 11", amount: 2997, sessions: 3 },
];

export const categoryRevenue: CategoryRevenue[] = [
  { category: "Mental Health", amount: 14990, percentage: 38, color: "#4A6B5D" },
  { category: "Relationship", amount: 8994, percentage: 23, color: "#C5A869" },
  { category: "Career", amount: 7995, percentage: 20, color: "#3B82F6" },
  { category: "Mindfulness", amount: 4497, percentage: 11, color: "#8B5CF6" },
  { category: "Youth", amount: 3596, percentage: 8, color: "#F59E0B" },
];

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "Apr", revenue: 28500, target: 25000 },
  { month: "May", revenue: 32100, target: 28000 },
  { month: "Jun", revenue: 29800, target: 30000 },
  { month: "Jul", revenue: 35200, target: 32000 },
  { month: "Aug", revenue: 38900, target: 35000 },
  { month: "Sep", revenue: 22175, target: 40000 },
];

export const weeklyEarnings = [
  { week: "Week 1", amount: 8596 },
  { week: "Week 2", amount: 9495 },
  { week: "Week 3", amount: 4084 },
];
