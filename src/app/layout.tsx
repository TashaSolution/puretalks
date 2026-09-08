import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { LanguageProvider } from "@/locales/i18n-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serifFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PureTalks — Private Online Consultations & Mental Clarity Sanctuary",
  description:
    "100% confidential, private online consultations with licensed psychologists, relationship counselors, and executive mentors. Safe sanctuary with anonymous mode available.",
  keywords: siteConfig.keywords,
  authors: [{ name: "PureTalks Team" }],
  openGraph: {
    title: "PureTalks — Private Online Consultations",
    description:
      "A safe, confidential sanctuary to speak your heart with certified psychologists and counselors.",
    url: siteConfig.url,
    siteName: "PureTalks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PureTalks — Private Online Consultations",
    description: "100% confidential online consultations with licensed specialists.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sansFont.variable} ${serifFont.variable} font-sans min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C2024] antialiased selection:bg-[#5C7C6D]/20 selection:text-[#1C2024]`}>
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"} />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX"} />
      </body>
    </html>
  );
}
