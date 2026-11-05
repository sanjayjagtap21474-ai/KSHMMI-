'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ButterflyProps {
  position: [number, number, number];
  color: string;
  speed: number;
  wingSpan: number;
}

const Butterfly: React.FC<ButterflyProps> = ({ position, color, speed, wingSpan }) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(position);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Butterfly movement pattern
      groupRef.current.position.x =
        initialPosition.current[0] + Math.sin(time * speed * 0.5) * 2;
      groupRef.current.position.y =
        initialPosition.current[1] + Math.sin(time * speed * 0.3) * 1.5;
      groupRef.current.position.z =
        initialPosition.current[2] + Math.cos(time * speed * 0.4) * 1;
      groupRef.current.rotation.y = Math.sin(time * speed * 0.2) * 0.5;
    }

    // Wing flapping
    if (leftWingRef.current && rightWingRef.current) {
      const flapAngle = Math.sin(time * speed * 5) * 0.4;
      leftWingRef.current.rotation.z = flapAngle;
      rightWingRef.current.rotation.z = -flapAngle;
    }
  });

  // Create wing shape
  const wingShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.5, 0.3, 0.6, 0);
    shape.quadraticCurveTo(0.5, -0.2, 0, -0.1);
    shape.quadraticCurveTo(-0.2, -0.3, -0.3, -0.1);
    shape.quadraticCurveTo(-0.2, 0.1, 0, 0);
    return shape;
  }, []);

  const extrudeSettings = {
    depth: 0.01,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.005,
    bevelSegments: 1,
  };

  return (
    <group ref={groupRef} position={position}>
      {/* Left wing */}
      <mesh ref={leftWingRef} position={[0, 0, 0]} scale={[wingSpan, wingSpan, wingSpan]}>
        <extrudeGeometry args={[wingShape, extrudeSettings]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.9} />
      </mesh>
      {/* Right wing */}
      <mesh ref={rightWingRef} position={[0, 0, 0]} scale={[wingSpan, wingSpan, wingSpan]}>
        <extrudeGeometry args={[wingShape, extrudeSettings]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.9} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0, 0.02]} scale={[0.05, 0.2, 0.05]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        <meshStandardMaterial color="#5D3A1A" />
      </mesh>
    </group>
  );
};

export const Butterflies: React.FC<{ count?: number }> = ({ count = 5 }) => {
  const butterflies = useMemo(() => {
    const colors = ['#E6E6FA', '#D8A7A7', '#8FBC8F', '#FFE4E1', '#E0B0FF'];
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 8,
        Math.random() * 6 + 1,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.5 + 0.5,
      wingSpan: Math.random() * 0.3 + 0.4,
    }));
  }, [count]);

  return (
    <group>
      {butterflies.map((butterfly, index) => (
        <Butterfly key={index} {...butterfly} />
      ))}
    </group>
  );
};
