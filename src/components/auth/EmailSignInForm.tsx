"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";

import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { getApiBaseUrl } from "@/lib/auth/api";

export interface EmailSignInFormProps {
  onSuccess: (email: string) => void;
}

export function EmailSignInForm({ onSuccess }: EmailSignInFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${getApiBaseUrl()}/auth/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.detail || "Failed to send OTP");
      }

      onSuccess(trimmed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<Mail className="w-4 h-4" />}
        autoComplete="email"
        autoFocus
      />
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={loading}
        disabled={loading}
      >
        Send OTP Code
      </Button>
    </form>
  );
}
