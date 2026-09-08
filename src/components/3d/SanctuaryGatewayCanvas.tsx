"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Empathy3DScene } from "./Empathy3DScene";
import { Heart, Loader2 } from "lucide-react";

export function SanctuaryGatewayCanvas({ onEnterDashboard }: { onEnterDashboard?: () => void }) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="w-full h-full"
      >
        <color attach="background" args={["#0D1117"]} />
        <fog attach="fog" args={["#0D1117", 10, 24]} />
        <Suspense
          fallback={
            <Html center>
              <div className="flex flex-col items-center gap-3 text-white/90 select-none">
                <div className="w-10 h-10 rounded-2xl bg-[#E11D48]/20 border border-[#E11D48]/40 flex items-center justify-center animate-pulse">
                  <Heart className="w-5 h-5 text-[#FB7185] animate-bounce fill-[#FB7185]" />
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-gray-300">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#34D399]" />
                  <span>Loading 3D Empathy Sanctuary...</span>
                </div>
              </div>
            </Html>
          }
        >
          <Empathy3DScene onEnterDashboard={onEnterDashboard} />
        </Suspense>
      </Canvas>
    </div>
  );
}
