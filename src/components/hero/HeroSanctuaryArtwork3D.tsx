"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, ShieldCheck } from "lucide-react";

export function HeroSanctuaryArtwork3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural 3D response
  const springConfig = { damping: 25, stiffness: 140, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-2xl mx-auto flex items-center justify-center select-none cursor-default"
      style={{ perspective: 1200 }}
    >
      {/* 3D Tilted Wrapper with continuous organic breathing float */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [-4, 4, -4],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full flex flex-col items-center justify-center"
      >
        {/* Floating 3D Micro-Badge (Top Right) */}
        <motion.div
          style={{ transform: "translateZ(36px)" }}
          className="absolute -top-2 right-4 sm:right-10 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#C5A869]/30 shadow-soft backdrop-blur-md text-[11px] font-semibold text-[#1C2024]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
          <span>Empathic Sanctuary</span>
        </motion.div>

        {/* Floating 3D Micro-Badge (Bottom Left) */}
        <motion.div
          style={{ transform: "translateZ(36px)" }}
          className="absolute bottom-3 left-4 sm:left-10 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#4A6B5D]/30 shadow-soft backdrop-blur-md text-[11px] font-semibold text-[#1C2024]"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#4A6B5D]" />
          <span>100% Confidential</span>
        </motion.div>

        {/* Central Heart Pulse Ring */}
        <div
          style={{ transform: "translateZ(24px)" }}
          className="absolute top-[9%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <span className="relative flex h-10 w-10 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E05A47] opacity-20" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E05A47]/40" />
          </span>
        </div>

        {/* Master Artwork: Pure Transparent Alpha with Seamless Feathering */}
        <div
          className="relative w-full aspect-[1024/585] max-h-[350px] flex items-center justify-center"
          style={{
            transform: "translateZ(8px)",
          }}
        >
          <Image
            src="/images/hero-community-sanctuary-clean.png"
            alt="PureTalks Empathic Community Sanctuary"
            width={1024}
            height={585}
            priority
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>
      </motion.div>
    </div>
  );
}
