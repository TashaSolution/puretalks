import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCategoryBySlug, getCategories } from "@/lib/api/categories";
import { getConsultantsByCategory } from "@/lib/api/consultants";
import { ConsultantGrid } from "@/components/consultants/ConsultantGrid";
import { Badge } from "@/ui/Badge";
import { Lock, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return { title: "Category Not Found" };

  const title = `${category.title} Online | PureTalks`;
  const description = `${category.description} Starting from ₹${category.startingPrice}. ${category.availableConsultantsCount}+ verified experts available on PureTalks.`;
  const url = `${siteConfig.url}/consultations/${category.slug}`;

  return {
    title,
    description,
    keywords: [
      category.title,
      ...category.popularTopics,
      "online consultation",
      "private therapy India",
      "PureTalks",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | PureTalks`,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | PureTalks`,
      description,
    },
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const consultants = await getConsultantsByCategory(category.id);
  const allCategories = await getCategories();
  const relatedCategories = allCategories
    .filter((c) => c.id !== category.id)
    .slice(0, 3);
  const url = `${siteConfig.url}/consultations/${category.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.title,
    description: category.description,
    provider: {
      "@type": "Organization",
      name: "PureTalks",
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: category.popularTopics,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: category.startingPrice,
      priceCurrency: "INR",
      offerCount: category.availableConsultantsCount,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Consultations",
        item: `${siteConfig.url}/consultations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.title,
        item: url,
      },
    ],
  };

  return (
    <div className="pt-32 pb-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#6B7280] font-medium mb-8">
        <Link href="/" className="hover:text-[#1C2024]">Home</Link>
        <span>/</span>
        <Link href="/consultations" className="hover:text-[#1C2024]">Consultations</Link>
        <span>/</span>
        <span className="text-[#4A6B5D] font-bold">{category.title}</span>
      </div>

      {/* Category Hero */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-black/[0.07] shadow-card relative overflow-hidden mb-14">
        <div className="max-w-2xl space-y-4">
          <Badge variant="sage" size="sm" className="font-semibold">
            <Lock className="w-3.5 h-3.5 mr-1 text-[#4A6B5D]" />
            100% Confidential Domain
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2024] tracking-tight">
            {category.title}
          </h1>
          <p className="text-sm text-[#6B7280] leading-relaxed font-normal">
            {category.description}
          </p>

          <div className="pt-3 flex flex-wrap gap-2">
            {category.popularTopics.map((topic, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-black/[0.08] text-[#4B5563] font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Matching Consultants */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-[#1C2024] tracking-tight">
            Specialists in {category.title}
          </h2>
          <span className="text-xs text-[#6B7280] font-medium">
            {consultants.length} Experts Available
          </span>
        </div>

        <ConsultantGrid consultants={consultants} />
      </div>

      {/* Content Sections */}
      <div className="mt-16 max-w-4xl mx-auto space-y-12">
        {/* Who is this for */}
        <div className="p-8 rounded-3xl bg-white border border-black/[0.07] shadow-card">
          <h2 className="text-xl font-serif font-bold text-[#1C2024] tracking-tight mb-4">
            Who is this consultation for?
          </h2>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            This consultation is for anyone seeking professional guidance in {category.title.toLowerCase().replace(/&/g, "and")}.
            Whether you are navigating personal challenges, relationship dynamics, career decisions, or seeking clarity
            and peace of mind, our verified experts provide a confidential, judgment-free space.
          </p>
        </div>

        {/* What to expect */}
        <div className="p-8 rounded-3xl bg-white border border-black/[0.07] shadow-card">
          <h2 className="text-xl font-serif font-bold text-[#1C2024] tracking-tight mb-4">
            What can you expect?
          </h2>
          <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
            Each session is conducted in a private, encrypted room. Your expert will listen actively, provide
            evidence-based guidance, and help you develop actionable strategies. Sessions are available via
            video, audio, or anonymous mode — you choose what feels right.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A6B5D] underline hover:text-[#3B5749]"
            >
              How the process works <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A6B5D] underline hover:text-[#3B5749]"
            >
              Frequently asked questions <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Related Consultation Options */}
        {relatedCategories.length > 0 && (
          <div>
            <h2 className="text-xl font-serif font-bold text-[#1C2024] tracking-tight mb-6">
              Related consultation options
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/consultations/${cat.slug}`}
                  className="group p-5 rounded-2xl bg-white border border-black/[0.07] shadow-sm hover:shadow-md hover:border-[#4A6B5D]/30 transition-all"
                >
                  <h3 className="text-sm font-bold text-[#1C2024] group-hover:text-[#4A6B5D] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1.5 line-clamp-2">
                    {cat.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A6B5D] mt-3">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
