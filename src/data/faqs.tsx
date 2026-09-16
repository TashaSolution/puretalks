import React from "react";
import Link from "next/link";

export interface FAQItem {
  id: string;
  category: "privacy" | "booking" | "general" | "pricing";
  question: string;
  answer: string;
  answerNode?: React.ReactNode;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "general",
    question: "What is PureTalks?",
    answer:
      "PureTalks is a private online consultation platform offering confidential sessions with verified psychologists, relationship counselors, executive coaches, and wellness experts. Sessions are conducted via encrypted video, audio, or anonymous stealth mode.",
    answerNode: (
      <>
        PureTalks is a private online consultation platform offering confidential sessions with verified{" "}
        <Link href="/experts" className="underline hover:text-[#4A6B5D]">
          psychologists, relationship counselors, executive coaches
        </Link>
        , and wellness experts. Sessions are conducted via encrypted video, audio, or anonymous stealth mode.{" "}
        <Link href="/how-it-works" className="underline hover:text-[#4A6B5D]">
          Learn how it works
        </Link>
        .
      </>
    ),
  },
  {
    id: "faq-2",
    category: "general",
    question: "What can I discuss in a PureTalks consultation?",
    answer:
      "You can discuss emotional healing, relationship and marriage concerns, career and leadership challenges, personal growth and confidence, youth and academic guidance, or mindfulness and lifestyle topics.",
    answerNode: (
      <>
        You can discuss{" "}
        <Link href="/consultations/mental-health-healing" className="underline hover:text-[#4A6B5D]">
          emotional healing
        </Link>
        ,{" "}
        <Link href="/consultations/relationship-marriage-counseling" className="underline hover:text-[#4A6B5D]">
          relationship and marriage concerns
        </Link>
        ,{" "}
        <Link href="/consultations/career-leadership-growth" className="underline hover:text-[#4A6B5D]">
          career and leadership challenges
        </Link>
        ,{" "}
        <Link href="/consultations/personal-growth-confidence" className="underline hover:text-[#4A6B5D]">
          personal growth and confidence
        </Link>
        ,{" "}
        <Link href="/consultations/youth-academic-clarity" className="underline hover:text-[#4A6B5D]">
          youth and academic guidance
        </Link>
        , or{" "}
        <Link href="/consultations/mindfulness-lifestyle-calm" className="underline hover:text-[#4A6B5D]">
          mindfulness and lifestyle topics
        </Link>
        . Explore all{" "}
        <Link href="/consultations" className="underline hover:text-[#4A6B5D]">
          consultation categories
        </Link>
        .
      </>
    ),
  },
  {
    id: "faq-3",
    category: "general",
    question: "How do I choose the right expert?",
    answer:
      "Browse our verified experts directory, filter by specialization and availability, and review each expert's credentials, experience, and client ratings before booking.",
    answerNode: (
      <>
        Browse our{" "}
        <Link href="/experts" className="underline hover:text-[#4A6B5D]">
          verified experts directory
        </Link>
        , filter by specialization and availability, and review each expert&apos;s credentials, experience, and client ratings before booking.
      </>
    ),
  },
  {
    id: "faq-4",
    category: "booking",
    question: "How do I book a consultation?",
    answer:
      "Choose an expert, select your preferred date, time, and consultation mode (video, audio, or anonymous), then complete payment. You will receive an encrypted room link for your session.",
    answerNode: (
      <>
        <Link href="/how-it-works" className="underline hover:text-[#4A6B5D]">
          Choose an expert
        </Link>
        , select your preferred date, time, and consultation mode (video, audio, or anonymous), then complete payment. You will receive an encrypted room link for your session.{" "}
        <Link href="/book" className="underline hover:text-[#4A6B5D]">
          Book now
        </Link>
        .
      </>
    ),
  },
  {
    id: "faq-5",
    category: "booking",
    question: "What happens during a consultation?",
    answer:
      "At your scheduled time, click the encrypted room link to connect with your expert in a private, confidential session. No app download is required — join from any browser on your phone or laptop.",
    answerNode: (
      <>
        At your scheduled time, click the encrypted room link to connect with your expert in a private, confidential session. No app download is required — join from any browser on your phone or laptop.{" "}
        <Link href="/how-it-works" className="underline hover:text-[#4A6B5D]">
          Learn more about the process
        </Link>
        .
      </>
    ),
  },
  {
    id: "faq-6",
    category: "booking",
    question: "How long does a consultation last?",
    answer:
      "Standard consultations are available in 25-minute and 50-minute sessions. The right duration depends on your needs and the consultation type.",
  },
  {
    id: "faq-7",
    category: "privacy",
    question: "How is my privacy and identity protected during consultations?",
    answer:
      "PureTalks was architected from the ground up as a confidential sanctuary. We enforce a strict zero-recording policy across all calls. Sessions use peer-to-peer WebRTC encryption. Additionally, our Anonymous Mode lets you join with a pseudonym name and keep your camera off.",
  },
  {
    id: "faq-8",
    category: "privacy",
    question: "Can I choose audio-only or turn my camera off?",
    answer:
      "Yes, absolutely. You have complete control. You can choose Private Audio Call or Anonymous Stealth Mode where video is completely turned off by default.",
  },
  {
    id: "faq-9",
    category: "booking",
    question: "Do I need to download any mobile app or software?",
    answer:
      "No. You don't need to install any app. As soon as you book a slot, an encrypted private room link is generated. Simply click the link on your phone or laptop browser to connect instantly at your scheduled time.",
  },
  {
    id: "faq-10",
    category: "booking",
    question: "What if I need to reschedule or cancel my consultation?",
    answer:
      "You can reschedule your session free of charge up to 2 hours before the scheduled slot time through your confirmation email link or by contacting our care support.",
  },
  {
    id: "faq-11",
    category: "general",
    question: "Are the psychologists and counselors accredited?",
    answer:
      "Yes. Every expert on PureTalks undergoes background verification, credential authentication, and clinical ethics vetting. We only onboard licensed psychologists (M.Phil/Ph.D.), certified therapists, and ICF-accredited leadership mentors.",
  },
  {
    id: "faq-12",
    category: "general",
    question: "How do I contact PureTalks?",
    answer:
      "You can reach us via email at care@puretalks.in or through WhatsApp at +91 98400 12345. For detailed inquiries, use our contact form.",
    answerNode: (
      <>
        You can reach us via email at care@puretalks.in or through WhatsApp at +91 98400 12345. For detailed inquiries, visit our{" "}
        <Link href="/contact" className="underline hover:text-[#4A6B5D]">
          contact page
        </Link>
        .
      </>
    ),
  },
];
