'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/gameStore';
import styles from './page.module.css';

export default function GardenMapPage() {
  const router = useRouter();
  const soundEnabled = useGameStore((state) => state.soundEnabled);
  const toggleSound = useGameStore((state) => state.toggleSound);
  const flowers = useGameStore((state) => state.flowers);
  const butterflies = useGameStore((state) => state.butterflies);
  const hiddenObjects = useGameStore((state) => state.hiddenObjects);
  const letters = useGameStore((state) => state.letters);

  const discoveredFlowers = flowers.filter((f) => f.discovered).length;
  const discoveredButterflies = butterflies.filter((b) => b.discovered).length;
  const discoveredObjects = hiddenObjects.filter((o) => o.discovered).length;
  const discoveredLetters = letters.filter((l) => l.discovered).length;

  const totalDiscoverable = flowers.length + butterflies.length + hiddenObjects.length + letters.length;
  const totalDiscovered = discoveredFlowers + discoveredButterflies + discoveredObjects + discoveredLetters;
  const progressPercent = (totalDiscovered / totalDiscoverable) * 100;

  const locations = [
    {
      id: 'rose-path',
      name: 'The Rose Path',
      icon: '🌹',
      tooltip: 'Discover beautiful roses',
      path: '/secret-garden/rose-path',
      position: 'rosePath',
      discovered: discoveredFlowers,
      total: flowers.length,
    },
    {
      id: 'butterfly-meadow',
      name: 'Butterfly Meadow',
      icon: '🦋',
      tooltip: 'Find hidden butterflies',
      path: '/secret-garden/butterfly-meadow',
      position: 'butterflyMeadow',
      discovered: discoveredButterflies,
      total: butterflies.length,
    },
    {
      id: 'forgotten-corner',
      name: 'The Forgotten Corner',
      icon: '🔮',
      tooltip: 'Solve ancient mysteries',
      path: '/secret-garden/forgotten-corner',
      position: 'forgottenCorner',
      discovered: discoveredObjects,
      total: hiddenObjects.length,
    },
    {
      id: 'little-cottage',
      name: 'The Little Cottage',
      icon: '🏠',
      tooltip: 'Read secret letters',
      path: '/secret-garden/little-cottage',
      position: 'littleCottage',
      discovered: discoveredLetters,
      total: letters.length,
    },
    {
      id: 'wishing-well',
      name: 'The Wishing Well',
      icon: '⛲',
      tooltip: 'Make a wish',
      path: '/secret-garden/wishing-well',
      position: 'wishingWell',
      discovered: 0,
      total: 0,
    },
  ];

  const handleLocationClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.page}>
      <div className={styles.paperTexture} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>The Secret Garden Map</h1>
          <div className={styles.headerControls}>
            <Link href="/secret-garden/journal">
              <button className={styles.iconButton} aria-label="Garden Journal">
                📖
              </button>
            </Link>
            <div className={styles.progressBar}>
              <span>Progress:</span>
              <div className={styles.progressFill}>
                <div className={styles.progressValue} style={{ width: `${progressPercent}%` }} />
              </div>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <button
              className={styles.iconButton}
              onClick={toggleSound}
              aria-label="Toggle sound"
            >
              {soundEnabled ? '🔊' : '🔇'}
            </button>
            <Link href="/">
              <button className={styles.iconButton} aria-label="Home">
                🏠
              </button>
            </Link>
          </div>
        </div>

        <div className={styles.mapContainer}>
          <h2 className={styles.mapTitle}>Choose Your Path</h2>

          <div className={styles.gardenMap}>
            {/* Decorative paths */}
            <div className={styles.path + ' ' + styles.path1} />
            <div className={styles.path + ' ' + styles.path2} />
            <div className={styles.path + ' ' + styles.path3} />
            <div className={styles.path + ' ' + styles.path4} />

            {/* Decorative flowers */}
            <span className={styles.decorativeFlowers + ' ' + styles.flower1}>🌸</span>
            <span className={styles.decorativeFlowers + ' ' + styles.flower2}>🌺</span>
            <span className={styles.decorativeFlowers + ' ' + styles.flower3}>🌼</span>

            {/* Locations */}
            {locations.map((location) => (
              <div
                key={location.id}
                className={`${styles.location} ${styles[location.position]}`}
                onClick={() => handleLocationClick(location.path)}
              >
                <div className={styles.locationTooltip}>{location.tooltip}</div>
                {location.discovered > 0 && location.total > 0 && (
                  <div className={styles.discoveryBadge}>
                    {location.discovered}/{location.total}
                  </div>
                )}
                <div className={styles.locationIcon}>{location.icon}</div>
                <div className={styles.locationName}>{location.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
