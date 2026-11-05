'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

export default function CheckoutSuccessPage() {
  const orderNumber = `KSH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.container}>
        <div className={styles.successCard}>
          <span className={styles.pressFlower} style={{ top: '10%', left: '10%' }}>
            🌺
          </span>
          <span className={styles.pressFlower} style={{ bottom: '15%', right: '15%' }}>
            🌼
          </span>

          <div className={styles.icon}>🌸</div>
          <h1 className={styles.title}>Order Confirmed!</h1>
          <p className={styles.subtitle}>Your fragrant journey begins</p>

          <p className={styles.message}>
            Thank you for choosing KSHMMI. Your order has been received and is being prepared with
            care. We'll send you an email confirmation shortly with tracking details.
          </p>

          <div className={styles.orderNumber}>
            Order Number: {orderNumber}
          </div>

          <div className={styles.actionButtons}>
            <Link href="/account">
              <Button variant="primary" size="large" withFlower fullWidth>
                View Order Details
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="secondary" size="large" fullWidth>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
