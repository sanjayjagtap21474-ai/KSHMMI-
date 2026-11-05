'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/hooks/useAuth';
import styles from './page.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, total, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Checkout</h1>
          </div>
          <div className={styles.emptyCart}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: 'var(--color-text-light)', marginBottom: '1rem' }}>
              Your cart is empty
            </p>
            <Link href="/shop">
              <Button variant="primary" withFlower>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setLoading(true);

    try {
      // Razorpay integration will be added here when credentials are available
      // For now, we'll simulate the order creation
      console.log('Placing order with data:', formData);
      console.log('Order total:', total);
      console.log('Cart items:', items);

      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear cart and redirect to success page
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Complete Your Order</h1>
          <p className={styles.subtitle}>Almost there, garden traveler</p>
        </div>

        <div className={styles.checkoutContent}>
          <div className={styles.checkoutForm}>
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Shipping Information</h2>
              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="fullName" className={styles.label}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={styles.input}
                    placeholder="Your beautiful name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={styles.input}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={styles.input}
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="addressLine1" className={styles.label}>
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    className={styles.input}
                    placeholder="Street address, apartment, etc."
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="addressLine2" className={styles.label}>
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    className={styles.input}
                    placeholder="Landmark, etc."
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="city" className={styles.label}>
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className={styles.input}
                    placeholder="Your city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="state" className={styles.label}>
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className={styles.input}
                    placeholder="Your state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="postalCode" className={styles.label}>
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className={styles.input}
                    placeholder="123456"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="country" className={styles.label}>
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    className={styles.input}
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Payment Method</h2>
              <div style={{ padding: '1rem', background: 'var(--color-warm-ivory)', border: '2px solid var(--color-lavender-dark)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <input type="radio" id="razorpay" name="payment" checked readOnly />
                  <label htmlFor="razorpay" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--color-text-dark)' }}>
                    Razorpay (Test Mode)
                  </label>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-text-light)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                  Secure payment via Razorpay. Cards, UPI, Netbanking supported.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.orderSummary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.orderItems}>
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className={styles.orderItem}>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.product.name}</p>
                    <p className={styles.itemVariant}>{item.variant.size}</p>
                    <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
                  </div>
                  <p className={styles.itemTotal}>₹{item.variant.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{total}</span>
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

            <Button
              variant="primary"
              size="large"
              className={styles.placeOrderButton}
              withFlower
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </Button>

            <div className={styles.securityNote}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure checkout powered by Razorpay</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
