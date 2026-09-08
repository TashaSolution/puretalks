import React from "react";
import { FAQSection } from "@/components/sections/FAQSection";
import { Badge } from "@/ui/Badge";
import { HelpCircle } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions — PureTalks",
  description: "Find answers to questions about privacy, confidential consultations, booking process, and pricing.",
};

export default function FAQPage() {
  return (
    <div className="pt-24 pb-12">
      <FAQSection />
    </div>
  );
}
