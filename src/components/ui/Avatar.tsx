import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AvatarProps {
  src?: string;
  alt: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  isOnline?: boolean;
}

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  className,
  isOnline,
}: AvatarProps) {
  const sizeMap = {
    sm: "w-8 h-8 text-xs",
    md: "w-11 h-11 text-sm",
    lg: "w-16 h-16 text-base",
    xl: "w-24 h-24 text-xl",
    "2xl": "w-32 h-32 text-2xl",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className={cn("relative inline-block shrink-0 rounded-full", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-full border border-[#C5A869]/30 bg-[#F5F1EB] flex items-center justify-center font-medium text-[#4A6B5D]",
          sizeMap[size]
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100px, 200px"
            className="object-cover"
          />
        ) : (
          <span>{fallback || getInitials(alt)}</span>
        )}
      </div>

      {isOnline !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-white",
            size === "sm" && "w-2 h-2",
            size === "md" && "w-3 h-3",
            (size === "lg" || size === "xl" || size === "2xl") && "w-4 h-4",
            isOnline ? "bg-emerald-500" : "bg-gray-400"
          )}
          title={isOnline ? "Available Now" : "Offline"}
        />
      )}
    </div>
  );
}
