'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import styles from './page.module.css';

export default function ForgottenCornerPage() {
  const router = useRouter();
  const hiddenObjects = useGameStore((state) => state.hiddenObjects);
  const discoverHiddenObject = useGameStore((state) => state.discoverHiddenObject);
  const puzzleCompleted = useGameStore((state) => state.puzzleCompleted);
  const completePuzzle = useGameStore((state) => state.completePuzzle);
  const [selectedObject, setSelectedObject] = useState<typeof hiddenObjects[0] | null>(null);
  const [puzzleAnswer, setPuzzleAnswer] = useState('');
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  const handleObjectClick = (obj: typeof hiddenObjects[0]) => {
    if (!obj.discovered) {
      discoverHiddenObject(obj.id);
      setSelectedObject(obj);
    }
  };

  const handleCloseModal = () => {
    setSelectedObject(null);
  };

  const handlePuzzleSubmit = () => {
    // Simple puzzle: answer is "garden"
    if (puzzleAnswer.toLowerCase() === 'garden') {
      setPuzzleSolved(true);
      completePuzzle();
    } else {
      alert('Not quite right. Think about where you are...');
    }
  };

  const allDiscovered = hiddenObjects.every((obj) => obj.discovered);

  const getObjectPosition = (index: number) => {
    const positions = [
      { top: '30%', left: '20%' },
      { top: '50%', right: '25%' },
      { bottom: '25%', left: '40%' },
    ];
    return positions[index] || positions[0];
  };

  return (
    <div className={styles.page}>
      <div className={styles.paperTexture} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>The Forgotten Corner</h1>
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

        <div className={styles.cornerArea}>
          <div className={styles.gardenArch}>🏛️</div>
          <span className={styles.overgrownPlants + ' ' + styles.plant1}>🌿</span>
          <span className={styles.overgrownPlants + ' ' + styles.plant2}>🌿</span>
          <span className={styles.overgrownPlants + ' ' + styles.plant3}>🌿</span>
          <span className={styles.overgrownPlants + ' ' + styles.plant4}>🌿</span>

          {hiddenObjects.map((obj, index) => (
            <div
              key={obj.id}
              className={`${styles.hiddenObject} ${obj.discovered ? styles.discovered : ''}`}
              style={getObjectPosition(index)}
              onClick={() => handleObjectClick(obj)}
            >
              <div className={styles.objectIcon}>
                {index === 0 && '🗝️'}
                {index === 1 && '🧪'}
                {index === 2 && '📕'}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.instructions}>
          <p>Explore this mysterious corner. Click on objects to discover clues. Find all three to unlock the secret puzzle.</p>
        </div>

        <div className={styles.puzzleSection}>
          <h2 className={styles.puzzleTitle}>Ancient Mystery</h2>
          <div className={styles.objectProgress}>
            {hiddenObjects.map((obj) => (
              <div
                key={obj.id}
                className={`${styles.objectIndicator} ${obj.discovered ? styles.discovered : ''}`}
              >
                {obj.discovered ? '✓' : '?'}
              </div>
            ))}
          </div>

          {!allDiscovered ? (
            <div className={styles.puzzleLocked}>
              <p>Find all three hidden objects to unlock the puzzle</p>
            </div>
          ) : puzzleCompleted || puzzleSolved ? (
            <div className={styles.puzzleUnlocked}>
              <p style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.25rem', color: 'var(--color-brown)', marginBottom: '1rem' }}>
                "You have unlocked the secret of the forgotten corner!"
              </p>
              <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-dark)' }}>
                The answer was always around you: <strong>GARDEN</strong>
              </p>
            </div>
          ) : (
            <div>
              <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-dark)', marginBottom: '1rem' }}>
                What is this place?
              </p>
              <input
                type="text"
                className={styles.puzzleInput}
                placeholder="Enter your answer..."
                value={puzzleAnswer}
                onChange={(e) => setPuzzleAnswer(e.target.value)}
              />
              <Button variant="primary" onClick={handlePuzzleSubmit}>
                Solve Mystery
              </Button>
            </div>
          )}
        </div>

        {selectedObject && (
          <div className={styles.clueModal} onClick={handleCloseModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalIcon}>
                {selectedObject.id === 'object-1' && '🗝️'}
                {selectedObject.id === 'object-2' && '🧪'}
                {selectedObject.id === 'object-3' && '📕'}
              </div>
              <h2 className={styles.modalTitle}>{selectedObject.name}</h2>
              <p className={styles.modalClue}>{selectedObject.clue}</p>
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
