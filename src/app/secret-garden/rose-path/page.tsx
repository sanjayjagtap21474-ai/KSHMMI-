'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import styles from './page.module.css';

export default function RosePathPage() {
  const router = useRouter();
  const flowers = useGameStore((state) => state.flowers);
  const discoverFlower = useGameStore((state) => state.discoverFlower);
  const [selectedFlower, setSelectedFlower] = useState<typeof flowers[0] | null>(null);

  const handleRoseClick = (flower: typeof flowers[0]) => {
    if (!flower.discovered) {
      discoverFlower(flower.id);
      setSelectedFlower(flower);
    }
  };

  const handleCloseModal = () => {
    setSelectedFlower(null);
  };

  const getRosePosition = (index: number) => {
    const positions = [
      { top: '15%', left: '20%' },
      { top: '35%', left: '15%' },
      { top: '55%', right: '20%' },
      { top: '25%', right: '15%' },
      { bottom: '15%', left: '30%' },
    ];
    return positions[index] || positions[0];
  };

  return (
    <div className={styles.page}>
      <div className={styles.paperTexture} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>The Rose Path</h1>
          <div className={styles.headerControls}>
            <Link href="/secret-garden/journal">
              <button className={styles.iconButton} aria-label="Garden Journal">
                📖
              </button>
            </Link>
            <Link href="/secret-garden/map">
              <button className={styles.iconButton} aria-label="Back to Map">
                🗺️
              </button>
            </Link>
          </div>
        </div>

        <div className={styles.gardenArea}>
          <div className={styles.pathway} />

          {flowers.map((flower, index) => (
            <div
              key={flower.id}
              className={`${styles.roseBush} ${flower.discovered ? styles.discovered : ''}`}
              style={getRosePosition(index)}
              onClick={() => handleRoseClick(flower)}
            >
              <div className={styles.roseIcon}>🌹</div>
            </div>
          ))}
        </div>

        <div className={styles.instructions}>
          <p>Click on the roses to discover their stories. Each rose holds a unique beauty waiting for you.</p>
        </div>

        <div className={styles.progress}>
          {flowers.map((flower) => (
            <div
              key={flower.id}
              className={`${styles.roseIndicator} ${flower.discovered ? styles.discovered : ''}`}
            >
              🌹
            </div>
          ))}
        </div>

        {selectedFlower && (
          <div className={styles.discoveryModal} onClick={handleCloseModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalFlower}>🌹</div>
              <h2 className={styles.modalTitle}>{selectedFlower.name}</h2>
              <p className={styles.modalDescription}>{selectedFlower.description}</p>
              <p className={styles.modalMessage}>
                "You found a little piece of beauty that was waiting just for you."
              </p>
              <Button variant="primary" className={styles.closeButton} onClick={handleCloseModal}>
                Continue Exploring
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
