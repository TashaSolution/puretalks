"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Video, Mic, EyeOff } from "lucide-react";
import { BookingRecord } from "@/types/dashboard";

const statusConfig: Record<
  string,
  { variant: "emerald" | "gold" | "secondary" | "outline"; label: string }
> = {
  confirmed: { variant: "emerald", label: "Confirmed" },
  pending: { variant: "gold", label: "Pending" },
  completed: { variant: "secondary", label: "Completed" },
  cancelled: { variant: "outline", label: "Cancelled" },
};

const modeIcons: Record<string, React.ElementType> = {
  video: Video,
  audio: Mic,
  anonymous: EyeOff,
};

interface BookingRowProps {
  booking: BookingRecord;
}

export function BookingRow({ booking }: BookingRowProps) {
  const status = statusConfig[booking.status];
  const ModeIcon = modeIcons[booking.mode];

  return (
    <tr className="border-b border-black/[0.04] hover:bg-[#FAF8F5]/50 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <Avatar
            alt={booking.clientName}
            fallback={booking.clientName
              .split(" ")
              .map((n) => n[0])
              .join("")}
            size="sm"
          />
          <div>
            <p className="text-sm font-semibold text-[#1C2024] truncate max-w-[150px]">
              {booking.clientName}
            </p>
            <p className="text-xs text-[#9CA3AF] truncate max-w-[150px]">
              {booking.clientEmail}
            </p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <p className="text-xs text-[#1C2024] truncate max-w-[120px]">{booking.category}</p>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1.5">
          <ModeIcon className="w-3.5 h-3.5 text-[#6B7280]" />
          <span className="text-xs text-[#6B7280] capitalize">
            {booking.mode}
          </span>
        </div>
      </td>
      <td className="py-4 px-4">
        <p className="text-xs text-[#1C2024]">{booking.date}</p>
        <p className="text-xs text-[#9CA3AF]">{booking.time}</p>
      </td>
      <td className="py-4 px-4">
        <span className="text-xs text-[#6B7280]">{booking.duration} min</span>
      </td>
      <td className="py-4 px-4">
        <Badge variant={status.variant} size="sm">
          {status.label}
        </Badge>
      </td>
      <td className="py-4 px-4 text-right">
        <span className="text-sm font-semibold text-[#1C2024]">
          ₹{booking.amount.toLocaleString()}
        </span>
      </td>
    </tr>
  );
}
