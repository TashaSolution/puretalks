/**
 * PureTalks API Client
 *
 * Provides a unified abstraction layer for data fetching.
 * Seamlessly toggles between local mock data and remote REST/GraphQL backend via NEXT_PUBLIC_API_BASE_URL.
 */

import { getStoredToken } from "@/lib/auth/token";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const USE_MOCK_DATA = !API_BASE_URL;

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
  mockFallback?: () => Promise<T> | T
): Promise<T> {
  if (USE_MOCK_DATA && mockFallback) {
    await new Promise((res) => setTimeout(res, 120));
    return mockFallback();
  }

  try {
    const token = getStoredToken();
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    if (mockFallback) {
      console.warn(`[PureTalks API] Falling back to mock data for: ${endpoint}`, error);
      return mockFallback();
    }
    throw error;
  }
}
