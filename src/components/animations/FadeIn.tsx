"use client";

import React, { useRef, useEffect, useState } from "react";

export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  distance?: number;
}

const directionToClass: Record<string, string> = {
  up: "animate-fade-in-up",
  down: "animate-fade-in-down",
  left: "animate-fade-in-left",
  right: "animate-fade-in-right",
  none: "animate-fade-in",
};

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "-40px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animationClass = directionToClass[direction] || "animate-fade-in";
  const delayMs = delay > 0 ? delay * 1000 : 0;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? undefined : 0,
        ...(isVisible && delayMs > 0
          ? { animationDelay: `${delayMs}ms` }
          : !isVisible
            ? { animationPlayState: "paused" as const }
            : {}),
      }}
    >
      <div
        className={isVisible ? animationClass : ""}
        style={delayMs > 0 && isVisible ? { animationDelay: `${delayMs}ms` } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  className = "",
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "-40px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          style={
            isVisible
              ? { animationDelay: `${index * staggerDelay * 1000}ms` }
              : { opacity: 0 }
          }
          className={isVisible ? "animate-fade-in-up" : ""}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
