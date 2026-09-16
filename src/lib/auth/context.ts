/**
 * React context that exposes the current auth session to the component tree.
 */
"use client";

import { createContext } from "react";

import type { AuthUser, UserRole } from "@/types/auth";

export interface AuthContextValue {
  /** Authenticated user, or null when signed out. */
  user: AuthUser | null;
  /** Raw JWT access token, or null when signed out. */
  token: string | null;
  /** True while the initial session restore is in flight. */
  loading: boolean;
  /** Last error raised while restoring or refreshing the session. */
  error: string | null;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
  /** Navigate to the backend endpoint that starts Google OAuth. */
  signInWithGoogle: () => void;
  /** Clear the local session and attempt a best-effort server logout. */
  signOut: () => Promise<void>;
  /** Re-fetch /auth/me with the current token. */
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProviderName = "AuthProvider";