'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useGameStore } from '@/store/gameStore';
import styles from './page.module.css';

export default function WishingWellPage() {
  const router = useRouter();
  const wishes = useGameStore((state) => state.wishes);
  const addWish = useGameStore((state) => state.addWish);
  const deleteWish = useGameStore((state) => state.deleteWish);
  const [modalOpen, setModalOpen] = useState(false);
  const [wishText, setWishText] = useState('');
  const [response, setResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  const inspirationalResponses = [
    'Your wish has been planted in the garden of dreams.',
    'The flowers heard your wish and bloomed a little brighter.',
    'A butterfly carried your wish to the stars.',
    'The garden whispers: your wish is already becoming true.',
    'Your wish floats on the wind, finding its way to you.',
    'The wishing well received your wish with grace.',
    'Every flower sends you thanks for your beautiful wish.',
    'Your wish joins the countless others that have made this garden magical.',
  ];

  const handleWellClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setWishText('');
    setResponse('');
    setShowResponse(false);
  };

  const handleSubmitWish = () => {
    if (wishText.trim()) {
      const randomResponse = inspirationalResponses[Math.floor(Math.random() * inspirationalResponses.length)];
      addWish(wishText, randomResponse);
      setResponse(randomResponse);
      setShowResponse(true);
      setWishText('');
    }
  };

  const handleDeleteWish = (id: string) => {
    deleteWish(id);
  };

  return (
    <div className={styles.page}>
      <div className={styles.paperTexture} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>The Wishing Well</h1>
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

        <div className={styles.wellArea}>
          <span className={styles.wellFlowers + ' ' + styles.flower1}>🌸</span>
          <span className={styles.wellFlowers + ' ' + styles.flower2}>🌺</span>
          <span className={styles.wellFlowers + ' ' + styles.flower3}>🌼</span>
          <span className={styles.wellFlowers + ' ' + styles.flower4}>🌷</span>
          <div className={styles.wishingWell} onClick={handleWellClick}>
            ⛲
          </div>
        </div>

        <div className={styles.instructions}>
          <p>Click the wishing well to make a wish. Your wish will be kept safe in the garden's heart.</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--color-text-light)' }}>
            All wishes remain private on your device.
          </p>
        </div>

        {wishes.length > 0 && (
          <div className={styles.previousWishes}>
            <h2 className={styles.wishesTitle}>Your Wishes</h2>
            {wishes.map((wish) => (
              <div key={wish.id} className={styles.wishItem}>
                <p className={styles.wishText}>{wish.message}</p>
                <p className={styles.wishResponse}>Well's response: {wish.response}</p>
                <button
                  className={styles.deleteWish}
                  onClick={() => handleDeleteWish(wish.id)}
                >
                  Delete wish
                </button>
              </div>
            ))}
          </div>
        )}

        {modalOpen && (
          <div className={styles.wishModal} onClick={handleCloseModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalIcon}>⛲</div>
              <h2 className={styles.modalTitle}>Make a Wish</h2>

              {!showResponse ? (
                <>
                  <textarea
                    className={styles.wishInput}
                    placeholder="Write your wish here..."
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    maxLength={500}
                  />
                  <p className={styles.privacyNote}>
                    Your wish will be saved locally on your device and will not be shared publicly.
                  </p>
                  <Button variant="primary" className={styles.submitButton} onClick={handleSubmitWish}>
                    Send Wish to the Well
                  </Button>
                </>
              ) : (
                <>
                  <div className={styles.responseMessage}>{response}</div>
                  <Button variant="primary" className={styles.closeButton} onClick={handleCloseModal}>
                    Close
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
