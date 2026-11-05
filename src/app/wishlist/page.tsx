'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockProducts } from '@/lib/mockData';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import styles from './page.module.css';

export default function WishlistPage() {
  const wishlistStore = useWishlistStore();
  const addItem = useCartStore((state) => state.addItem);

  const wishlistProducts = mockProducts.filter((product) =>
    wishlistStore.productIds.includes(product.id)
  );

  const handleRemoveFromWishlist = (productId: string) => {
    wishlistStore.removeItem(productId);
  };

  const handleAddToCart = (product: any) => {
    addItem(product, product.variants[0], 1);
  };

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach((product) => {
      addItem(product, product.variants[0], 1);
    });
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Your Garden Wishes</h1>
          </div>
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>🌸</div>
            <p className={styles.emptyStateText}>
              Your wishlist is empty. Start collecting your favorite fragrances!
            </p>
            <div className={styles.actionButtons}>
              <Link href="/shop">
                <Button variant="primary" size="large" withFlower>
                  Explore Perfumes
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Garden Wishes</h1>
          <p className={styles.subtitle}>
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'fragrance' : 'fragrances'} you love
          </p>
        </div>

        <div className={styles.wishlistGrid}>
          {wishlistProducts.map((product) => (
            <Card
              key={product.id}
              className={styles.wishlistCard}
              paperTexture
              tornEdge
              interactive
            >
              <div className={styles.productImage}>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  aria-label="Remove from wishlist"
                >
                  ✕
                </button>
                🌹
              </div>
              <div className={styles.productInfo}>
                <p className={styles.productCategory}>{product.category}</p>
                <h3 className={styles.productName}>{product.name}</h3>
                <div className={styles.productPrice}>
                  {product.compareAtPrice && (
                    <span style={{ textDecoration: 'line-through', color: 'var(--color-text-light)', fontSize: '0.875rem', marginRight: '0.5rem' }}>
                      ₹{product.compareAtPrice}
                    </span>
                  )}
                  ₹{product.price}
                </div>
                <Button
                  className={styles.moveToCartButton}
                  variant="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button variant="secondary" size="large" onClick={handleMoveAllToCart}>
            Move All to Cart
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
