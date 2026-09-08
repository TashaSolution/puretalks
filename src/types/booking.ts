export type ConsultationMode = "audio" | "video" | "anonymous";
export type PreferredLanguage = "English";

export interface TimeSlot {
  id: string;
  time: string;
  period: "morning" | "afternoon" | "evening" | "night";
  available: boolean;
}

export interface DayAvailability {
  date: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
  slots: TimeSlot[];
  isAvailable: boolean;
}

export interface BookingFormData {
  consultantId: string;
  categoryId: string;
  consultationMode: ConsultationMode;
  durationMinutes: 30 | 45 | 60;
  preferredLanguage?: string;
  selectedDate: string;
  selectedTimeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  isAnonymous: boolean;
  concernNotes?: string;
  isAgreedToTerms: boolean;
}

export interface BookingConfirmation {
  bookingId: string;
  consultantName: string;
  consultantAvatar: string;
  consultantTitle: string;
  categoryTitle: string;
  scheduledAt: string;
  timeSlot: string;
  durationMinutes: number;
  mode: ConsultationMode;
  meetingLink: string;
  passcode: string;
  clientName: string;
  amountPaid: number;
  status: "confirmed" | "pending";
}
