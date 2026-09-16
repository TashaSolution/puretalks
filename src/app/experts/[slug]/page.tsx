import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getConsultantBySlug, getConsultants } from "@/lib/api/consultants";
import { getCategories } from "@/lib/api/categories";
import { reviewsData } from "@/data/reviews";
import { ConsultantProfileView } from "@/components/consultants/ConsultantProfileView";
import { Badge } from "@/ui/Badge";
import { siteConfig } from "@/config/site";
import { ArrowRight } from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const consultants = await getConsultants();
  return consultants.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const consultant = await getConsultantBySlug(params.slug);
  if (!consultant) return { title: "Expert Not Found" };

  const title = `${consultant.name} — ${consultant.title}`;
  const description = `${consultant.bio} Book a private consultation with ${consultant.name} on PureTalks. ${consultant.experienceYears}+ years experience. Rated ${consultant.rating}/5 by ${consultant.reviewCount} clients.`;
  const url = `${siteConfig.url}/experts/${consultant.slug}`;

  return {
    title,
    description,
    keywords: [
      consultant.name,
      consultant.specialization,
      consultant.title,
      "online consultation",
      "private therapy",
      "PureTalks expert",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | PureTalks`,
      description,
      url,
      type: "profile",
      images: [
        {
          url: consultant.avatar,
          width: 600,
          height: 600,
          alt: consultant.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | PureTalks`,
      description,
      images: [consultant.avatar],
    },
  };
}

export default async function ExpertDetailPage({ params }: Props) {
  const consultant = await getConsultantBySlug(params.slug);

  if (!consultant) {
    notFound();
  }

  const consultantReviews = reviewsData.filter(
    (r) => r.consultantId === consultant.id
  );

  const allCategories = await getCategories();
  const relatedCategories = allCategories.filter((c) =>
    consultant.categoryIds.includes(c.id)
  );

  const url = `${siteConfig.url}/experts/${consultant.slug}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: consultant.name,
    jobTitle: consultant.title,
    description: consultant.bio,
    url,
    image: consultant.avatar,
    worksFor: {
      "@type": "Organization",
      name: "PureTalks",
      url: siteConfig.url,
    },
    knowsAbout: consultant.specialization.split(", "),
    alumniOf: consultant.credentials.map((cred) => ({
      "@type": "EducationalOrganization",
      name: cred,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: consultant.rating,
      reviewCount: consultant.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${consultant.name} — ${consultant.title}`,
    description: consultant.bio,
    provider: {
      "@type": "Person",
      name: consultant.name,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: consultant.pricing.duration30Min,
      highPrice: consultant.pricing.duration60Min,
      priceCurrency: consultant.pricing.currency,
      offerCount: 3,
    },
    serviceType: consultant.specialization.split(", "),
  };

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ConsultantProfileView
        consultant={consultant}
        reviews={consultantReviews}
      />

      {/* Related Consultation Topics */}
      {relatedCategories.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            <Badge variant="sage" size="sm" className="mb-3 font-semibold">
              Related Services
            </Badge>
            <h2 className="text-2xl font-serif font-bold text-[#1C2024] tracking-tight mb-6">
              Consultation Topics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    View experts <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/how-it-works"
                className="text-xs font-semibold text-[#4A6B5D] underline hover:text-[#3B5749]"
              >
                How it works
              </Link>
              <Link
                href="/faq"
                className="text-xs font-semibold text-[#4A6B5D] underline hover:text-[#3B5749]"
              >
                FAQ
              </Link>
              <Link
                href="/book"
                className="text-xs font-semibold text-[#4A6B5D] underline hover:text-[#3B5749]"
              >
                Book a session
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
