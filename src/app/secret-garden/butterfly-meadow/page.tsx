'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import styles from './page.module.css';

export default function ButterflyMeadowPage() {
  const router = useRouter();
  const butterflies = useGameStore((state) => state.butterflies);
  const discoverButterfly = useGameStore((state) => state.discoverButterfly);
  const [selectedButterfly, setSelectedButterfly] = useState<typeof butterflies[0] | null>(null);

  const handleButterflyClick = (butterfly: typeof butterflies[0]) => {
    if (!butterfly.discovered) {
      discoverButterfly(butterfly.id);
      setSelectedButterfly(butterfly);
    }
  };

  const handleCloseModal = () => {
    setSelectedButterfly(null);
  };

  const getButterflyPosition = (index: number) => {
    const positions = [
      { top: '15%', left: '25%' },
      { top: '40%', left: '45%' },
      { top: '25%', right: '20%' },
      { bottom: '30%', left: '35%' },
      { bottom: '20%', right: '30%' },
    ];
    return positions[index] || positions[0];
  };

  return (
    <div className={styles.page}>
      <div className={styles.paperTexture} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Butterfly Meadow</h1>
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

        <div className={styles.meadowArea}>
          <span className={styles.lavenderPatch + ' ' + styles.lavender1}>💜</span>
          <span className={styles.lavenderPatch + ' ' + styles.lavender2}>💜</span>
          <span className={styles.lavenderPatch + ' ' + styles.lavender3}>💜</span>
          <span className={styles.lavenderPatch + ' ' + styles.lavender4}>💜</span>
          <span className={styles.wildflower + ' ' + styles.flower1}>🌸</span>
          <span className={styles.wildflower + ' ' + styles.flower2}>🌼</span>
          <span className={styles.wildflower + ' ' + styles.flower3}>🌺</span>

          {butterflies.map((butterfly, index) => (
            <div
              key={butterfly.id}
              className={`${styles.butterfly} ${butterfly.discovered ? styles.discovered : ''}`}
              style={getButterflyPosition(index)}
              onClick={() => handleButterflyClick(butterfly)}
            >
              <div className={styles.butterflyIcon}>🦋</div>
            </div>
          ))}
        </div>

        <div className={styles.instructions}>
          <p>Click on the butterflies to discover their stories. Each butterfly carries a unique tale of the meadow.</p>
        </div>

        <div className={styles.progress}>
          {butterflies.map((butterfly) => (
            <div
              key={butterfly.id}
              className={`${styles.butterflyIndicator} ${butterfly.discovered ? styles.discovered : ''}`}
            >
              🦋
            </div>
          ))}
        </div>

        {selectedButterfly && (
          <div className={styles.discoveryModal} onClick={handleCloseModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalButterfly}>🦋</div>
              <h2 className={styles.modalTitle}>{selectedButterfly.name}</h2>
              <p className={styles.modalDescription}>{selectedButterfly.description}</p>
              <p className={styles.modalMessage}>
                "You discovered a butterfly that was dancing just for you."
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
