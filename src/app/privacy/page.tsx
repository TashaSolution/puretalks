import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name} — how we protect your data under India's DPDP Act 2023.`,
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Privacy Policy for ${siteConfig.name} — learn how we protect your personal data.`,
    url: `${siteConfig.url}/privacy`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "PureTalks Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Privacy Policy for ${siteConfig.name} — learn how we protect your personal data.`,
    images: [siteConfig.ogImage],
  },
};

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name} — India's private online mental health consultation platform.`,
  url: `${siteConfig.url}/privacy`,
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${siteConfig.url}/privacy` },
  ],
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-white border-b border-black/[0.07]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="flex items-center gap-2 mb-6 text-sm text-[#6B7280] hover:text-[#4A6B5D] transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-[#6B7280] mt-2">Last updated: September 10, 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">1. Introduction</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our online consultation platform at {siteConfig.url}. This policy complies with India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act) and other applicable data protection regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">2. Information We Collect</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed mb-3">We collect only the minimum information necessary to provide our services:</p>
            <ul className="text-sm text-[#4B5563] leading-relaxed space-y-2 list-disc list-inside">
              <li><strong>Booking Information:</strong> Name, email address, and phone number — provided solely for scheduling and session communication.</li>
              <li><strong>Payment Information:</strong> Processed securely by our PCI-compliant payment partners. We do not store credit card numbers, debit card numbers, or UPI PINs on our servers.</li>
              <li><strong>Technical Data:</strong> Browser type, device information, and IP address — collected automatically for security and performance optimization.</li>
              <li><strong>Usage Data:</strong> Pages visited, session duration, and interaction patterns — used in aggregate (anonymized) to improve our platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">3. What We Do NOT Collect</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed mb-3">This is central to our promise:</p>
            <ul className="text-sm text-[#4B5563] leading-relaxed space-y-2 list-disc list-inside">
              <li><strong>Session Content:</strong> We do not record, store, or access any audio, video, or text content from your consultations.</li>
              <li><strong>Session Transcripts:</strong> No transcripts or summaries are created or retained.</li>
              <li><strong>Consultation Notes:</strong> Any notes are maintained exclusively by the consultant on their own systems.</li>
              <li><strong>Camera/Microphone Data:</strong> All media streams are peer-to-peer encrypted and never pass through our servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">4. How We Use Your Information</h2>
            <ul className="text-sm text-[#4B5563] leading-relaxed space-y-2 list-disc list-inside">
              <li>To schedule and facilitate your consultation sessions</li>
              <li>To send booking confirmations and session reminders</li>
              <li>To process payments securely</li>
              <li>To respond to your support inquiries</li>
              <li>To improve platform performance and user experience (using anonymized, aggregated data)</li>
              <li>To comply with legal obligations under Indian law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">5. Data Sharing & Third Parties</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              We do not sell, rent, or trade your personal information. Data is shared only with:
            </p>
            <ul className="text-sm text-[#4B5563] leading-relaxed mt-3 space-y-2 list-disc list-inside">
              <li><strong>Consultants:</strong> Your name and booking details are shared with your chosen consultant to facilitate the session.</li>
              <li><strong>Payment Processors:</strong> For secure transaction processing (Razorpay, Stripe, or equivalent).</li>
              <li><strong>Analytics:</strong> Google Analytics (GA4) collects anonymized usage data. You may opt out via browser settings.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by Indian law, court order, or regulatory authority.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">6. Data Security</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              We implement industry-standard security measures including TLS/SSL encryption, encrypted data storage, access controls, and regular security audits. All session communication uses end-to-end encryption. While we take every reasonable precaution, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">7. Data Retention</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Booking information is retained for 12 months after your last session for accounting and support purposes. You may request deletion of your data at any time by contacting {siteConfig.contact.email}. Technical logs are automatically purged after 90 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">8. Your Rights (DPDP Act 2023)</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed mb-3">Under India&apos;s DPDP Act 2023, you have the right to:</p>
            <ul className="text-sm text-[#4B5563] leading-relaxed space-y-2 list-disc list-inside">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data.</li>
              <li><strong>Grievance Redressal:</strong> Lodge a complaint regarding data processing.</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">9. Cookies</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {siteConfig.name} uses essential cookies for platform functionality and analytics cookies (Google Analytics) to understand usage patterns. You can manage cookie preferences through your browser settings. Essential cookies cannot be disabled as they are required for the platform to function.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">10. Children&apos;s Privacy</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Our services are intended for users aged 18 and above. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">11. Changes to This Policy</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              We may update this Privacy Policy from time to time. Material changes will be communicated through email or a prominent notice on our platform. The &quot;Last updated&quot; date at the top reflects the most recent revision.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">12. Contact Us</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              For privacy-related inquiries or to exercise your data rights, contact our Data Protection Officer at:
            </p>
            <ul className="text-sm text-[#4B5563] leading-relaxed mt-3 space-y-1">
              <li>Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-[#4A6B5D] hover:underline font-medium">{siteConfig.contact.email}</a></li>
              <li>WhatsApp: {siteConfig.contact.whatsapp}</li>
              <li>Address: {siteConfig.contact.address}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
