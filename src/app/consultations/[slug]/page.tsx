import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCategoryBySlug, getCategories } from "@/lib/api/categories";
import { getConsultantsByCategory } from "@/lib/api/consultants";
import { ConsultantGrid } from "@/components/consultants/ConsultantGrid";
import { Badge } from "@/ui/Badge";
import { Lock } from "lucide-react";
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

  const title = `${category.title} — Online Consultation`;
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
    </div>
  );
}
