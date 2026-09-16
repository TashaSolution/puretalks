"use client";

import React, { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardProvider } from "@/components/dashboard/DashboardContext";
import { cn } from "@/lib/utils";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <DashboardProvider onMenuClick={() => setMobileOpen(true)}>
      <div className="min-h-screen bg-[#FAF8F5]">
        <DashboardSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        <main
          className={cn(
            "min-h-screen flex flex-col transition-all duration-300",
            collapsed ? "lg:ml-[72px]" : "lg:ml-64"
          )}
        >
          {children}
        </main>
      </div>
    </DashboardProvider>
  );
}
