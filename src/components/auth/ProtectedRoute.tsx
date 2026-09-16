/**
 * ProtectedRoute — declarative guard for client-rendered layouts.
 *
 * While the session restores, a skeleton is shown. Once resolved:
 *   - signed out          → redirect to /auth/signin?next=<pathname>
 *   - allowed roles met   → render children
 *   - wrong role          → redirect to the target role's home
 */
"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth, useRequireRole } from "@/lib/auth/hooks";
import type { UserRole } from "@/types/auth";

export interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Roles permitted to view this area. Default: any authenticated user. */
  roles?: UserRole[];
  /** Where to send users who fail the role check (default: "/dashboard"). */
  forbiddenPath?: string;
}

export function ProtectedRoute({
  children,
  roles,
  forbiddenPath = "/dashboard",
}: ProtectedRouteProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { loading, allowed } = useRequireRole(
    roles ?? ["user", "consultant", "admin"]
  );

  if (loading) {
    return <AuthRouteSkeleton />;
  }

  if (!isAuthenticated) {
    const next = encodeURIComponent(pathname ?? "/dashboard");
    router.replace(`/auth/signin?next=${next}`);
    return <AuthRouteSkeleton />;
  }

  if (!allowed) {
    router.replace(forbiddenPath);
    return <AuthRouteSkeleton />;
  }

  return <>{children}</>;
}

export function AuthRouteSkeleton() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-[3px] border-[#4A6B5D]/20 border-t-[#4A6B5D] animate-spin" />
        <p className="text-sm text-[#4B5563]">Checking your session…</p>
      </div>
    </div>
  );
}