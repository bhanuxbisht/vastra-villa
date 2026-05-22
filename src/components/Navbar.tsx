'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

interface NavbarProps {
  onCartToggle: () => void;
}

export default function Navbar({ onCartToggle }: NavbarProps) {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [badgeAnimated, setBadgeAnimated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll state for navbar compacting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate cart badge whenever count changes
  useEffect(() => {
    if (cartCount > 0) {
      const handle = requestAnimationFrame(() => {
        setBadgeAnimated(true);
      });
      const t = setTimeout(() => setBadgeAnimated(false), 300);
      return () => {
        cancelAnimationFrame(handle);
        clearTimeout(t);
      };
    }
  }, [cartCount]);

  return (
    <motion.header 
      animate={{
        height: mobileMenuOpen ? 'auto' : (scrolled ? '3.5rem' : '3.75rem')
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${mobileMenuOpen ? styles.mobileOpen : ''} glass`}
    >
      <div className={styles.container}>
        <a href="#hero" className={styles.brand} onClick={() => setMobileMenuOpen(false)}>
          <span className={styles.logoText}>VASTRA VILLA</span>
          <span className={styles.subBrand}>Aesthetic Vibe</span>
        </a>

        <nav className={styles.nav}>
          <a href="#catalog" className={styles.navLink}>Catalog</a>
          <a href="#near-me" className={styles.navLink}>Find Us</a>
          <a href="#about" className={styles.navLink}>Store Hours</a>
        </nav>

        <div className={styles.actions}>
          <button 
            onClick={onCartToggle} 
            className={styles.cartButton} 
            aria-label="Open shopping cart"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className={`${styles.badge} ${badgeAnimated ? styles.badgePop : ''}`}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            className={styles.menuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile vertical navigation dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: {
                height: 'auto',
                opacity: 1,
                transition: {
                  height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.2 },
                  staggerChildren: 0.05,
                  delayChildren: 0.05
                }
              },
              closed: {
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.15 },
                  staggerChildren: 0.03,
                  staggerDirection: -1
                }
              }
            }}
            className={styles.mobileNav}
          >
            <motion.a 
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -8 }
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              href="#catalog" 
              className={styles.mobileNavLink} 
              onClick={() => setMobileMenuOpen(false)}
            >
              Catalog
            </motion.a>
            <motion.a 
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -8 }
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              href="#near-me" 
              className={styles.mobileNavLink} 
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Us
            </motion.a>
            <motion.a 
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -8 }
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              href="#about" 
              className={styles.mobileNavLink} 
              onClick={() => setMobileMenuOpen(false)}
            >
              Store Hours
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
