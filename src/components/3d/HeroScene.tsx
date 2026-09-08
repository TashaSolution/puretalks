"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { FloatingOrganicMesh } from "./FloatingOrganicMesh";
import { ParticleField } from "./ParticleField";

export function HeroScene() {
  return (
    <div className="w-full h-full min-h-[380px] lg:min-h-[520px] relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#fef08a" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#10b981" />
        <pointLight position={[0, 0, 3]} intensity={1} color="#34d399" />

        <Suspense fallback={null}>
          <FloatingOrganicMesh />
          <ParticleField count={90} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default HeroScene;
