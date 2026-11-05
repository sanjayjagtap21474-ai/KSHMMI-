'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GardenScene } from '@/components/3d/GardenScene';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <GardenScene />
      <Header />

      <main>
        {/* Hero Section - Garden Entrance */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>KSHMMI</h1>
            <p className={styles.heroSubtitle}>Where Every Scent Tells a Story</p>
            <p className={styles.heroDescription}>
              Step into our enchanted garden of handcrafted botanical perfumes. Each fragrance is
              a love letter to nature, carefully composed with the finest ingredients from around
              the world.
            </p>
            <div className={styles.ctaButton}>
              <Link href="/shop">
                <Button variant="primary" size="large" withFlower vintage>
                  Explore the Garden
                </Button>
              </Link>
            </div>
          </div>

          <div className={styles.gardenPath}>
            <div className={styles.scrollIndicator}>
              <span>Discover More</span>
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className={`${styles.section} ${styles.featuredSection}`}>
          <h2 className={styles.sectionTitle}>Our Collections</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <Card botanicalFrame interactive>
              <CardHeader title="Floral Garden" subtitle="Delicate & Romantic" />
              <CardContent>
                <p style={{ marginBottom: '1rem' }}>
                  Inspired by blooming gardens at dawn. Rose, jasmine, and lily intertwine in
                  timeless elegance.
                </p>
                <Link href="/shop?category=floral">
                  <Button variant="secondary" fullWidth>
                    Explore Collection
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card botanicalFrame interactive>
              <CardHeader title="Woody Forest" subtitle="Earthy & Warm" />
              <CardContent>
                <p style={{ marginBottom: '1rem' }}>
                  Walk through ancient forests. Sandalwood, cedar, and amber create depth and
                  sophistication.
                </p>
                <Link href="/shop?category=woody">
                  <Button variant="secondary" fullWidth>
                    Explore Collection
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card botanicalFrame interactive>
              <CardHeader title="Fresh Meadow" subtitle="Light & Airy" />
              <CardContent>
                <p style={{ marginBottom: '1rem' }}>
                  Morning dew on wildflowers. Citrus, green tea, and white musk capture pure
                  freshness.
                </p>
                <Link href="/shop?category=fresh">
                  <Button variant="secondary" fullWidth>
                    Explore Collection
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Story Section */}
        <section className={`${styles.section} ${styles.storySection}`}>
          <div className={styles.storyContent}>
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <div className={styles.botanicalIllustration}>
              <span className={styles.pressFlower} style={{ top: '10%', left: '10%' }}>
                🌺
              </span>
              <span className={styles.pressFlower} style={{ bottom: '15%', right: '15%' }}>
                🌼
              </span>
            </div>
            <p className={styles.storyText}>
              KSHMMI was born from a dream to capture the ephemeral beauty of gardens in bottles.
              Like a vintage botanical journal, each perfume page tells a story of carefully
              collected flowers, distant travels, and moments of pure inspiration.
            </p>
            <p className={styles.storyText}>
              We believe in the art of slow perfumery—taking time to let each note unfold, like
              petals opening to the sun. Our fragrances are not rushed; they are composed with
              patience, passion, and an unwavering commitment to quality.
            </p>
            <span className={styles.handwrittenAnnotation}>
              "Every scent is a memory waiting to be discovered"
            </span>
            <div style={{ marginTop: '2rem' }}>
              <Link href="/about">
                <Button variant="outline" withFlower>
                  Read Our Full Story
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products Preview */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Garden Favorites</h2>
          <div style={{ textAlign: 'center', padding: '2rem', background: 'linear-gradient(135deg, var(--color-antique-white) 0%, var(--color-cream) 100%)', border: '2px solid var(--color-lavender-dark)', borderRadius: 'var(--radius-lg)', maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: 'var(--color-text-light)', marginBottom: '1rem', fontStyle: 'italic' }}>
              Our garden is being prepared with new fragrances. Check back soon!
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
