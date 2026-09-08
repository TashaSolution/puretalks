import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-[#1C2024]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 text-[#6B7280] pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-[#FAF8F5] border border-black/10 rounded-xl px-4 py-2.5 text-sm text-[#1C2024] placeholder:text-[#9CA3AF] transition-all duration-200 focus:outline-none focus:bg-white focus:border-[#4A6B5D] focus:ring-2 focus:ring-[#4A6B5D]/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-inner-sm",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3.5 text-[#6B7280]">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        {!error && helperText && <p className="text-xs text-[#6B7280] mt-1">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
