"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float, Sparkles, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface Empathy3DSceneProps {
  onEnterDashboard?: () => void;
}

function EmpathyMonolith({ onEnterDashboard }: { onEnterDashboard?: () => void }) {
  const texture = useTexture("/images/empathy-sanctuary.jpg");
  texture.colorSpace = THREE.SRGBColorSpace;

  const monolithRef = useRef<THREE.Group>(null);
  const heartRef = useRef<THREE.Mesh>(null);
  const pulseRingsRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Create a 3D heart shape using THREE.Shape
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 1.0);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.08,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.04,
    bevelThickness: 0.04,
  }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Subtle natural breathing float & interactive mouse tilt
    if (monolithRef.current) {
      monolithRef.current.position.y = Math.sin(t * 0.8) * 0.08;
      monolithRef.current.rotation.y = THREE.MathUtils.lerp(
        monolithRef.current.rotation.y,
        pointer.x * 0.2,
        0.05
      );
      monolithRef.current.rotation.x = THREE.MathUtils.lerp(
        monolithRef.current.rotation.x,
        -pointer.y * 0.1,
        0.05
      );
    }

    // Heartbeat pulse animation
    if (heartRef.current) {
      const beat = Math.pow(Math.sin(t * 3.5), 10) * 0.18 + 1;
      heartRef.current.scale.set(beat * 0.7, beat * 0.7, beat * 0.7);
    }

    // Expanding pulse aura rings
    if (pulseRingsRef.current) {
      pulseRingsRef.current.children.forEach((child, index) => {
        const ring = child as THREE.Mesh;
        const offset = (t * 0.8 + index * 0.7) % 2.1;
        const scale = 0.6 + offset * 0.9;
        ring.scale.set(scale, scale, 1);
        if (ring.material instanceof THREE.MeshBasicMaterial) {
          ring.material.opacity = Math.max(0, 1 - offset / 2.1) * 0.4;
        }
      });
    }
  });

  return (
    <group ref={monolithRef} position={[0, 0, 0]}>
      {/* ================= MAIN ARTWORK CANVAS WITH 3D GLASS BEVEL ================= */}
      <group position={[0, 0, 0]}>
        {/* Outer Frosted Glass / Backing frame */}
        <mesh position={[0, 0, -0.06]} castShadow receiveShadow>
          <boxGeometry args={[6.7, 3.9, 0.12]} />
          <meshStandardMaterial
            color="#2A241C"
            roughness={0.25}
            metalness={0.65}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Golden Metallic Border Rim */}
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[6.52, 3.72, 0.06]} />
          <meshStandardMaterial
            color="#C5A869"
            metalness={0.85}
            roughness={0.2}
            emissive="#7A5A1C"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* The User's "Highly Empathic" Artwork Texture Quad */}
        <mesh position={[0, 0, 0.04]} castShadow receiveShadow>
          <planeGeometry args={[6.4, 3.6]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>

        {/* Front Subtle Glass Sheen Layer */}
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[6.4, 3.6]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.12}
            roughness={0.05}
            transmission={0.9}
            thickness={0.2}
            reflectivity={0.9}
            color="#FFF8EE"
          />
        </mesh>
      </group>

      {/* ================= 3D PULSING HEART ABOVE HEAD ================= */}
      {/* Positioned right above the character's head corresponding to the heart in the illustration */}
      <group position={[0, 1.45, 0.18]}>
        {/* Pulsing Emissive 3D Heart */}
        <mesh
          ref={heartRef}
          rotation={[Math.PI, 0, 0]}
          position={[-0.18, 0.35, 0]}
          castShadow
        >
          <extrudeGeometry args={[heartShape, extrudeSettings]} />
          <meshStandardMaterial
            color="#E11D48"
            emissive="#F43F5E"
            emissiveIntensity={1.8}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>

        {/* Glowing Heart Point Light */}
        <pointLight color="#FB7185" intensity={2.5} distance={4.5} decay={2} />

        {/* Expanding Aura Rings */}
        <group ref={pulseRingsRef} position={[0, 0, -0.02]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} rotation={[0, 0, 0]}>
              <ringGeometry args={[0.35, 0.42, 32]} />
              <meshBasicMaterial
                color="#FDA4AF"
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* ================= FLOATING INTERACTIVE 3D HOTSPOT NODES ================= */}
      {/* Node 1: Top Right - Highly Empathic Listening */}
      <Html position={[3.6, 1.4, 0.4]} distanceFactor={11} center>
        <div
          onClick={onEnterDashboard}
          className="cursor-pointer select-none group transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#1C1714]/90 backdrop-blur-xl border border-[#E11D48]/50 shadow-xl shadow-[#E11D48]/20 text-white min-w-[210px] hover:border-[#F43F5E]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E] animate-ping shrink-0" />
            <div>
              <p className="text-[11px] font-bold tracking-wider uppercase text-[#FECDD3]">
                Empathic Listening
              </p>
              <p className="text-[10px] text-gray-300">
                100% Non-judgmental & Warm
              </p>
            </div>
          </div>
        </div>
      </Html>

      {/* Node 2: Bottom Left - 100% Confidential Sanctuary */}
      <Html position={[-3.6, -1.2, 0.4]} distanceFactor={11} center>
        <div
          onClick={onEnterDashboard}
          className="cursor-pointer select-none group transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#121A16]/90 backdrop-blur-xl border border-[#10B981]/50 shadow-xl shadow-[#10B981]/20 text-white min-w-[210px] hover:border-[#34D399]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
            <div>
              <p className="text-[11px] font-bold tracking-wider uppercase text-[#A7F3D0]">
                Private Sanctuary
              </p>
              <p className="text-[10px] text-gray-300">
                Encrypted Video & Audio Rooms
              </p>
            </div>
          </div>
        </div>
      </Html>

      {/* Node 3: Bottom Right - Certified Psychologists & Mentors */}
      <Html position={[3.6, -1.2, 0.4]} distanceFactor={11} center>
        <div
          onClick={onEnterDashboard}
          className="cursor-pointer select-none group transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#181512]/90 backdrop-blur-xl border border-[#C5A869]/50 shadow-xl shadow-[#C5A869]/20 text-white min-w-[210px] hover:border-[#E2C78A]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E2C78A] shrink-0" />
            <div>
              <p className="text-[11px] font-bold tracking-wider uppercase text-[#FDE68A]">
                Certified Specialists
              </p>
              <p className="text-[10px] text-gray-300">
                Top Licensed Counselors
              </p>
            </div>
          </div>
        </div>
      </Html>

      {/* Node 4: Top Left - Instant Connect */}
      <Html position={[-3.6, 1.4, 0.4]} distanceFactor={11} center>
        <div
          onClick={onEnterDashboard}
          className="cursor-pointer select-none group transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#131623]/90 backdrop-blur-xl border border-[#6366F1]/50 shadow-xl shadow-[#6366F1]/20 text-white min-w-[210px] hover:border-[#818CF8]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#818CF8] shrink-0" />
            <div>
              <p className="text-[11px] font-bold tracking-wider uppercase text-[#C7D2FE]">
                Instant Connect
              </p>
              <p className="text-[10px] text-gray-300">
                Zero Wait Time • Anonymous Mode
              </p>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

