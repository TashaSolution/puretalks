"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gold" | "secondary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none tracking-tight";

    const variantStyles = {
      primary:
        "bg-[#4A6B5D] hover:bg-[#3B5749] text-white shadow-md shadow-[#4A6B5D]/15 hover:shadow-lg hover:shadow-[#4A6B5D]/25 border border-[#3B5749]/20 focus:ring-[#4A6B5D]",
      gold:
        "bg-gradient-to-r from-[#C5A869] to-[#B89748] hover:from-[#B89748] hover:to-[#A78637] text-white font-medium shadow-md shadow-[#C5A869]/20 hover:shadow-lg border border-[#C5A869]/30 focus:ring-[#C5A869]",
      secondary:
        "bg-[#F4EFEA] hover:bg-[#EDE6DC] text-[#1C2024] border border-[#E8DFC5]/60 shadow-sm focus:ring-[#C5A869]",
      outline:
        "border border-[#4A6B5D]/40 hover:border-[#4A6B5D] text-[#4A6B5D] hover:bg-[#4A6B5D]/8 focus:ring-[#4A6B5D]",
      ghost:
        "text-[#4B5563] hover:text-[#1C2024] hover:bg-[#F4EFEA]/80 focus:ring-slate-300",
      glass:
        "bg-white/80 hover:bg-white text-[#1C2024] border border-black/[0.08] backdrop-blur-md shadow-sm hover:shadow-md focus:ring-black/10",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2.5",
      xl: "text-lg px-8 py-3.5 gap-3 font-medium",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
