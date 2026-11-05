'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockProducts, categories } from '@/lib/mockData';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import styles from './page.module.css';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const addItem = useCartStore((state) => state.addItem);
  const wishlistStore = useWishlistStore();

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (product: any) => {
    addItem(product, product.variants[0], 1);
  };

  const handleToggleWishlist = (productId: string) => {
    wishlistStore.toggleItem(productId);
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>The Perfume Garden</h1>
          <p className={styles.subtitle}>Discover Your Signature Scent</p>
        </div>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search perfumes..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search perfumes"
          />
        </div>

        <div className={styles.filters}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.filterButton} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className={styles.productGrid}>
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={styles.productCard}
                paperTexture
                tornEdge
                interactive
              >
                <div className={styles.productImage}>
                  <button
                    className={`${styles.wishlistButton} ${wishlistStore.isInWishlist(product.id) ? styles.active : ''}`}
                    onClick={() => handleToggleWishlist(product.id)}
                    aria-label="Add to wishlist"
                  >
                    <svg
                      fill={wishlistStore.isInWishlist(product.id) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      width={20}
                      height={20}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                  🌹
                </div>
                <div className={styles.productInfo}>
                  <p className={styles.productCategory}>{product.category}</p>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.productPrice}>
                    {product.compareAtPrice && (
                      <span className={styles.original}>₹{product.compareAtPrice}</span>
                    )}
                    ₹{product.price}
                  </div>
                  <Button
                    className={styles.addToCartButton}
                    variant="primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>🌸</div>
            <p className={styles.emptyStateText}>
              No perfumes found matching your search. Try exploring our garden!
            </p>
            <Button variant="secondary" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
              View All Perfumes
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
