import { TestimonialItem } from "@/types/review";
import { testimonialsData } from "@/data/testimonials";
import { apiClient } from "./client";

export async function getTestimonials(): Promise<TestimonialItem[]> {
  return apiClient<TestimonialItem[]>("/testimonials", {}, () => {
    return testimonialsData;
  });
}
