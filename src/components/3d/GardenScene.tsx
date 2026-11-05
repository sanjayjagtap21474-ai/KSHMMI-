'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { FloatingPetals } from './FloatingPetals';
import { Butterflies } from './Butterflies';
import { MagicalParticles } from './MagicalParticles';

export const GardenScene: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#FFE4E1" />

        <Suspense fallback={null}>
          <FloatingPetals count={20} />
          <Butterflies count={6} />
          <MagicalParticles count={40} />
        </Suspense>
      </Canvas>
    </div>
  );
};
