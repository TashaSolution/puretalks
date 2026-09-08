"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Shield, Lock, ArrowUpRight } from "lucide-react";
import { categoriesData } from "@/data/categories";

export function Footer() {
  return (
    <footer className="relative bg-[#F4EFEA] border-t border-black/[0.08] pt-16 pb-12 overflow-hidden text-[#1C2024]">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#C5A869]/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-black/[0.08]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4A6B5D] to-[#C5A869] p-[1px] shadow-sm">
                <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#4A6B5D]" />
                </div>
              </div>
              <span className="text-xl font-serif font-bold tracking-tight text-[#1C2024]">
                PureTalks
              </span>
            </Link>
            <p className="text-sm text-[#4B5563] max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#3B5749] bg-[#4A6B5D]/10 border border-[#4A6B5D]/20 px-3.5 py-2 rounded-xl max-w-xs font-medium">
              <Lock className="w-4 h-4 shrink-0 text-[#4A6B5D]" />
              <span>100% Confidential & Encrypted</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C2024]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-[#4B5563] hover:text-[#4A6B5D] transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/experts" className="text-[#4B5563] hover:text-[#4A6B5D] transition-colors flex items-center gap-1 font-medium">
                  Our Experts
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/consultations" className="text-[#4B5563] hover:text-[#4A6B5D] transition-colors font-medium">
                  Consultation Domains
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-[#4B5563] hover:text-[#4A6B5D] transition-colors font-medium">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#4B5563] hover:text-[#4A6B5D] transition-colors font-medium">
                  Our Sanctuary
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C2024]">
              Specializations
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categoriesData.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/consultations/${cat.slug}`}
                    className="text-[#4B5563] hover:text-[#4A6B5D] transition-colors line-clamp-1 font-medium"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C2024]">
              Support & Care
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/faq" className="text-[#4B5563] hover:text-[#4A6B5D] transition-colors font-medium">
                  FAQ & Help
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#4B5563] hover:text-[#4A6B5D] transition-colors font-medium">
                  Contact Care Team
                </Link>
              </li>
              <li className="pt-2 text-xs text-[#6B7280]">
                <span className="block text-[#1C2024] font-semibold">{siteConfig.contact.email}</span>
                <span className="block">{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency Disclaimer Alert */}
        <div className="mt-8 p-4 rounded-xl bg-white/80 border border-red-500/20 text-xs text-[#4B5563] flex items-start gap-3 shadow-xs">
          <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-bold text-[10px] uppercase shrink-0 mt-0.5 border border-red-200">
            Disclaimer
          </span>
          <p className="leading-relaxed">
            If you or someone you know is undergoing an immediate life-threatening crisis or psychiatric emergency, please contact your local emergency hospital or crisis helpline (India: 112 / Vandrevala Foundation: 9999 666 555). PureTalks is a professional counseling and mentorship platform.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] gap-4">
          <p>© {new Date().getFullYear()} PureTalks.in. All rights reserved.</p>
          <div className="flex items-center gap-6 font-medium">
            <span>Private Sanctuary</span>
            <span>•</span>
            <span>Zero Data Logging</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
