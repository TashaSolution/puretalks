export interface FAQItem {
  id: string;
  category: "privacy" | "booking" | "general" | "pricing";
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "privacy",
    question: "How is my privacy and identity protected during consultations?",
    answer: "PureTalks was architected from the ground up as a confidential sanctuary. We enforce a strict zero-recording policy across all calls. Sessions use peer-to-peer WebRTC encryption. Additionally, our Anonymous Mode lets you join with a pseudonym name and keep your camera off.",
  },
  {
    id: "faq-2",
    category: "booking",
    question: "Do I need to download any mobile app or software?",
    answer: "No. You don't need to install any app. As soon as you book a slot, an encrypted private room link is generated. Simply click the link on your phone or laptop browser to connect instantly at your scheduled time.",
  },
  {
    id: "faq-3",
    category: "privacy",
    question: "Can I choose audio-only or turn my camera off?",
    answer: "Yes, absolutely. You have complete control. You can choose Private Audio Call or Anonymous Stealth Mode where video is completely turned off by default.",
  },
  {
    id: "faq-4",
    category: "booking",
    question: "What if I need to reschedule or cancel my consultation?",
    answer: "You can reschedule your session free of charge up to 2 hours before the scheduled slot time through your confirmation email link or by contacting our care support.",
  },
  {
    id: "faq-5",
    category: "general",
    question: "Are the psychologists and counselors accredited?",
    answer: "Yes. Every expert on PureTalks undergoes background verification, credential authentication, and clinical ethics vetting. We only onboard licensed psychologists (M.Phil/Ph.D.), certified therapists, and ICF-accredited leadership mentors.",
  },
];
