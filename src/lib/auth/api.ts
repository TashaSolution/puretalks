/**
 * PureTalks Auth API client.
 *
 * Talks to the FastAPI backend auth endpoints:
 *   - GET  {API_BASE_URL}/auth/me          → current user from a Bearer token
 *   - POST {API_BASE_URL}/auth/logout      → best-effort server logout
 *
 * Base URL mirrors src/lib/api/client.ts (NEXT_PUBLIC_API_BASE_URL).
 */

import type { AuthUser, DecodedJwt, UserRole } from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

/** Absolute link that starts the Google OAuth Authorization Code flow. */
export function buildGoogleAuthUrl(): string {
  return `${API_BASE_URL}/auth/google`;
}

export async function fetchCurrentUser(token: string): Promise<AuthUser> {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    let message = `Failed to fetch profile (${res.status})`;
    try {
      const body = (await res.json()) as { detail?: string };
      if (body?.detail) message = body.detail;
    } catch {
      // non-JSON error body — keep the generic message
    }
    throw new Error(message);
  }

  return (await res.json()) as AuthUser;
}

/** Best-effort server logout; the client always clears its token locally. */
export async function postLogout(token: string | null): Promise<void> {
  if (!token) return;
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    // Network/server errors must not block client-side logout.
  }
}

/**
 * Decode the JWT payload for client-side role hints.
 *
 * NOTE: This does NOT verify the signature — it is only used to make
 * UX decisions (e.g. redirecting a user role away from /admin). Real
 * authorization is enforced by the backend on every API call.
 */
export function decodeJwtPayload(token: string | null): DecodedJwt | null {
  if (!token) return null;
  try {
    const [, payloadB64] = token.split(".");
    if (!payloadB64) return null;
    const padded = payloadB64.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(padded);
    return JSON.parse(json) as DecodedJwt;
  } catch {
    return null;
  }
}

export function isAllowedRole(token: string | null, roles: UserRole[]): boolean {
  const payload = decodeJwtPayload(token);
  return payload?.role != null && roles.includes(payload.role);
}