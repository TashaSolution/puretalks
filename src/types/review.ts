export interface ClientReview {
  id: string;
  consultantId: string;
  rating: number;
  comment: string;
  author: string;
  clientAlias: string;
  clientLocation: string;
  date: string;
  consultationType: "Audio Call" | "Video Session" | "Anonymous Audio";
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  authorLocation: string;
  consultantName: string;
  rating: number;
  category: string;
  avatar?: string;
}
