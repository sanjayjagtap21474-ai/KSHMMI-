'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import styles from './page.module.css';

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Welcome to Your Garden</h1>
            <p className={styles.subtitle}>Please sign in to access your account</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/auth/login">
              <Button variant="primary" size="large" withFlower>
                Sign In
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
          <h1 className={styles.title}>Your Garden Sanctuary</h1>
          <p className={styles.subtitle}>Welcome back, {user.displayName || user.email}</p>
        </div>

        <div className={styles.accountContent}>
          <aside className={styles.sidebar}>
            <nav className={styles.navigation}>
              <button
                className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Orders
              </button>
              <button
                className={`${styles.navItem} ${activeTab === 'addresses' ? styles.active : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                Addresses
              </button>
              <button
                className={`${styles.navItem} ${activeTab === 'wishlist' ? styles.active : ''}`}
                onClick={() => setActiveTab('wishlist')}
              >
                Wishlist
              </button>
              <button className={styles.navItem} onClick={handleLogout}>
                Sign Out
              </button>
            </nav>
          </aside>

          <div className={styles.content}>
            {activeTab === 'overview' && (
              <>
                <h2 className={styles.sectionTitle}>Account Overview</h2>
                <div className={styles.infoGrid}>
                  <div className={styles.infoCard}>
                    <p className={styles.infoLabel}>Name</p>
                    <p className={styles.infoValue}>{user.displayName || 'Not set'}</p>
                  </div>
                  <div className={styles.infoCard}>
                    <p className={styles.infoLabel}>Email</p>
                    <p className={styles.infoValue}>{user.email}</p>
                  </div>
                  <div className={styles.infoCard}>
                    <p className={styles.infoLabel}>Member Since</p>
                    <p className={styles.infoValue}>January 2024</p>
                  </div>
                </div>

                <h2 className={styles.sectionTitle}>Recent Orders</h2>
                <div className={styles.orderList}>
                  <div className={styles.noOrders}>
                    No orders yet. Start exploring our perfumes!
                  </div>
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <>
                <h2 className={styles.sectionTitle}>Order History</h2>
                <div className={styles.orderList}>
                  <div className={styles.noOrders}>
                    No orders yet.{' '}
                    <Link href="/shop" style={{ color: 'var(--color-dusty-rose)' }}>
                      Start shopping
                    </Link>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'addresses' && (
              <>
                <h2 className={styles.sectionTitle}>Saved Addresses</h2>
                <div className={styles.noOrders}>
                  No saved addresses yet.
                </div>
                <Button variant="primary" style={{ marginTop: '1rem' }}>
                  Add New Address
                </Button>
              </>
            )}

            {activeTab === 'wishlist' && (
              <>
                <h2 className={styles.sectionTitle}>Your Wishlist</h2>
                <div className={styles.noOrders}>
                  <Link href="/wishlist" style={{ color: 'var(--color-dusty-rose)' }}>
                    View your full wishlist
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
