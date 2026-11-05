'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PetalProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
}

const Petal: React.FC<PetalProps> = ({ position, rotation, scale, speed }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = initialY + Math.sin(time * speed) * 0.5;
      meshRef.current.rotation.x = rotation[0] + Math.sin(time * speed * 0.5) * 0.2;
      meshRef.current.rotation.y = rotation[1] + time * speed * 0.1;
      meshRef.current.rotation.z = rotation[2] + Math.cos(time * speed * 0.3) * 0.2;
    }
  });

  // Create a simple petal shape
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.quadraticCurveTo(0.3, 0.5, 0, 1);
    s.quadraticCurveTo(-0.3, 0.5, 0, 0);
    return s;
  }, []);

  const extrudeSettings = {
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 2,
  };

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial
        color="#FFE4E1"
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

export const FloatingPetals: React.FC<{ count?: number }> = ({ count = 15 }) => {
  const petals = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 10,
        Math.random() * 8 + 2,
        (Math.random() - 0.5) * 5,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: Math.random() * 0.3 + 0.2,
      speed: Math.random() * 0.5 + 0.3,
    }));
  }, [count]);

  return (
    <group>
      {petals.map((petal, index) => (
        <Petal key={index} {...petal} />
      ))}
    </group>
  );
};
