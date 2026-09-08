import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "emerald" | "gold" | "secondary" | "outline" | "ghost" | "sage";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const base = "inline-flex items-center font-medium rounded-full tracking-wide";

  const variants = {
    default: "bg-[#F4EFEA] text-[#1C2024] border border-[#E8DFC5]/60",
    sage: "bg-[#4A6B5D]/10 text-[#3B5749] border border-[#4A6B5D]/20",
    emerald: "bg-[#4A6B5D]/10 text-[#3B5749] border border-[#4A6B5D]/20",
    gold: "bg-[#C5A869]/15 text-[#8A6E2D] border border-[#C5A869]/30",
    secondary: "bg-[#F4EFEA] text-[#4B5563] border border-[#E8DFC5]/60",
    outline: "border border-black/15 text-[#4B5563] bg-white/60",
    ghost: "bg-transparent text-[#6B7280]",
  };

  const sizes = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1",
    md: "text-xs px-3 py-1 gap-1.5",
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
