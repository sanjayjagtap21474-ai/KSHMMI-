'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import styles from './page.module.css';

export default function CartPage() {
  const { items, subtotal, total, updateQuantity, removeItem, clearCart } = useCartStore();

  const handleQuantityChange = (productId: string, variantId: string, newQuantity: number) => {
    updateQuantity(productId, variantId, newQuantity);
  };

  const handleRemoveItem = (productId: string, variantId: string) => {
    removeItem(productId, variantId);
  };

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Your Garden Basket</h1>
          </div>
          <div className={styles.emptyCart}>
            <div className={styles.emptyCartIcon}>🌸</div>
            <p className={styles.emptyCartText}>
              Your basket is empty. Time to explore our magical garden!
            </p>
            <Link href="/shop">
              <Button variant="primary" size="large" withFlower>
                Explore Perfumes
              </Button>
            </Link>
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
          <h1 className={styles.title}>Your Garden Basket</h1>
          <p style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.5rem', color: 'var(--color-dusty-rose)' }}>
            {items.length} {items.length === 1 ? 'treasure' : 'treasures'} collected
          </p>
        </div>

        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className={styles.cartItem}>
                <div className={styles.itemImage}>🌹</div>
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.product.name}</h3>
                  <p className={styles.itemVariant}>{item.variant.size}</p>
                  <p className={styles.itemPrice}>₹{item.variant.price}</p>
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.quantityButton}
                      onClick={() =>
                        handleQuantityChange(item.productId, item.variantId, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className={styles.quantityValue}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.productId,
                          item.variantId,
                          parseInt(e.target.value) || 1
                        )
                      }
                      min="1"
                      aria-label="Quantity"
                    />
                    <button
                      className={styles.quantityButton}
                      onClick={() =>
                        handleQuantityChange(item.productId, item.variantId, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={styles.itemActions}>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveItem(item.productId, item.variantId)}
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                  <p className={styles.itemTotal}>₹{item.variant.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.orderSummary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax</span>
              <span>Included</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <div className={styles.discountCode}>
              <input
                type="text"
                placeholder="Enter discount code"
                className={styles.discountInput}
                aria-label="Discount code"
              />
              <Button variant="secondary" className={styles.discountButton}>
                Apply Code
              </Button>
            </div>

            <Link href="/checkout">
              <Button variant="primary" size="large" className={styles.checkoutButton} withFlower>
                Proceed to Checkout
              </Button>
            </Link>

            <div className={styles.continueShopping}>
              <Link href="/shop">
                <Button variant="outline" fullWidth>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
