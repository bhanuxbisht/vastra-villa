'use client';

import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="about" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.aboutColumn}>
          <h3 className={`${styles.logo} text-gradient`}>VASTRA VILLA</h3>
          <p className={styles.description}>
            Curated Gen Z fits. High-quality streetwear aesthetic for university students. Serving the Dehradun community with low-latency catalog loading and easy local pickup.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
              </svg>
            </a>
            <a href="#" aria-label="Pinterest">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="18" y1="8" x2="22" y2="12"/>
                <line x1="12" y1="18" x2="12" y2="22"/>
                <line x1="6" y1="12" x2="2" y2="8"/>
                <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.08-.15.16-.36.16-.56v-2c0-.52-.16-.92-.36-1.18-.1-.13-.23-.23-.39-.3a4.7 4.7 0 0 1-1.25-.6c-.23-.15-.4-.36-.45-.63 0-.1.01-.2.03-.3l.1-.32c.1-.25.32-.42.6-.42.27 0 .5.1.66.29.35.43.9.72 1.5.72.33 0 .63-.07.9-.2a2.3 2.3 0 0 0 1-1.85V11"/>
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.infoColumn}>
          <h4 className={styles.colTitle}>Store Information</h4>
          <ul className={styles.infoList}>
            <li>
              <strong>Location:</strong> Near Dehradun Campus Market, Dehradun, India
            </li>
            <li>
              <strong>Hours:</strong> Mon - Sat: 11:00 AM - 09:00 PM
            </li>
            <li>
              <strong>Sunday:</strong> 12:00 PM - 08:00 PM
            </li>
            <li>
              <strong>Phone:</strong> +91 98765 43210
            </li>
          </ul>
        </div>

        <div className={styles.linksColumn}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linksList}>
            <li><a href="#hero">Back to Top</a></li>
            <li><a href="#catalog">View Catalog</a></li>
            <li><a href="#near-me">Locate Shop</a></li>
            <li><a href="#about">About Vastra Villa</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>&copy; {currentYear} Vastra Villa. All Rights Reserved. Crafted for Gen Z students.</p>
          <div className={styles.phaseBadge}>
            Phase 1 Active • Checkout Sandbox Enabled
          </div>
        </div>
      </div>
    </footer>
  );
}
