'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockProducts } from '@/lib/mockData';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import styles from './page.module.css';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  const wishlistStore = useWishlistStore();

  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <p>Product not found</p>
          <Link href="/shop">
            <Button variant="secondary">Return to Shop</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, product.variants[selectedVariant], quantity);
  };

  const handleToggleWishlist = () => {
    wishlistStore.toggleItem(product.id);
  };

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <Link href="/shop" className={styles.backButton}>
          ← Back to Garden
        </Link>

        <div className={styles.productDetail}>
          <div className={styles.imageSection}>
            <div className={styles.mainImage}>
              <span className={styles.pressFlower} style={{ top: '10%', left: '10%' }}>
                🌺
              </span>
              <span className={styles.pressFlower} style={{ bottom: '15%', right: '15%' }}>
                🌼
              </span>
              🌹
            </div>
            <div className={styles.thumbnailGrid}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`${styles.thumbnail} ${i === 1 ? styles.active : ''}`}>
                  🌹
                </div>
              ))}
            </div>
          </div>

          <div className={styles.infoSection}>
            <p className={styles.breadcrumb}>Garden / {product.category} / {product.name}</p>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.handwrittenSubtitle}>{product.shortDescription}</p>

            <div className={styles.priceSection}>
              <span className={styles.price}>₹{product.price}</span>
              {product.compareAtPrice && (
                <>
                  <span className={styles.comparePrice}>₹{product.compareAtPrice}</span>
                  {discount > 0 && <span className={styles.discount}>{discount}% OFF</span>}
                </>
              )}
            </div>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.notesSection}>
              <p className={styles.notesTitle}>Fragrance Notes</p>
              <div className={styles.notesList}>
                {product.notes.map((note) => (
                  <span key={note} className={styles.note}>
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.variantSelector}>
              <p className={styles.variantTitle}>Select Size</p>
              <div className={styles.variantButtons}>
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    className={`${styles.variantButton} ${selectedVariant === index ? styles.active : ''}`}
                    onClick={() => setSelectedVariant(index)}
                  >
                    {variant.size} - ₹{variant.price}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.quantitySelector}>
              <p className={styles.quantityTitle}>Quantity</p>
              <div className={styles.quantityControls}>
                <button
                  className={styles.quantityButton}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  className={styles.quantityValue}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  aria-label="Quantity"
                />
                <button
                  className={styles.quantityButton}
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <Button
                variant="primary"
                size="large"
                fullWidth
                withFlower
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="large"
                fullWidth
                className={styles.wishlistButton}
                onClick={handleToggleWishlist}
              >
                {wishlistStore.isInWishlist(product.id) ? '♥ In Wishlist' : '♡ Add to Wishlist'}
              </Button>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🌿</span>
                <span>Natural Ingredients</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>✨</span>
                <span>Handcrafted</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>📦</span>
                <span>Free Shipping</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🎁</span>
                <span>Gift Wrapping</span>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className={styles.relatedProducts}>
            <h2 className={styles.relatedTitle}>You May Also Love</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  paperTexture
                  tornEdge
                  interactive
                  onClick={() => router.push(`/product/${relatedProduct.id}`)}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '250px',
                      background: `linear-gradient(135deg, var(--color-antique-white) 0%, var(--color-cream) 100%)`,
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '4rem',
                      opacity: '0.6',
                    }}
                  >
                    🌹
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>
                    {relatedProduct.name}
                  </h3>
                  <p style={{ color: 'var(--color-text-light)', marginBottom: '1rem' }}>
                    {relatedProduct.shortDescription}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>
                      ₹{relatedProduct.price}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
