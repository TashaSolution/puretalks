import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name} — ${siteConfig.description}`,
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
  openGraph: {
    title: `Terms of Service | ${siteConfig.name}`,
    description: `Terms of Service for ${siteConfig.name} online consultation platform.`,
    url: `${siteConfig.url}/terms`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "PureTalks Terms of Service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms of Service | ${siteConfig.name}`,
    description: `Terms of Service for ${siteConfig.name} online consultation platform.`,
    images: [siteConfig.ogImage],
  },
};

const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name} — India's private online mental health consultation platform.`,
  url: `${siteConfig.url}/terms`,
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Terms of Service", item: `${siteConfig.url}/terms` },
  ],
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Header */}
      <div className="bg-white border-b border-black/[0.07]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="flex items-center gap-2 mb-6 text-sm text-[#6B7280] hover:text-[#4A6B5D] transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">Terms of Service</h1>
          <p className="text-sm text-[#6B7280] mt-2">Last updated: September 10, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              By accessing or using {siteConfig.name} ({siteConfig.url}), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. {siteConfig.name} is a professional online consultation platform connecting users with licensed psychologists, relationship counselors, and executive coaches.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">2. Eligibility</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              You must be at least 18 years of age to use {siteConfig.name}. By using our services, you represent and warrant that you meet this age requirement and have the legal capacity to enter into a binding agreement under Indian law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">3. Our Services</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {siteConfig.name} provides a platform for private online consultations through audio, video, and anonymous audio modes. Our services include mental health counseling, relationship guidance, career coaching, and personal development sessions. All consultations are conducted by verified, licensed professionals.
            </p>
            <ul className="text-sm text-[#4B5563] leading-relaxed mt-3 space-y-2 list-disc list-inside">
              <li>Sessions are available in 30, 45, and 60-minute durations</li>
              <li>Starting price: ₹399 per session</li>
              <li>Anonymous mode available — your identity is never revealed without your consent</li>
              <li>No session recordings are made or stored</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">4. User Accounts & Registration</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              You may use {siteConfig.name} without creating an account. When booking a session, you provide basic information (name, email, phone) solely for scheduling and communication purposes. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">5. Booking & Payments</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Sessions are booked through our platform and payment is collected at the time of booking. Prices are displayed in Indian Rupees (INR) and include all applicable taxes. {siteConfig.name} reserves the right to modify pricing with reasonable notice. Payment processing is handled by secure, PCI-compliant third-party processors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">6. Cancellation & Refund</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Please refer to our <Link href="/cancellation-refund" className="text-[#4A6B5D] hover:underline font-medium">Cancellation & Refund Policy</Link> for detailed information about cancelling sessions and requesting refunds.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">7. Privacy & Confidentiality</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              Your privacy is fundamental to our platform. All sessions are end-to-end encrypted with zero data logging. No session content is recorded, stored, or accessible to {siteConfig.name}. For complete details, please review our <Link href="/privacy" className="text-[#4A6B5D] hover:underline font-medium">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">8. Limitation of Liability</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {siteConfig.name} acts as a platform connecting users with independent licensed professionals. We are not a medical institution and do not provide medical advice directly. Consultations through our platform are not substitutes for emergency psychiatric care. In case of emergency, please contact local emergency services (112) or the Vandrevala Foundation helpline (9999 666 555).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">9. Intellectual Property</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              All content on {siteConfig.name}, including text, graphics, logos, and software, is the property of {siteConfig.name} or its licensors and is protected under Indian copyright and trademark laws. You may not reproduce, distribute, or create derivative works without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">10. Governing Law & Disputes</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              These Terms are governed by the laws of India. Any disputes arising from or relating to these Terms or your use of {siteConfig.name} shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu, India. You agree to attempt informal resolution of disputes before initiating formal proceedings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">11. Changes to Terms</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              {siteConfig.name} reserves the right to modify these Terms at any material time. Changes will be effective upon posting on this page with an updated &quot;Last updated&quot; date. Your continued use of the platform after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] mb-3">12. Contact Us</h2>
            <p className="text-sm text-[#4B5563] leading-relaxed">
              For questions about these Terms, contact us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-[#4A6B5D] hover:underline font-medium">
                {siteConfig.contact.email}
              </a>{" "}
              or via WhatsApp at {siteConfig.contact.whatsapp}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