export function Empathy3DScene({ onEnterDashboard }: Empathy3DSceneProps) {
  return (
    <>
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minPolarAngle={Math.PI / 3}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        minDistance={5.5}
        maxDistance={12}
        autoRotate={true}
        autoRotateSpeed={0.4}
        makeDefault
      />

      {/* Ambient and Studio Lighting */}
      <ambientLight intensity={1.1} />
      <directionalLight position={[6, 8, 8]} intensity={1.6} castShadow />
      <directionalLight position={[-6, -4, -4]} intensity={0.5} color="#C5A869" />
      <pointLight position={[0, 4, 3]} intensity={1.8} color="#FFEAC2" distance={10} />
      <pointLight position={[0, -3, 2]} intensity={1.2} color="#4A6B5D" distance={8} />

      {/* Warm Golden and Emerald Wellness Sparkles */}
      <Sparkles
        count={70}
        scale={[12, 8, 6]}
        size={3.2}
        speed={0.4}
        color="#FDE047"
        opacity={0.65}
      />
      <Sparkles
        count={50}
        scale={[10, 7, 5]}
        size={2.5}
        speed={0.3}
        color="#34D399"
        opacity={0.45}
      />

      {/* Main Floating Artwork Monolith */}
      <Float
        speed={1.5}
        rotationIntensity={0.12}
        floatIntensity={0.25}
        floatingRange={[-0.1, 0.1]}
      >
        <EmpathyMonolith onEnterDashboard={onEnterDashboard} />
      </Float>

      {/* Ground Pedestal / Dark Water Reflection Pool */}
      <mesh position={[0, -2.4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial
          color="#0B0E14"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </>
  );
}
