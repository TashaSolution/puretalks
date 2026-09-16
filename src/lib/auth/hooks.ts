/**
 * Auth hooks consumed across the component tree.
 *
 * useAuth         → the full session (user/token/loading + actions)
 * useRequireRole  → declarative guard for role-restricted components
 */
"use client";

import { useContext } from "react";

import { AuthContext, type AuthContextValue } from "@/lib/auth/context";
import type { UserRole } from "@/types/auth";

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}

export interface RequireRoleResult {
  loading: boolean;
  allowed: boolean;
  userRole: UserRole | null;
}

/** True once a session restore completes, if the user holds one of `roles`. */
export function useRequireRole(roles: UserRole[]): RequireRoleResult {
  const { loading, user } = useAuth();
  return {
    loading,
    allowed: user != null && roles.includes(user.role),
    userRole: user?.role ?? null,
  };
}