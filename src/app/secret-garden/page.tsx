'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import styles from './page.module.css';

export default function SecretGardenPage() {
  const router = useRouter();
  const soundEnabled = useGameStore((state) => state.soundEnabled);
  const toggleSound = useGameStore((state) => state.toggleSound);

  const handleEnterGarden = () => {
    router.push('/secret-garden/map');
  };

  return (
    <div className={styles.page}>
      <div className={styles.paperTexture} />

      <div className={styles.container}>
        <div className={styles.gateIllustration}>
          <div className={styles.decorativeElements}>
            <span className={styles.rose}>🌹</span>
            <span className={styles.rose}>🌹</span>
            <span className={styles.rose}>🌹</span>
            <span className={styles.rose}>🌹</span>
            <span className={styles.butterfly}>🦋</span>
            <span className={styles.butterfly}>🦋</span>
          </div>
          <div className={styles.gateArt}>🏰</div>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>THE SECRET GARDEN</h1>
          <p className={styles.subtitle}>A Little World of Wonder</p>

          <p className={styles.story}>
            Somewhere between a dream and a memory, there is a garden waiting to be discovered.
            Every flower has a story. Every corner holds a secret. And every visitor leaves a little
            magic behind.
          </p>

          <div className={styles.controls}>
            <Button
              variant="primary"
              size="large"
              className={styles.enterButton}
              withFlower
              vintage
              onClick={handleEnterGarden}
            >
              Enter the Garden
            </Button>

            <button
              className={styles.iconButton}
              onClick={toggleSound}
              aria-label="Toggle sound"
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
          </div>

          <Link href="/" className={styles.backLink}>
            ← Back to KSHMMI
          </Link>

          <p className={styles.signature}>~ KSHMMI ~</p>
        </div>
      </div>
    </div>
  );
}
