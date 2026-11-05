'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleProps {
  position: [number, number, number];
  size: number;
  color: string;
  speed: number;
}

const Particle: React.FC<ParticleProps> = ({ position, size, color, speed }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  const initialX = position[0];

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = initialY + Math.sin(time * speed) * 0.3;
      meshRef.current.position.x = initialX + Math.cos(time * speed * 0.5) * 0.2;
      const material = meshRef.current.material;
      if (!Array.isArray(material) && 'opacity' in material) {
        material.opacity = 0.5 + Math.sin(time * speed * 2) * 0.3;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.8}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

export const MagicalParticles: React.FC<{ count?: number }> = ({ count = 30 }) => {
  const particles = useMemo(() => {
    const colors = ['#FFD700', '#E6E6FA', '#FFE4E1', '#8FBC8F', '#E0B0FF'];
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 12,
        Math.random() * 10,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      size: Math.random() * 0.05 + 0.02,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.8 + 0.4,
    }));
  }, [count]);

  return (
    <group>
      {particles.map((particle, index) => (
        <Particle key={index} {...particle} />
      ))}
    </group>
  );
};
