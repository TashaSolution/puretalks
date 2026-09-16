/**
 * Client-side storage for the PureTalks access token.
 *
 * The backend completes Google OAuth by redirecting to
 * /auth/signin?token=<jwt>. We persist that JWT in a cookie so that
 * src/middleware.ts can enforce route-level redirects before React hydrates,
 * and so the AuthProvider can restore the session after a page reload.
 */

import Cookies from "js-cookie";

export const AUTH_COOKIE_NAME = "pt_auth_token";

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

export function getStoredToken(): string | null {
  const token = Cookies.get(AUTH_COOKIE_NAME);
  return token && token.length > 0 ? token : null;
}

export function setStoredToken(token: string): void {
  Cookies.set(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);
}

export function clearStoredToken(): void {
  Cookies.remove(AUTH_COOKIE_NAME, { path: "/" });
}