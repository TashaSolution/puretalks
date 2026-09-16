import { ScheduleSlot } from "@/types/dashboard";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const timeSlots = [
  { start: "9:00 AM", end: "10:00 AM" },
  { start: "10:00 AM", end: "11:00 AM" },
  { start: "11:00 AM", end: "12:00 PM" },
  { start: "12:00 PM", end: "1:00 PM" },
  { start: "2:00 PM", end: "3:00 PM" },
  { start: "3:00 PM", end: "4:00 PM" },
  { start: "4:00 PM", end: "5:00 PM" },
  { start: "5:00 PM", end: "6:00 PM" },
];

const availabilityMap: Record<string, number[]> = {
  Mon: [1, 1, 1, 0, 1, 1, 1, 0],
  Tue: [1, 1, 0, 0, 1, 1, 0, 0],
  Wed: [1, 1, 1, 1, 1, 1, 1, 0],
  Thu: [0, 1, 1, 0, 1, 1, 0, 0],
  Fri: [1, 1, 1, 1, 1, 1, 1, 1],
  Sat: [1, 1, 1, 1, 0, 0, 0, 0],
  Sun: [0, 0, 0, 0, 0, 0, 0, 0],
};

export const mockSchedule: ScheduleSlot[] = days.flatMap((day, dayIndex) =>
  timeSlots.map((slot, slotIndex) => ({
    id: `${dayIndex}-${slotIndex}`,
    day,
    dayIndex,
    startTime: slot.start,
    endTime: slot.end,
    available: availabilityMap[day][slotIndex] === 1,
  }))
);
