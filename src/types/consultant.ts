export interface ConsultantBadge {
  label: string;
  type: "verified" | "top-rated" | "senior" | "celebrated";
}

export interface ConsultantPricing {
  duration30Min: number;
  duration45Min: number;
  duration60Min: number;
  currency: string;
}

export interface Consultant {
  id: string;
  slug: string;
  name: string;
  title: string;
  specialization: string;
  experienceYears: number;
  avatar: string;
  rating: number;
  reviewCount: number;
  sessionsCompleted: number;
  languages: string[];
  categoryIds: string[];
  credentials: string[];
  bio: string;
  consultationTypes: {
    audio: boolean;
    video: boolean;
    anonymous: boolean;
  };
  pricing: ConsultantPricing;
  availableNext: string;
  badges: ConsultantBadge[];
  isOnline: boolean;
}

export interface ConsultantFilters {
  category?: string;
  mode?: "all" | "audio" | "video" | "anonymous";
  searchQuery?: string;
  sortBy?: "recommended" | "rating" | "experience" | "price-low" | "price-high";
}
