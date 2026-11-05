'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import styles from './page.module.css';

export default function GardenJournalPage() {
  const router = useRouter();
  const flowers = useGameStore((state) => state.flowers);
  const butterflies = useGameStore((state) => state.butterflies);
  const hiddenObjects = useGameStore((state) => state.hiddenObjects);
  const letters = useGameStore((state) => state.letters);
  const puzzleCompleted = useGameStore((state) => state.puzzleCompleted);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const discoveredFlowers = flowers.filter((f) => f.discovered);
  const discoveredButterflies = butterflies.filter((b) => b.discovered);
  const discoveredObjects = hiddenObjects.filter((o) => o.discovered);
  const discoveredLetters = letters.filter((l) => l.discovered);

  const handleItemClick = (item: any) => {
    if (item.discovered) {
      setSelectedItem(item);
    }
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.paperTexture} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Garden Journal</h1>
          <div className={styles.headerControls}>
            <Link href="/secret-garden/map">
              <button className={styles.iconButton} aria-label="Back to Map">
                🗺️
              </button>
            </Link>
            <Link href="/">
              <button className={styles.iconButton} aria-label="Home">
                🏠
              </button>
            </Link>
          </div>
        </div>

        <div className={styles.journal}>
          <h2 className={styles.journalTitle}>Your Discoveries</h2>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{discoveredFlowers.length}/{flowers.length}</div>
              <div className={styles.statLabel}>Flowers</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{discoveredButterflies.length}/{butterflies.length}</div>
              <div className={styles.statLabel}>Butterflies</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{discoveredObjects.length}/{hiddenObjects.length}</div>
              <div className={styles.statLabel}>Objects</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{discoveredLetters.length}/{letters.length}</div>
              <div className={styles.statLabel}>Letters</div>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Flowers Collected</h3>
            {discoveredFlowers.length > 0 ? (
              <div className={styles.grid}>
                {flowers.map((flower) => (
                  <div
                    key={flower.id}
                    className={`${styles.itemCard} ${flower.discovered ? styles.discovered : styles.undiscovered}`}
                    onClick={() => handleItemClick(flower)}
                  >
                    <div className={styles.itemIcon}>🌹</div>
                    <div className={styles.itemName}>{flower.name}</div>
                    <div className={styles.itemStatus}>
                      {flower.discovered ? 'Discovered' : 'Hidden'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>No flowers discovered yet</div>
            )}
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Butterflies Found</h3>
            {discoveredButterflies.length > 0 ? (
              <div className={styles.grid}>
                {butterflies.map((butterfly) => (
                  <div
                    key={butterfly.id}
                    className={`${styles.itemCard} ${butterfly.discovered ? styles.discovered : styles.undiscovered}`}
                    onClick={() => handleItemClick(butterfly)}
                  >
                    <div className={styles.itemIcon}>🦋</div>
                    <div className={styles.itemName}>{butterfly.name}</div>
                    <div className={styles.itemStatus}>
                      {butterfly.discovered ? 'Discovered' : 'Hidden'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>No butterflies discovered yet</div>
            )}
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Hidden Objects</h3>
            {discoveredObjects.length > 0 ? (
              <div className={styles.grid}>
                {hiddenObjects.map((obj) => (
                  <div
                    key={obj.id}
                    className={`${styles.itemCard} ${obj.discovered ? styles.discovered : styles.undiscovered}`}
                    onClick={() => handleItemClick(obj)}
                  >
                    <div className={styles.itemIcon}>
                      {obj.id === 'object-1' && '🗝️'}
                      {obj.id === 'object-2' && '🧪'}
                      {obj.id === 'object-3' && '📕'}
                    </div>
                    <div className={styles.itemName}>{obj.name}</div>
                    <div className={styles.itemStatus}>
                      {obj.discovered ? 'Found' : 'Hidden'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>No objects discovered yet</div>
            )}
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Secret Letters</h3>
            {discoveredLetters.length > 0 ? (
              <div className={styles.grid}>
                {letters.map((letter) => (
                  <div
                    key={letter.id}
                    className={`${styles.itemCard} ${letter.discovered ? styles.discovered : styles.undiscovered}`}
                    onClick={() => handleItemClick(letter)}
                  >
                    <div className={styles.itemIcon}>✉️</div>
                    <div className={styles.itemName}>{letter.title}</div>
                    <div className={styles.itemStatus}>
                      {letter.discovered ? 'Read' : 'Locked'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>No letters discovered yet</div>
            )}
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Special Achievements</h3>
            <div className={styles.grid}>
              <div className={`${styles.itemCard} ${puzzleCompleted ? styles.discovered : styles.undiscovered}`}>
                <div className={styles.itemIcon}>🔮</div>
                <div className={styles.itemName}>Puzzle Master</div>
                <div className={styles.itemStatus}>
                  {puzzleCompleted ? 'Completed' : 'Locked'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedItem && (
          <div className={styles.itemDetailModal} onClick={handleCloseModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalIcon}>
                {selectedItem.description && '🌹'}
                {selectedItem.clue && '🗝️'}
                {selectedItem.message && '✉️'}
              </div>
              <h2 className={styles.modalTitle}>{selectedItem.name || selectedItem.title}</h2>
              <p className={styles.modalDescription}>
                {selectedItem.description || selectedItem.clue || selectedItem.message}
              </p>
              <Button variant="primary" className={styles.closeButton} onClick={handleCloseModal}>
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
