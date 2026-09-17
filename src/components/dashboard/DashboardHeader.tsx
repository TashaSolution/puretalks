"use client";

import React from "react";
import { Bell, Search, ChevronDown, Menu } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { useDashboard } from "./DashboardContext";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const { onMenuClick } = useDashboard();

  return (
    <header className="h-16 sm:h-[68px] bg-white border-b border-black/[0.04] sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 gap-3">
      {/* Left: Menu + Title */}
      <div className="flex items-center gap-3 min-w-0 animate-fade-in">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-[#F5EFEB] active:scale-[0.92] text-[#6B7280] min-w-[44px] min-h-[44px] flex items-center justify-center transition-transform"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          {title && (
            <h1 className="text-base sm:text-lg font-serif font-bold text-[#1C2024] tracking-tight truncate animate-fade-in-down">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-[10px] sm:text-xs text-[#6B7280] truncate animate-fade-in-down delay-100">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: Search, Notifications, Profile */}
      <div className="flex items-center gap-1.5 sm:gap-4 shrink-0 animate-fade-in-right">
        {/* Search - adaptive */}
        <div className="hidden md:flex items-center gap-2 bg-[#FAF8F5] border border-black/[0.07] rounded-xl px-3 py-2 sm:w-48 lg:w-64 transition-all duration-300 focus-within:border-[#4A6B5D]/40 focus-within:bg-white focus-within:shadow-sm">
          <Search className="w-4 h-4 text-[#9CA3AF] shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-xs text-[#1C2024] placeholder:text-[#9CA3AF] focus:outline-none w-full"
          />
        </div>

        {/* Search icon (mobile) */}
        <button
          className="md:hidden p-2.5 rounded-xl hover:bg-[#F5EFEB] active:scale-[0.92] text-[#6B7280] transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button
          className="relative p-2.5 rounded-xl hover:bg-[#F5EFEB] hover:-translate-y-0.5 active:scale-[0.92] transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-[#6B7280]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#C5A869] rounded-full animate-pulse" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 cursor-pointer min-h-[44px] px-1 rounded-xl hover:bg-[#F5EFEB] hover:-translate-y-0.5 active:scale-[0.98] transition-all">
          <Avatar
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80"
            alt="Dr. K. Soundarapandian"
            fallback="KS"
            size="sm"
            isOnline
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-[#1C2024]">
              Dr. K. Soundarapandian
            </p>
            <p className="text-[10px] text-[#9CA3AF]">Clinical Psychologist</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
