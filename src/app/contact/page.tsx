"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { Input } from "@/ui/Input";
import { siteConfig } from "@/config/site";
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldAlert } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="sage" size="sm" className="font-semibold">
          <Mail className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
          Care & Support
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C2024] tracking-tight">
          Get in Touch with PureTalks
        </h1>
        <p className="text-sm text-[#6B7280]">
          Have queries about counseling, corporate wellness partnerships, or expert onboarding? Send us a confidential note.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <Card glass className="p-8 border-black/[0.07] bg-white shadow-card rounded-2xl space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#1C2024] tracking-tight">
              Support Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#4A6B5D]/10 text-[#4A6B5D] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#6B7280] block font-medium">Email Support</span>
                  <span className="font-bold text-[#1C2024] text-sm">{siteConfig.contact.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#C5A869]/15 text-[#8A6E2D] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#6B7280] block font-medium">WhatsApp Care</span>
                  <span className="font-bold text-[#1C2024] text-sm">{siteConfig.contact.whatsapp}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[#6B7280] block font-medium">Headquarters</span>
                  <span className="font-bold text-[#1C2024]">{siteConfig.contact.address}</span>
                </div>
              </div>
            </div>

            {/* Helpline Alert */}
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-[#4B5563] space-y-1.5">
              <div className="flex items-center gap-1.5 text-red-700 font-bold">
                <ShieldAlert className="w-4 h-4" />
                <span>Emergency Disclaimer</span>
              </div>
              <p className="text-[11px] text-[#6B7280] leading-relaxed">
                PureTalks is not an emergency crisis intervention service. If you or someone you know is in immediate crisis, please call emergency helpline 112 (India) or your local emergency hospital.
              </p>
            </div>
          </Card>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-7">
          <Card glass className="p-8 border-black/[0.07] bg-white shadow-card rounded-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#4A6B5D]/15 text-[#4A6B5D] border border-[#4A6B5D]/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1C2024]">Message Received!</h3>
                <p className="text-xs text-[#6B7280] max-w-md mx-auto font-normal">
                  Thank you for reaching out. Our confidential care manager will respond to your inquiry within 2 to 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-[#1C2024] mb-2">Send a Message</h3>

                <Input
                  label="Your Name / Alias"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. David Wilson"
                />

                <Input
                  label="Email Address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="david@example.com"
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1C2024]">
                    Your Message / Inquiry
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you with our private consultation platform?"
                    className="w-full bg-[#FAF8F5] border border-black/10 rounded-xl p-3 text-xs text-[#1C2024] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#4A6B5D] focus:ring-1 focus:ring-[#4A6B5D]/30"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full shadow-md shadow-[#4A6B5D]/20 font-bold"
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Send Confidential Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-3xl mx-auto text-center space-y-3 pt-8 border-t border-black/[0.06]">
        <p className="text-xs text-[#6B7280]">Looking for something specific?</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/faq" className="text-xs font-semibold text-[#4A6B5D] underline hover:text-[#3B5749]">
            FAQ
          </Link>
          <Link href="/how-it-works" className="text-xs font-semibold text-[#4A6B5D] underline hover:text-[#3B5749]">
            How it works
          </Link>
          <Link href="/consultations" className="text-xs font-semibold text-[#4A6B5D] underline hover:text-[#3B5749]">
            Consultation services
          </Link>
          <Link href="/book" className="text-xs font-semibold text-[#4A6B5D] underline hover:text-[#3B5749]">
            Book a session
          </Link>
        </div>
      </div>
    </div>
  );
}
