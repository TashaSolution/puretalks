"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export function FloatingOrganicMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.25;
      meshRef.current.rotation.y = time * 0.12;
      meshRef.current.rotation.z = Math.cos(time * 0.15) * 0.15;
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x = -time * 0.18;
      innerMeshRef.current.rotation.y = Math.cos(time * 0.25) * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer translucent organic aura sphere in calming Sage Green */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1}>
        <mesh ref={meshRef} scale={2.2}>
          <icosahedronGeometry args={[1, 32]} />
          <MeshDistortMaterial
            color="#5C7C6D"
            attach="material"
            distort={0.35}
            speed={1.2}
            roughness={0.2}
            metalness={0.15}
            transmission={0.7}
            thickness={1.4}
            opacity={0.88}
            transparent
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Inner glowing champagne gold core representing wisdom & calm */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={1.2}>
        <mesh ref={innerMeshRef} scale={1.1}>
          <torusKnotGeometry args={[0.7, 0.22, 100, 16]} />
          <meshStandardMaterial
            color="#C5A869"
            emissive="#C5A869"
            emissiveIntensity={0.25}
            roughness={0.35}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}
