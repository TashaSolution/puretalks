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

export const testimonialsData: TestimonialItem[] = [
  {
    id: "t1",
    quote:
      "Having someone listen without judgment made all the difference. Dr. Soundarapandian helped me dissolve persistent anxiety and panic loops in just three sessions.",
    author: "Kavitha S.",
    authorLocation: "Mumbai, India",
    consultantName: "Dr. K. Soundarapandian",
    rating: 5,
    category: "Mental Health & Clarity",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "t2",
    quote:
      "My husband and I were on the brink of separation due to communication breakdowns. Priyadarshini provided a calm, empathetic space that truly restored our relationship.",
    author: "Manoj & Divya",
    authorLocation: "Bangalore, India",
    consultantName: "Priyadarshini Ramasamy",
    rating: 5,
    category: "Relationship & Marriage",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "t3",
    quote:
      "Anand's executive coaching helped me navigate a complex VP promotion interview. His strategic feedback and leadership wisdom were indispensable.",
    author: "Siddharth N.",
    authorLocation: "London, UK",
    consultantName: "Anand Krishnamoorthy",
    rating: 5,
    category: "Executive Mentorship",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: "t4",
    quote:
      "The anonymous audio mode gave me complete peace of mind. I could speak about deeply personal struggles without worrying about privacy or camera pressure.",
    author: "Anonymous Client",
    authorLocation: "Chennai, India",
    consultantName: "Dr. Radha Venkat",
    rating: 5,
    category: "Confidential Guidance",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  },
];
