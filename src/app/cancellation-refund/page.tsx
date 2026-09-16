import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: `Cancellation and refund policy for ${siteConfig.name} consultation sessions. Easy cancellation up to 24 hours before your session.`,
  alternates: {
    canonical: `${siteConfig.url}/cancellation-refund`,
  },
  openGraph: {
    title: `Cancellation & Refund Policy | ${siteConfig.name}`,
    description: `Cancellation and refund policy for ${siteConfig.name} consultation sessions.`,
    url: `${siteConfig.url}/cancellation-refund`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "PureTalks Cancellation & Refund Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Cancellation & Refund Policy | ${siteConfig.name}`,
    description: `Cancellation and refund policy for ${siteConfig.name} consultation sessions.`,
    images: [siteConfig.ogImage],
  },
};

const refundSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Cancellation & Refund Policy",
  description: `Cancellation and refund policy for ${siteConfig.name} consultation sessions.`,
  url: `${siteConfig.url}/cancellation-refund`,
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Cancellation & Refund Policy", item: `${siteConfig.url}/cancellation-refund` },
  ],
};

export default function CancellationRefundPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(refundSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-white border-b border-black/[0.07]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="flex items-center gap-2 mb-6 text-sm text-[#6B7280] hover:text-[#4A6B5D] transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">Cancellation & Refund Policy</h1>
          <p className="text-sm text-[#6B7280] mt-2">Last updated: September 10, 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">1. Overview</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              At {siteConfig.name}, we understand that plans change. This policy outlines how you can cancel or reschedule your consultation sessions and the applicable refund terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">2. Cancellation by You (Client)</h2>
            <div className="bg-white border border-black/[0.07] rounded-xl p-5 space-y-3">
              <div className="flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-bold uppercase shrink-0 mt-0.5">Full Refund</span>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Cancel <strong>more than 24 hours before</strong> your scheduled session — receive a 100% refund to your original payment method within 5-7 business days.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-xs font-bold uppercase shrink-0 mt-0.5">50% Refund</span>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Cancel <strong>between 12-24 hours before</strong> your scheduled session — receive a 50% refund. The remaining 50% compensates the consultant for holding the time slot.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 text-xs font-bold uppercase shrink-0 mt-0.5">No Refund</span>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Cancel <strong>less than 12 hours before</strong> or no-show — no refund is issued. The consultant has prepared for your session and the time slot cannot be reassigned.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">3. Rescheduling</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              You may reschedule your session free of charge up to 12 hours before the scheduled time. Rescheduling within 12 hours may incur a 10% administrative fee. Each session can be rescheduled a maximum of 2 times.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">4. Cancellation by Consultant</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              If a consultant cancels a session, you will receive a <strong>100% full refund</strong> regardless of timing. You will also receive priority rebooking at your preferred time slot.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">5. Technical Issues</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              If a session cannot be completed due to technical issues on the {siteConfig.name} platform (not client-side connectivity), you will receive a <strong>full refund or complimentary rebooking</strong> at your choice. For client-side connectivity issues, standard cancellation terms apply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">6. How to Cancel</h2>
            <ul className="text-sm text-[#4B5563] leading-relaxed space-y-2 list-disc list-inside">
              <li>Through your booking confirmation email (click &quot;Manage Booking&quot;)</li>
              <li>Via WhatsApp at {siteConfig.contact.whatsapp}</li>
              <li>By emailing <a href={`mailto:${siteConfig.contact.email}`} className="text-[#4A6B5D] hover:underline font-medium">{siteConfig.contact.email}</a></li>
            </ul>
            <p className="text-sm text-[#4B5563] leading-relaxed mt-3">
              Cancellations are processed within 1 business day. Refunds are initiated within 2 business days of approval and reflected in your account within 5-7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">7. Exceptions</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              In exceptional circumstances (medical emergency, natural disaster, or other force majeure events), we offer flexible rebooking or full credit for future sessions on a case-by-case basis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">8. Contact</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              For cancellation or refund inquiries, contact our support team at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-[#4A6B5D] hover:underline font-medium">
                {siteConfig.contact.email}
              </a>{" "}
              or WhatsApp at {siteConfig.contact.whatsapp}. We aim to respond within 2 hours during business hours (9 AM - 9 PM IST).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
