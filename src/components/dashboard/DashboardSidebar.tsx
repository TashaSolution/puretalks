"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  IndianRupee,
  Users,
  Clock,
  BarChart3,
  Shield,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

const doctorLinks: SidebarLink[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/dashboard/bookings", icon: Calendar },
  { label: "Revenue", href: "/dashboard/revenue", icon: IndianRupee },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "Schedule", href: "/dashboard/schedule", icon: Clock },
  { label: "Performance", href: "/dashboard/performance", icon: BarChart3 },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function DashboardSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    onMobileClose();
  }, [pathname, onMobileClose]);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={
          mobileOpen
            ? { x: 0 }
            : collapsed
              ? { width: 72 }
              : { width: 256 }
        }
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "fixed left-0 top-0 h-full bg-white shadow-[2px_0_8px_-2px_rgba(0,0,0,0.06)] z-50 flex flex-col",
          "hidden lg:flex",
          mobileOpen ? "!flex w-[85vw] max-w-64 shadow-2xl lg:!hidden" : ""
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-black/[0.04]">
          {!collapsed || mobileOpen ? (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#4A6B5D] flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-sm">
                    P
                  </span>
                </div>
                <span className="font-serif font-bold text-[#1C2024] text-lg">
                  PureTalks
                </span>
              </Link>
            </motion.div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-[#4A6B5D] flex items-center justify-center mx-auto">
              <span className="text-white font-serif font-bold text-sm">P</span>
            </div>
          )}
          <button
            onClick={onMobileClose}
            className="lg:hidden p-2 rounded-lg hover:bg-[#F5EFEB] text-[#6B7280] min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {!collapsed && (
            <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-widest px-3 mb-3">
              Dashboard
            </p>
          )}
          {doctorLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px]",
                  isActive
                    ? "text-[#4A6B5D]"
                    : "text-[#6B7280] hover:bg-[#F5EFEB] hover:text-[#1C2024]",
                  collapsed && "justify-center px-0"
                )}
                title={collapsed && !mobileOpen ? link.label : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl bg-[#4A6B5D]/10 border border-[#4A6B5D]/10"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <link.icon className="w-5 h-5 shrink-0 relative z-10" />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10"
                  >
                    {link.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Admin Portal Link + Collapse */}
        <div className="p-3 border-t border-black/[0.04] space-y-1">
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-[#1C2024] hover:bg-[#1C2024]/5 min-h-[44px]",
              collapsed && "justify-center px-0"
            )}
            title={collapsed && !mobileOpen ? "Admin Panel" : undefined}
          >
            <Shield className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Admin Panel</span>}
          </Link>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onToggle}
            className="hidden lg:flex w-full items-center justify-center py-2.5 rounded-xl text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F5EFEB] transition-colors min-h-[44px]"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <motion.span
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </motion.span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
}