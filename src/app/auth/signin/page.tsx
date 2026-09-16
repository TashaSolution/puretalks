/**
 * /auth/signin — entry point for authentication.
 *
 * Supports two login methods:
 *   1. Google OAuth: backend redirects here with ?token=<jwt>
 *   2. Email OTP: user enters email → receives OTP → verifies → gets JWT
 *
 * After storing the token, redirects to ?next= or role-based default.
 */
"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Lock, Mail, Sparkles } from "lucide-react";

import { SignInButton } from "@/components/auth/SignInButton";
import { EmailSignInForm } from "@/components/auth/EmailSignInForm";
import { OtpVerifyForm } from "@/components/auth/OtpVerifyForm";
import { setStoredToken } from "@/lib/auth/token";
import { decodeJwtPayload } from "@/lib/auth/api";
import { Button } from "@/ui/Button";

type SignInStep = "choose" | "email" | "otp-sent";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const oauthError = searchParams.get("error");
  const next = searchParams.get("next") || "/dashboard";
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<SignInStep>("choose");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!token) return;

    setProcessing(true);
    setStoredToken(token);

    // Decode role and redirect accordingly
    const payload = decodeJwtPayload(token);
    const role = payload?.role;

    if (role === "admin") {
      window.location.replace("/admin");
    } else {
      const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
      window.location.replace(safeNext);
    }
  }, [token, next]);

  const handleOtpSent = (sentEmail: string) => {
    setEmail(sentEmail);
    setStep("otp-sent");
  };

  const handleBackToOtp = () => {
    setStep("email");
    setEmail("");
  };

  const handleBackToChoose = () => {
    setStep("choose");
    setEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[#FAF8F5]">
      <div className="w-full max-w-md">
        {/* Brand mark */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-[#4A6B5D]/10 text-[#4A6B5D] flex items-center justify-center border border-[#4A6B5D]/20">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-serif font-bold text-2xl text-[#1C2024]">PureTalks</span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-[#1C2024]">
            {processing ? "Signing you in…" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-[#6B7280]">
            Private. Confidential. Your space to talk.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white border border-black/[0.06] shadow-card p-7">
          {processing ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-10 h-10 rounded-full border-[3px] border-[#4A6B5D]/20 border-t-[#4A6B5D] animate-spin" />
            </div>
          ) : oauthError ? (
            <div className="space-y-5">
              <div className="rounded-2xl bg-red-50 border border-red-100 p-4 text-sm text-[#B3362B]">
                Google sign-in was cancelled or failed. Please try again.
              </div>
              <SignInButton className="w-full" size="lg" />
            </div>
          ) : step === "otp-sent" ? (
            <OtpVerifyForm email={email} onBack={handleBackToOtp} />
          ) : step === "email" ? (
            <div className="space-y-5">
              <button
                type="button"
                onClick={handleBackToChoose}
                className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#4A6B5D] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
                Back to login
              </button>

              <EmailSignInForm onSuccess={handleOtpSent} />
            </div>
          ) : (
            <div className="space-y-5">
              <SignInButton className="w-full" size="lg" />

              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => setStep("email")}
                leftIcon={<Mail className="w-4 h-4" />}
              >
                Continue with Email
              </Button>

              <div className="rounded-2xl bg-[#F4EFEA] border border-[#E8DFC5]/60 p-4 flex items-start gap-3">
                <Lock className="w-4 h-4 text-[#4A6B5D] shrink-0 mt-0.5" />
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  We use Google OAuth or email verification — we never store passwords.
                  Your identity stays private on our sanctuary.
                </p>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-[#9CA3AF] leading-relaxed">
          By continuing you agree to our{" "}
          <Link href="/terms" className="underline hover:text-[#4A6B5D]">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-[#4A6B5D]">
            Privacy Policy
          </Link>
          .
        </p>

        <p className="mt-4 text-center text-[11px] text-[#B8B3A8] flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" /> Peer-to-peer encrypted sanctuary
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5]" />}>
      <SignInContent />
    </Suspense>
  );
}
