import { BookingFormData, BookingConfirmation, DayAvailability } from "@/types/booking";
import { consultantsData } from "@/data/consultants";
import { categoriesData } from "@/data/categories";
import { apiClient } from "./client";

export async function getConsultantAvailability(consultantId: string): Promise<DayAvailability[]> {
  return apiClient<DayAvailability[]>(`/consultants/${consultantId}/availability`, {}, () => {
    const days: DayAvailability[] = [];
    const now = new Date();

    for (let i = 0; i < 7; i++) {
      const dateObj = new Date(now);
      dateObj.setDate(now.getDate() + i);

      const yyyy = dateObj.getFullYear();
      const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
      const dd = String(dateObj.getDate()).padStart(2, "0");
      const dateStr = `${yyyy}-${mm}-${dd}`;

      const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
      const monthName = dateObj.toLocaleDateString("en-US", { month: "short" });

      days.push({
        date: dateStr,
        dayName,
        dayNumber: dateObj.getDate(),
        monthName,
        isAvailable: i !== 6,
        slots: [
          { id: `${dateStr}-1000`, time: "10:00 AM", period: "morning", available: i % 2 === 0 },
          { id: `${dateStr}-1130`, time: "11:30 AM", period: "morning", available: true },
          { id: `${dateStr}-1400`, time: "02:00 PM", period: "afternoon", available: true },
          { id: `${dateStr}-1630`, time: "04:30 PM", period: "afternoon", available: true },
          { id: `${dateStr}-1800`, time: "06:00 PM", period: "evening", available: true },
          { id: `${dateStr}-1930`, time: "07:30 PM", period: "evening", available: i % 3 !== 0 },
          { id: `${dateStr}-2100`, time: "09:00 PM", period: "night", available: true },
        ],
      });
    }

    return days;
  });
}

export async function createBooking(data: BookingFormData): Promise<BookingConfirmation> {
  return apiClient<BookingConfirmation>("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  }, () => {
    const consultant = consultantsData.find((c) => c.id === data.consultantId) || consultantsData[0];
    const category = categoriesData.find((c) => c.id === data.categoryId) || categoriesData[0];

    const price =
      data.durationMinutes === 30
        ? consultant.pricing.duration30Min
        : data.durationMinutes === 45
        ? consultant.pricing.duration45Min
        : consultant.pricing.duration60Min;

    const uuid = crypto.randomUUID();
    const randomId = "PT-" + uuid.split('-')[0].toUpperCase();
    const roomPass = crypto.randomUUID().split('-')[0].substring(0, 6).toUpperCase();

    return {
      bookingId: randomId,
      status: "confirmed",
      consultantName: consultant.name,
      consultantTitle: consultant.title,
      consultantAvatar: consultant.avatar,
      categoryTitle: category.title,
      mode: data.consultationMode,
      scheduledAt: data.selectedDate,
      timeSlot: data.selectedTimeSlot,
      durationMinutes: data.durationMinutes,
      clientName: data.clientName,
      amountPaid: price,
      meetingLink: `https://puretalks.in/room/${randomId.toLowerCase()}`,
      passcode: roomPass,
    };
  });
}
