/**
 * Edge middleware — role-based route protection.
 *
 * Guarded routes:
 *   - /auth/signin  → signed-in users go to /dashboard
 *   - /dashboard/** → any authenticated user
 *   - /admin/**     → role === "admin" only
 *
 * NOTE: The JWT is only decoded here for UX redirects — signature checks and
 * authorization are enforced server-side by the backend.
 */
import { NextRequest, NextResponse } from "next/server";

import type { DecodedJwt } from "@/types/auth";

const AUTH_COOKIE = "pt_auth_token";

const AUTH_PATH = "/auth/signin";
const DASHBOARD_PATH = "/dashboard";

function decodeRole(token: string): string | null {
  try {
    const [, payloadB64] = token.split(".");
    if (!payloadB64) return null;
    const padded = payloadB64.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(padded)) as DecodedJwt;
    return payload.role ?? null;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE)?.value;

  const isAuthPage = pathname === AUTH_PATH || pathname.startsWith("/auth/");
  const isDashboard = pathname === DASHBOARD_PATH || pathname.startsWith(`${DASHBOARD_PATH}/`);
  const isAdminArea = pathname === "/admin" || pathname.startsWith("/admin/");

  // Already signed in → never show the sign-in page again.
  if (isAuthPage && token) {
    const role = decodeRole(token);
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
  }

  // Signed out → send to sign-in, remembering where they were headed.
  if ((isDashboard || isAdminArea) && !token) {
    const signinUrl = new URL(AUTH_PATH, request.url);
    signinUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(signinUrl);
  }

  // Admin area requires the admin role (UX-level check only).
  if (isAdminArea && token) {
    const role = decodeRole(token);
    if (role !== "admin") {
      return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/auth/signin"],
};
