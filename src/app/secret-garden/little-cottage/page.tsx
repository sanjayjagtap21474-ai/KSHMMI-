'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import styles from './page.module.css';

export default function LittleCottagePage() {
  const router = useRouter();
  const letters = useGameStore((state) => state.letters);
  const discoverLetter = useGameStore((state) => state.discoverLetter);
  const [selectedLetter, setSelectedLetter] = useState<typeof letters[0] | null>(null);

  const handleMailboxClick = () => {
    // Show letter selector
  };

  const handleLetterClick = (letter: typeof letters[0]) => {
    if (!letter.discovered) {
      discoverLetter(letter.id);
    }
    setSelectedLetter(letter);
  };

  const handleCloseModal = () => {
    setSelectedLetter(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.paperTexture} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>The Little Cottage</h1>
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

        <div className={styles.cottageArea}>
          <div className={styles.cottage}>🏠</div>
          <div className={styles.chimney}>🏭</div>
          <span className={styles.flowerWindow + ' ' + styles.window1}>🌸</span>
          <span className={styles.flowerWindow + ' ' + styles.window2}>🌸</span>
          <div className={styles.mailbox} onClick={handleMailboxClick}>
            📬
          </div>
        </div>

        <div className={styles.instructions}>
          <p>Click the mailbox to discover secret letters hidden in the cottage. Each letter holds a special message.</p>
        </div>

        <div className={styles.letterSelector}>
          {letters.map((letter) => (
            <div
              key={letter.id}
              className={`${styles.envelope} ${letter.discovered ? styles.discovered : ''}`}
              onClick={() => handleLetterClick(letter)}
            >
              <div className={styles.envelopeIcon}>✉️</div>
              <div className={styles.envelopeLabel}>
                {letter.discovered ? 'Read' : 'Closed'}
              </div>
            </div>
          ))}
        </div>

        {selectedLetter && (
          <div className={styles.letterModal} onClick={handleCloseModal}>
            <div className={styles.letterPaper} onClick={(e) => e.stopPropagation()}>
              <div className={styles.letterIcon}>✉️</div>
              <h2 className={styles.letterTitle}>{selectedLetter.title}</h2>
              <p className={styles.letterMessage}>{selectedLetter.message}</p>
              <Button variant="primary" className={styles.closeButton} onClick={handleCloseModal}>
                Close Letter
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
