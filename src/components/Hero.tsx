'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <div className={`${styles.textSection} animate-slide-up`}>
          <div className={styles.badge}>
            <span className={styles.pulse}></span>
            Locally Rooted in Dehradun
          </div>
          <h1 className={`${styles.title} text-gradient`}>
            AESTHETIC<br />VIBES ONLY
          </h1>
          <p className={styles.subtitle}>
            A curated capsule for students. Find premium, high-density fabrics in oversized tees, heavy hoodies, utility cargoes, and accessories. Fast catalog, low latency, local pickup near you.
          </p>
          <div className={styles.ctas}>
            <a href="#catalog" className={styles.primaryBtn}>
              Explore Fits
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <a href="#near-me" className={styles.secondaryBtn}>
              Check Location
            </a>
          </div>
        </div>

        <div className={`${styles.visualSection} animate-fade`}>
          <div className={styles.cardContainer}>
            {/* Floating Visual Card 1 */}
            <div className={`${styles.floatingCard} ${styles.card1} premium-card`}>
              <Image 
                src="/images/products/oversized_tee_black.png" 
                alt="Obsidian Tee" 
                fill 
                sizes="(max-width: 768px) 100vw, 400px"
                priority 
                className={styles.cardImg}
              />
              <div className={styles.cardTag}>Tees</div>
            </div>

            {/* Floating Visual Card 2 */}
            <div className={`${styles.floatingCard} ${styles.card2} premium-card`}>
              <Image 
                src="/images/products/baggy_hoodie.png" 
                alt="Lilac Hoodie" 
                fill 
                sizes="(max-width: 768px) 100vw, 400px"
                priority 
                className={styles.cardImg}
              />
              <div className={styles.cardTag}>Hoodies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
