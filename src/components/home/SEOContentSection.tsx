"use client";

import React from "react";
import Link from "next/link";
import { Shield, Lock, Video, Mic, EyeOff } from "lucide-react";

export function SEOContentSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Primary SEO Content Block */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C2024] tracking-tight">
              India&apos;s Private Online Mental Health Consultation Platform
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#4B5563] leading-relaxed">
              <p>
                PureTalks is a trusted online therapy India platform connecting you with licensed psychologists, relationship counselors, and executive coaches. Whether you&apos;re seeking online counseling India for anxiety, depression, stress management, or relationship issues, our verified professionals provide confidential support through secure video, audio, and anonymous consultation modes.
              </p>
              <p>
                Our mental health consultation online India service offers sessions starting from just ₹399, making professional therapy accessible to everyone. Each consultant on our platform is thoroughly verified — we check credentials, licenses, and professional backgrounds to ensure you receive quality care from the best psychologist online India has to offer.
              </p>
              <p>
                With anonymous mode available, you can speak freely about personal struggles without revealing your identity. No session recordings, no data logging, and end-to-end encryption ensure your complete privacy. Whether you&apos;re in Mumbai, Delhi, Bangalore, Chennai, or any city across India, our video therapy India and teletherapy India services bring professional mental health support to your doorstep.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/[0.04]">
              <Video className="w-5 h-5 text-[#4A6B5D] mb-2" />
              <h3 className="text-sm font-semibold text-[#1C2024] mb-1">Video Consultation</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Face-to-face online therapy sessions with licensed psychologists via secure HD video.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/[0.04]">
              <Mic className="w-5 h-5 text-[#4A6B5D] mb-2" />
              <h3 className="text-sm font-semibold text-[#1C2024] mb-1">Audio Consultation</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Voice-only therapy sessions for those who prefer talking without video.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/[0.04]">
              <EyeOff className="w-5 h-5 text-[#4A6B5D] mb-2" />
              <h3 className="text-sm font-semibold text-[#1C2024] mb-1">Anonymous Mode</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Complete anonymity — speak freely without revealing your identity.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/[0.04]">
              <Shield className="w-5 h-5 text-[#4A6B5D] mb-2" />
              <h3 className="text-sm font-semibold text-[#1C2024] mb-1">Zero Data Logging</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                No session recordings, no transcripts — your privacy is absolute.
              </p>
            </div>
          </div>

          {/* Secondary SEO Content Block */}
          <div className="space-y-4 text-sm text-[#4B5563] leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1C2024] tracking-tight">
              Online Counseling for Every Need
            </h2>
            <p>
              Our online psychologist India network covers a wide range of specializations. From couples counseling online India and marriage guidance to career coaching, youth mentoring, and mindfulness sessions — PureTalks offers comprehensive mental health support tailored to your unique needs.
            </p>
            <p>
              We serve clients across all major Indian cities including Mumbai, Delhi NCR, Bangalore, Hyderabad, Chennai, Pune, Kolkata, and Ahmedabad. Our affordable online therapy India pricing starts at ₹399 for a 30-minute session, with 45-minute and 60-minute options also available.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/experts"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4A6B5D] text-white text-xs font-semibold hover:bg-[#3B5749] transition-colors"
              >
                Browse Our Experts
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-black/[0.08] text-[#1C2024] text-xs font-semibold hover:bg-[#F4EFEA] transition-colors"
              >
                Book a Session — From ₹399
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 py-6 border-t border-b border-black/[0.04]">
            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
              <Lock className="w-4 h-4 text-[#4A6B5D]" />
              <span>End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
              <Shield className="w-4 h-4 text-[#4A6B5D]" />
              <span>RCI-Licensed Professionals</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
              <span className="text-[#C5A869] font-bold">★</span>
              <span>4.96/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
              <span className="text-[#4A6B5D] font-bold">₹</span>
              <span>Starting from ₹399</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
