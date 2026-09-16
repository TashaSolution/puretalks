"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";

import { Button } from "@/ui/Button";
import { getApiBaseUrl, decodeJwtPayload } from "@/lib/auth/api";
import { setStoredToken } from "@/lib/auth/token";

export interface OtpVerifyFormProps {
  email: string;
  onBack: () => void;
}

export function OtpVerifyForm({ email, onBack }: OtpVerifyFormProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError(null);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    if (newCode.every((d) => d !== "")) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const newCode = pasted.split("");
      setCode(newCode);
      setError(null);
      handleVerify(pasted);
    }
  };

  const handleVerify = async (otpCode: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${getApiBaseUrl()}/auth/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otpCode }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.detail || "Invalid OTP code");
      }

      const data = (await res.json()) as { token: string; role: string };
      setStoredToken(data.token);

      // Redirect based on role
      const payload = decodeJwtPayload(data.token);
      const role = payload?.role || data.role;
      if (role === "admin") {
        window.location.replace("/admin");
      } else {
        window.location.replace("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#4A6B5D] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to email
      </button>

      <p className="text-xs text-[#6B7280]">
        We sent a 6-digit code to <span className="font-medium text-[#1C2024]">{email}</span>
      </p>

      {/* OTP Input */}
      <div className="flex justify-center gap-2.5" onPaste={handlePaste}>
        {code.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            disabled={loading}
            className="w-11 h-12 text-center text-lg font-semibold rounded-xl border border-black/10 bg-[#FAF8F5] text-[#1C2024] transition-all duration-200 focus:outline-none focus:bg-white focus:border-[#4A6B5D] focus:ring-2 focus:ring-[#4A6B5D]/20 disabled:opacity-50 shadow-inner-sm"
          />
        ))}
      </div>

      {error && (
        <p className="text-xs text-red-600 text-center">{error}</p>
      )}

      {loading && (
        <div className="flex items-center justify-center gap-2 text-sm text-[#4A6B5D]">
          <CheckCircle className="w-4 h-4 animate-pulse" />
          Verifying...
        </div>
      )}
    </div>
  );
}
