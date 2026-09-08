import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverEffect?: boolean;
  glowBorder?: boolean;
}

export function Card({
  className,
  glass = true,
  hoverEffect = false,
  glowBorder = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-350 relative overflow-hidden",
        glass
          ? "bg-white/85 backdrop-blur-xl border border-black/[0.07] shadow-card"
          : "bg-white border border-black/[0.08] shadow-soft",
        hoverEffect && "hover:border-[#4A6B5D]/35 hover:shadow-card-hover hover:-translate-y-1",
        glowBorder && "border-[#4A6B5D]/40 shadow-glow-sage",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pb-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-xl font-serif font-bold text-[#1C2024] tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-[#4B5563] mt-1.5 leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-2", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-6 pt-0 flex items-center justify-between border-t border-black/[0.06] mt-4 pt-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
