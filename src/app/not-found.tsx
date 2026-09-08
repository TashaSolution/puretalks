import React from "react";
import Link from "next/link";
import { Button } from "@/ui/Button";
import { ShieldAlert, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center container mx-auto px-4 text-center">
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-black/[0.08] shadow-card max-w-lg space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#4A6B5D]/10 border border-[#4A6B5D]/25 text-[#4A6B5D] flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#4A6B5D]">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C2024]">
            Page Sanctuary Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
            The page or consultation session you are looking for may have expired, moved, or is completely private.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="font-semibold shadow-md shadow-[#4A6B5D]/20" leftIcon={<Home className="w-4 h-4" />}>
              Return to Home
            </Button>
          </Link>
          <Link href="/experts" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="font-medium">
              Browse Experts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
