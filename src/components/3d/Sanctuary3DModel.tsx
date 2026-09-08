"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float } from "@react-three/drei";
import * as THREE from "three";

export function Sanctuary3DModel({ onEnterDashboard }: { onEnterDashboard?: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Very gentle idle breathing animation
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2 - 0.05} // Don't allow camera to go below ground
        minDistance={6}
        maxDistance={22}
        autoRotate={true}
        autoRotateSpeed={0.6}
        makeDefault
      />

      {/* Ambient & Directional Lighting */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[12, 18, 10]} intensity={1.8} castShadow shadow-mapSize={1024} />
      <directionalLight position={[-10, 10, -10]} intensity={0.6} color="#C5A869" />
      <pointLight position={[0, 3, 0]} intensity={2.5} color="#FFE6B3" distance={12} />
      <pointLight position={[-4, 2, 2]} intensity={1.5} color="#4A6B5D" distance={8} />

      <group ref={groupRef} position={[0, -1.2, 0]}>
        {/* ================= GROUND & LANDSCAPE ================= */}
        {/* Grass / Ground plane */}
        <mesh position={[0, -0.1, 0]} receiveShadow>
          <cylinderGeometry args={[14, 14, 0.2, 48]} />
          <meshStandardMaterial color="#8EA788" roughness={0.8} />
        </mesh>

        {/* Stone Path / Platform Base */}
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[9.5, 0.2, 8.5]} />
          <meshStandardMaterial color="#EDE5D8" roughness={0.5} />
        </mesh>

        {/* Reflection Water Pool */}
        <mesh position={[3.2, 0.1, 2.2]}>
          <boxGeometry args={[2.5, 0.08, 2.8]} />
          <meshStandardMaterial color="#4A7A8C" roughness={0.1} metalness={0.8} transparent opacity={0.85} />
        </mesh>

        {/* ================= LOWER LEVEL: MAIN LIVING & CONSULTATION SUITE ================= */}
        {/* Floor Slab */}
        <mesh position={[-0.8, 0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.5, 0.25, 6]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.4} />
        </mesh>

        {/* Back Wall */}
        <mesh position={[-0.8, 1.4, -2.8]} castShadow receiveShadow>
          <boxGeometry args={[6.5, 2.2, 0.3]} />
          <meshStandardMaterial color="#F4EFEA" roughness={0.4} />
        </mesh>

        {/* Left Accent Stone Wall */}
        <mesh position={[-3.9, 1.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 2.2, 5.8]} />
          <meshStandardMaterial color="#6B7C72" roughness={0.9} />
        </mesh>

        {/* Glass Front Wall / Windows */}
        <mesh position={[-0.8, 1.4, 2.8]}>
          <boxGeometry args={[6.2, 2.2, 0.08]} />
          <meshStandardMaterial color="#D9EFF5" transparent opacity={0.35} roughness={0.1} metalness={0.5} />
        </mesh>

        {/* Warm Illuminated Interior Core (Consultation Table & Warm Light) */}
        <mesh position={[-1, 0.6, 0]}>
          <boxGeometry args={[1.8, 0.7, 1]} />
          <meshStandardMaterial color="#C5A869" roughness={0.3} />
        </mesh>
        <mesh position={[-1, 1.1, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#FFF1CC" emissive="#FFE5A3" emissiveIntensity={2} />
        </mesh>

        {/* ================= MID CEILING / SECOND LEVEL BALCONY ================= */}
        <mesh position={[0.2, 2.6, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[7.2, 0.3, 6.4]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.3} />
        </mesh>

        {/* Wood Clad Accent Panel on Upper Floor */}
        <mesh position={[-0.5, 3.8, -0.5]} castShadow receiveShadow>
          <boxGeometry args={[4.8, 2.2, 4.2]} />
          <meshStandardMaterial color="#C59E6D" roughness={0.7} />
        </mesh>

        {/* Cantilevered Top Modern Roof */}
        <mesh position={[-0.2, 5.0, -0.2]} castShadow receiveShadow>
          <boxGeometry args={[6.2, 0.35, 5.4]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
        </mesh>

        {/* Upper Balcony Glass Railing */}
        <mesh position={[1.8, 3.1, 1.6]}>
          <boxGeometry args={[3.2, 0.8, 0.06]} />
          <meshStandardMaterial color="#E8F4F8" transparent opacity={0.4} roughness={0.1} />
        </mesh>

        {/* ================= CARPORT / PERGOLA CANOPY ================= */}
        {/* Support Pillars */}
        <mesh position={[3.2, 1.3, -2.6]} castShadow>
          <boxGeometry args={[0.25, 2.4, 0.25]} />
          <meshStandardMaterial color="#FAF8F5" />
        </mesh>
        <mesh position={[3.2, 1.3, 2.6]} castShadow>
          <boxGeometry args={[0.25, 2.4, 0.25]} />
          <meshStandardMaterial color="#FAF8F5" />
        </mesh>

        {/* Pergola Wooden Slats */}
        {[ -1.8, -0.9, 0, 0.9, 1.8 ].map((z, idx) => (
          <mesh key={idx} position={[3.2, 2.6, z]} castShadow>
            <boxGeometry args={[2.6, 0.12, 0.25]} />
            <meshStandardMaterial color="#354E43" roughness={0.5} />
          </mesh>
        ))}

        {/* ================= ZEN GARDEN TREES & FOLIAGE ================= */}
        {/* Tree 1: Left */}
        <group position={[-5.2, 0, -2.5]}>
          <mesh position={[0, 1.8, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.26, 3.6, 12]} />
            <meshStandardMaterial color="#5C4033" roughness={0.9} />
          </mesh>
          <mesh position={[0, 3.8, 0]} castShadow>
            <sphereGeometry args={[1.5, 16, 16]} />
            <meshStandardMaterial color="#4A6B5D" roughness={0.8} />
          </mesh>
          <mesh position={[0.4, 4.4, 0.3]} castShadow>
            <sphereGeometry args={[1.1, 16, 16]} />
            <meshStandardMaterial color="#6A8C7E" roughness={0.8} />
          </mesh>
        </group>

        {/* Tree 2: Right Background */}
        <group position={[5.2, 0, -3.2]}>
          <mesh position={[0, 1.6, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.22, 3.2, 12]} />
            <meshStandardMaterial color="#5C4033" roughness={0.9} />
          </mesh>
          <mesh position={[0, 3.4, 0]} castShadow>
            <sphereGeometry args={[1.3, 16, 16]} />
            <meshStandardMaterial color="#4A6B5D" roughness={0.8} />
          </mesh>
        </group>

        {/* Potted Zen Plants along porch */}
        {[ -0.8, -0.2, 0.4, 1.0 ].map((x, idx) => (
          <group key={idx} position={[x, 0.3, 3.2]}>
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[0.18, 0.14, 0.3, 12]} />
              <meshStandardMaterial color="#FAF8F5" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.4, 0]}>
              <sphereGeometry args={[0.22, 12, 12]} />
              <meshStandardMaterial color="#354E43" roughness={0.7} />
            </mesh>
          </group>
        ))}

        {/* ================= INTERACTIVE 3D HOTSPOT ANNOTATIONS ================= */}
        {/* Hotspot 1: Open Living & Confidential Suite */}
        <Html position={[-1.2, 1.4, 3.1]} distanceFactor={14} center>
          <div
            onClick={onEnterDashboard}
            className="cursor-pointer select-none transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#121A16]/90 backdrop-blur-md border border-[#4A6B5D] shadow-lg shadow-[#4A6B5D]/20 text-white min-w-[220px]">
              <span className="w-3 h-3 rounded-full bg-[#10B981] animate-ping shrink-0" />
              <div>
                <p className="text-[11px] font-bold tracking-wider uppercase text-[#A7F3D0]">
                  Confidential Suite
                </p>
                <p className="text-[10px] text-gray-300">
                  Encrypted 1-on-1 Video • Floor-to-Ceiling Calm
                </p>
              </div>
            </div>
          </div>
        </Html>

        {/* Hotspot 2: Master Suite & Anonymous Pod */}
        <Html position={[-0.2, 3.8, 1.8]} distanceFactor={14} center>
          <div
            onClick={onEnterDashboard}
            className="cursor-pointer select-none transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#1D170D]/90 backdrop-blur-md border border-[#C5A869] shadow-lg shadow-[#C5A869]/20 text-white min-w-[220px]">
              <span className="w-3 h-3 rounded-full bg-[#F59E0B] shrink-0" />
              <div>
                <p className="text-[11px] font-bold tracking-wider uppercase text-[#FDE68A]">
                  Anonymous Voice Pod
                </p>
                <p className="text-[10px] text-gray-300">
                  Zero Camera Required • Audio Only
                </p>
              </div>
            </div>
          </div>
        </Html>

        {/* Hotspot 3: Pergola & Zen Deck */}
        <Html position={[3.2, 3.4, 0]} distanceFactor={14} center>
          <div
            onClick={onEnterDashboard}
            className="cursor-pointer select-none transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#151221]/90 backdrop-blur-md border border-[#8B5CF6] shadow-lg shadow-[#8B5CF6]/20 text-white min-w-[220px]">
              <span className="w-3 h-3 rounded-full bg-[#A78BFA] shrink-0" />
              <div>
                <p className="text-[11px] font-bold tracking-wider uppercase text-[#DDD6FE]">
                  Zen Breathwork Lounge
                </p>
                <p className="text-[10px] text-gray-300">
                  Mindfulness & Somatic Meditation Deck
                </p>
              </div>
            </div>
          </div>
        </Html>

        {/* Hotspot 4: Executive Wing & Porch */}
        <Html position={[3.2, 1.2, 2.4]} distanceFactor={14} center>
          <div
            onClick={onEnterDashboard}
            className="cursor-pointer select-none transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0D1826]/90 backdrop-blur-md border border-[#3B82F6] shadow-lg shadow-[#3B82F6]/20 text-white min-w-[220px]">
              <span className="w-3 h-3 rounded-full bg-[#60A5FA] shrink-0" />
              <div>
                <p className="text-[11px] font-bold tracking-wider uppercase text-[#BFDBFE]">
                  Executive Wing
                </p>
                <p className="text-[10px] text-gray-300">
                  Career Leadership & Mentorship
                </p>
              </div>
            </div>
          </div>
        </Html>
      </group>
    </>
  );
}
