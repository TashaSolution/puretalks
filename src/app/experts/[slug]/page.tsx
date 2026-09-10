import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getConsultantBySlug, getConsultants } from "@/lib/api/consultants";
import { reviewsData } from "@/data/reviews";
import { ConsultantProfileView } from "@/components/consultants/ConsultantProfileView";
import { siteConfig } from "@/config/site";

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
    </div>
  );
}
