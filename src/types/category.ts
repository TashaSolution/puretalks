export interface ConsultationCategory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  gradientClass: string;
  popularTopics: string[];
  startingPrice: number;
  availableConsultantsCount: number;
}
