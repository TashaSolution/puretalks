"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  IndianRupee,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

const adminLinks: SidebarLink[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Doctors", href: "/admin/doctors", icon: Users },
  { label: "Users", href: "/admin/users", icon: UserCog },
  { label: "All Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Revenue", href: "/admin/revenue", icon: IndianRupee },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function AdminSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    onMobileClose();
  }, [pathname, onMobileClose]);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-white shadow-[2px_0_8px_-2px_rgba(0,0,0,0.06)] z-50 transition-all duration-300 flex flex-col",
          "hidden lg:flex",
          collapsed ? "lg:w-[72px]" : "lg:w-64",
          mobileOpen ? "!flex w-[85vw] max-w-64" : ""
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-black/[0.04]">
          {!collapsed ? (
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1C2024] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-serif font-bold text-[#1C2024] text-lg">
                  PureTalks
                </span>
                <span className="text-[10px] text-[#9CA3AF] block -mt-1">
                  Admin Panel
                </span>
              </div>
            </Link>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-[#1C2024] flex items-center justify-center mx-auto">
              <Shield className="w-4 h-4 text-white" />
            </div>
          )}
          <button
            onClick={onMobileClose}
            className="lg:hidden p-2 rounded-lg hover:bg-[#F5EFEB] text-[#6B7280] min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {!collapsed && (
            <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-widest px-3 mb-3">
              Administration
            </p>
          )}
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px]",
                  isActive
                    ? "bg-[#1C2024]/10 text-[#1C2024]"
                    : "text-[#6B7280] hover:bg-[#F5EFEB] hover:text-[#1C2024]",
                  collapsed && "justify-center px-0"
                )}
                title={collapsed ? link.label : undefined}
              >
                <link.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Doctor Portal Link + Collapse */}
        <div className="p-3 border-t border-black/[0.04] space-y-1">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-[#4A6B5D] hover:bg-[#4A6B5D]/10 min-h-[44px]",
              collapsed && "justify-center px-0"
            )}
            title={collapsed ? "Doctor Portal" : undefined}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Doctor Portal</span>}
          </Link>
          <button
            onClick={onToggle}
            className="hidden lg:flex w-full items-center justify-center py-2.5 rounded-xl text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F5EFEB] transition-colors mt-1 min-h-[44px]"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
