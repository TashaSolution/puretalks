/**
 * UserAvatar — avatar + menu for the signed-in user in the header.
 *
 * Shows the profile image/initials, role badge, quick links to the
 * dashboard, and a sign-out action.
 */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, ChevronDown } from "lucide-react";

import { Avatar } from "@/ui/Avatar";
import { useAuth } from "@/lib/auth/hooks";
import { cn } from "@/lib/utils";

export function UserAvatar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const initials =
    user.name
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    router.replace("/");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 p-1 rounded-full bg-white border border-black/[0.08] shadow-sm hover:bg-[#F4EFEA] focus:outline-none focus:ring-2 focus:ring-[#4A6B5D]/30"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Account menu for ${user.name}`}
      >
        <Avatar src={user.image || undefined} alt={user.name} fallback={initials} size="sm" />
        <span className="hidden lg:inline-flex items-center gap-1.5 pr-1.5">
          <span className="max-w-[110px] truncate text-xs font-semibold text-[#1C2024]">
            {user.name}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            role="menu"
            className="absolute right-0 top-full mt-2 z-50 w-60 rounded-2xl bg-white border border-black/[0.08] shadow-xl p-2"
          >
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                pathname?.startsWith("/dashboard")
                  ? "bg-[#F4EFEA] text-[#1C2024]"
                  : "text-[#4B5563] hover:bg-black/[0.03] hover:text-[#1C2024]"
              )}
            >
              <LayoutDashboard className="w-4 h-4 text-[#4A6B5D]" />
              My Dashboard
            </Link>

            <div className="my-1 h-px bg-black/5" />

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-[#B3362B] hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}