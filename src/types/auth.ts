/**
 * Authentication types for the PureTalks frontend.
 *
 * Mirrors the backend auth contract (/auth/me, /auth/google/callback):
 *   - User:      serialized User model returned by the API
 *   - UserRole:  role-based access levels enforced by the backend dependencies
 *   - AuthUser:  "me" payload hydrated into the client-side auth context
 */

export type UserRole = "user" | "consultant" | "admin";

export const USER_ROLES: UserRole[] = ["user", "consultant", "admin"];

export interface AuthUser {
  id: number;
  google_id: string;
  email: string;
  name: string;
  image: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

/** Error payload shape returned by the backend for auth failures. */
export interface AuthErrorResponse {
  error: {
    code: number;
    message: string;
    detail?: string;
  };
}

/** Minimal JWT payload used for client-side role hints (UX only). */
export interface DecodedJwt {
  sub?: string;
  role?: UserRole;
  exp?: number;
  iat?: number;
  iss?: string;
}