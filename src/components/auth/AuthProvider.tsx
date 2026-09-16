/**
 * AuthProvider — restores the session from the stored cookie on mount and
 * wires the AuthContext actions (sign-in with Google, sign-out, refresh).
 */
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { buildGoogleAuthUrl, fetchCurrentUser, postLogout } from "@/lib/auth/api";
import { AuthContext, type AuthContextValue } from "@/lib/auth/context";
import { clearStoredToken, getStoredToken } from "@/lib/auth/token";
import type { AuthUser, UserRole } from "@/types/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const restoreSession = useCallback(async () => {
    const stored = getStoredToken();
    if (!stored) {
      setLoading(false);
      return;
    }

    setToken(stored);
    try {
      const me = await fetchCurrentUser(stored);
      setUser(me);
      setError(null);
    } catch (err) {
      // Token invalid or expired — fall back to a signed-out state.
      clearStoredToken();
      setToken(null);
      setUser(null);
      setError(err instanceof Error ? err.message : "Session expired");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  const refreshUser = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const me = await fetchCurrentUser(token);
      setUser(me);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh profile");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const signInWithGoogle = useCallback(() => {
    window.location.href = buildGoogleAuthUrl();
  }, []);

  const signOut = useCallback(async () => {
    await postLogout(token);
    clearStoredToken();
    setUser(null);
    setToken(null);
    setError(null);
  }, [token]);

  const hasRole = useCallback(
    (roles: UserRole[]) => user != null && roles.includes(user.role),
    [user]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      error,
      isAuthenticated: user != null,
      hasRole,
      signInWithGoogle,
      signOut,
      refreshUser,
    }),
    [user, token, loading, error, hasRole, signInWithGoogle, signOut, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}