'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>We'd love to hear from you</p>
        </div>

        <div className={styles.contactContent}>
          <div className={styles.contactForm}>
            <h2 className={styles.formTitle}>Send a Message</h2>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem', background: '#f0fff4', border: '2px solid #2f855a', borderRadius: 'var(--radius-md)' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#2f855a', marginBottom: '1rem' }}>
                  🌸 Message Sent!
                </p>
                <p style={{ fontFamily: 'var(--font-body)', color: '#2f855a' }}>
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={styles.input}
                    placeholder="Your beautiful name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
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
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={styles.input}
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Tell us your story..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  className={styles.submitButton}
                  withFlower
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Get in Touch</h2>

              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📍</span>
                <div className={styles.infoContent}>
                  <p className={styles.infoLabel}>Address</p>
                  <p className={styles.infoValue}>
                    123 Garden Lane<br />
                    Floral District<br />
                    Mumbai, Maharashtra 400001
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📧</span>
                <div className={styles.infoContent}>
                  <p className={styles.infoLabel}>Email</p>
                  <p className={styles.infoValue}>
                    <a href="mailto:hello@kshmmi.com">hello@kshmmi.com</a>
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📞</span>
                <div className={styles.infoContent}>
                  <p className={styles.infoLabel}>Phone</p>
                  <p className={styles.infoValue}>
                    <a href="tel:+919876543210">+91 98765 43210</a>
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>⏰</span>
                <div className={styles.infoContent}>
                  <p className={styles.infoLabel}>Hours</p>
                  <p className={styles.infoValue}>
                    Monday - Friday: 10am - 6pm<br />
                    Saturday: 10am - 4pm<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Follow Our Garden</h2>
              <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-light)', marginBottom: '1rem', fontStyle: 'italic' }}>
                Stay connected with our fragrant journey through social media
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href="#"
                  style={{
                    width: '50px',
                    height: '50px',
                    border: '2px solid var(--color-lavender-dark)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  📸
                </a>
                <a
                  href="#"
                  style={{
                    width: '50px',
                    height: '50px',
                    border: '2px solid var(--color-lavender-dark)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  📘
                </a>
                <a
                  href="#"
                  style={{
                    width: '50px',
                    height: '50px',
                    border: '2px solid var(--color-lavender-dark)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  📌
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
