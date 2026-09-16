"use client";

import React from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Save, Bell, Shield, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <DashboardHeader
        title="Settings"
        subtitle="Platform configuration and preferences"
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-3xl">
        {/* General Settings */}
        <Card
          glass
          className="p-4 sm:p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
        >
          <CardHeader className="p-0 mb-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#4A6B5D]" />
              <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
                General
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <Input label="Platform Name" defaultValue="PureTalks" />
            <Input
              label="Support Email"
              defaultValue="support@puretalks.in"
              type="email"
            />
            <Input
              label="WhatsApp Number"
              defaultValue="+91 98400 12345"
            />
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card
          glass
          className="p-4 sm:p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
        >
          <CardHeader className="p-0 mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#C5A869]" />
              <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
                Notifications
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 space-y-3">
            {[
              "New booking notifications",
              "Cancellation alerts",
              "Weekly revenue report",
              "Low utilization warnings",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center justify-between py-2"
              >
                <span className="text-sm text-[#1C2024]">{item}</span>
                <div className="w-10 h-5 rounded-full bg-[#4A6B5D] relative cursor-pointer">
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
                </div>
              </label>
            ))}
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card
          glass
          className="p-4 sm:p-6 border-black/[0.07] bg-white shadow-card rounded-2xl"
        >
          <CardHeader className="p-0 mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#4A6B5D]" />
              <CardTitle className="text-base font-serif font-bold text-[#1C2024]">
                Security
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <Input
              label="Admin Password"
              type="password"
              defaultValue="••••••••"
            />
            <Input
              label="Two-Factor Authentication"
              defaultValue="Enabled"
              disabled
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            variant="primary"
            size="md"
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
