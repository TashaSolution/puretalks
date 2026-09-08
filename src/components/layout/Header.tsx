"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { mainNavItems } from "@/config/navigation";
import { Button } from "@/ui/Button";
import { MobileNav } from "./MobileNav";
import { Shield, Sparkles, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-black/[0.06] shadow-sm py-3.5"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <Image 
              src="/images/logo/image.png" 
              alt="PureTalks Logo" 
              width={40} 
              height={40} 
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold tracking-tight text-[#1C2024] flex items-center gap-1.5">
              PureTalks
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B5D] animate-pulse" />
            </span>
            <span className="text-[10px] tracking-widest text-[#6B7280] uppercase font-semibold">
              Private Sanctuary
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-white/70 border border-black/[0.06] backdrop-blur-md shadow-soft">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-1.5",
                  isActive
                    ? "text-[#1C2024] bg-[#F4EFEA] shadow-sm font-bold border border-[#E8DFC5]/50"
                    : "text-[#4B5563] hover:text-[#1C2024] hover:bg-black/[0.03]"
                )}
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-[#4A6B5D]/10 text-[#3B5749] border border-[#4A6B5D]/20 font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden lg:flex items-center gap-3.5">
          <Link href="/book">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              className="shadow-sm shadow-[#4A6B5D]/20 font-semibold"
            >
              Book Session
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="p-2 rounded-xl bg-white border border-black/[0.08] text-[#1C2024] hover:bg-[#F4EFEA] shadow-sm"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </header>
  );
}
