"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavItems } from "@/config/navigation";
import { Button } from "@/ui/Button";
import { X, Shield, Sparkles, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#FAF8F5] border-l border-black/10 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-black/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#4A6B5D]/10 text-[#4A6B5D] flex items-center justify-center border border-[#4A6B5D]/20">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-lg text-[#1C2024]">PureTalks</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#4B5563] hover:text-[#1C2024] bg-white border border-black/10 shadow-sm"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav list */}
          <nav className="flex flex-col gap-2 mt-6">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between",
                    isActive
                      ? "bg-[#F4EFEA] text-[#1C2024] border border-[#E8DFC5]"
                      : "text-[#4B5563] hover:bg-black/[0.04] hover:text-[#1C2024]"
                  )}
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#4A6B5D]/10 text-[#3B5749] border border-[#4A6B5D]/20 font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Privacy badge in mobile */}
          <div className="mt-8 p-4 rounded-xl bg-[#4A6B5D]/8 border border-[#4A6B5D]/20 flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#4A6B5D] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#3B5749]">
                100% Confidential
              </p>
              <p className="text-[11px] text-[#4B5563] mt-0.5">
                Anonymous audio mode with zero recording policy.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-black/10 space-y-3">
          <Link href="/book" onClick={onClose} className="w-full block">
            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-sm font-bold"
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Book Private Session
            </Button>
          </Link>
          <p className="text-center text-[11px] text-[#6B7280]">
            Peer-to-Peer Encrypted Sanctuary
          </p>
        </div>
      </div>
    </div>
  );
}
