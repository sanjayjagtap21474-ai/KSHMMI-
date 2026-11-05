'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Our Story</h1>
          <p className={styles.subtitle}>A love letter to nature in every bottle</p>
        </div>

        <div className={styles.storySection}>
          <span className={styles.pressFlower} style={{ top: '10%', left: '10%' }}>
            🌺
          </span>
          <span className={styles.pressFlower} style={{ bottom: '15%', right: '15%' }}>
            🌼
          </span>

          <h2 className={styles.sectionTitle}>The Beginning</h2>
          <p className={styles.storyText}>
            KSHMMI was born from a dream that began in a small garden at dawn. The founder, wandering
            through rows of blooming roses and jasmine, realized that these fleeting moments of
            beauty deserved to be captured and preserved. Not just as memories, but as fragrances
            that could transport anyone, anywhere, to that magical garden moment.
          </p>
          <p className={styles.storyText}>
            What started as a passion project in a tiny kitchen has blossomed into a sanctuary of
            scent, where every perfume is composed like a poem and every bottle tells a story.
          </p>

          <div className={styles.botanicalDivider}>❀</div>

          <h2 className={styles.sectionTitle}>Our Philosophy</h2>
          <p className={styles.storyText}>
            We believe in the art of slow perfumery. In a world that rushes, we take time. Time to
            let each note unfold naturally, time to source the finest ingredients from around the
            world, time to craft each fragrance with patience and precision.
          </p>
          <p className={styles.storyText}>
            Our perfumes are not mass-produced; they are handcrafted in small batches, ensuring
            that every bottle receives the attention it deserves. We work with sustainable suppliers
            and ethical practices, because caring for nature is as important to us as capturing its
            beauty.
          </p>

          <div className={styles.handwrittenQuote}>
            "Every scent is a memory waiting to be discovered, a story waiting to be told"
          </div>

          <h2 className={styles.sectionTitle}>Our Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🌿</div>
              <h3 className={styles.valueTitle}>Natural Ingredients</h3>
              <p className={styles.valueDescription}>
                We source the finest natural ingredients from sustainable farms around the world,
                ensuring purity and quality in every drop.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>✨</div>
              <h3 className={styles.valueTitle}>Handcrafted</h3>
              <p className={styles.valueDescription}>
                Each perfume is carefully composed by hand in small batches, allowing for the
                attention to detail that machine production cannot achieve.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>💚</div>
              <h3 className={styles.valueTitle}>Sustainable</h3>
              <p className={styles.valueDescription}>
                We are committed to environmentally conscious practices, from packaging to
                production, minimizing our footprint on the earth we love.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🎨</div>
              <h3 className={styles.valueTitle}>Artistic</h3>
              <p className={styles.valueDescription}>
                Perfumery is an art form to us. Each fragrance is composed like a symphony, with
                notes that harmonize and evolve over time.
              </p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/shop">
            <Button variant="primary" size="large" withFlower>
              Explore Our Collection
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
