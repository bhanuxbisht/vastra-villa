'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import styles from './AestheticSlider.module.css';

interface AestheticSliderProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
}

export default function AestheticSlider({ products, onOpenDetails }: AestheticSliderProps) {
  const { addToCart } = useCart();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Monitor scroll progress to update arrows and scroll indicators
  const updateScrollState = () => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const currentScroll = el.scrollLeft;

    setScrollProgress(maxScrollLeft > 0 ? (currentScroll / maxScrollLeft) * 100 : 0);
    setCanScrollLeft(currentScroll > 5);
    setCanScrollRight(currentScroll < maxScrollLeft - 5);
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState, { passive: true });
      window.addEventListener('resize', updateScrollState);
      // Run once initially
      updateScrollState();
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', updateScrollState);
      }
      window.removeEventListener('resize', updateScrollState);
    };
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    const scrollAmount = el.clientWidth * 0.8; // Scroll 80% of width
    
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    // Use first variant values (e.g. S / OS, and first color) as defaults for quick add
    const defaultVariant = product.variants[0];
    if (defaultVariant) {
      addToCart(product, defaultVariant.size, defaultVariant.color, 1);
      // Small visual feedback trigger (could extend with temporary state)
      const btn = e.currentTarget as HTMLButtonElement;
      btn.innerText = "Added!";
      btn.classList.add(styles.added);
      setTimeout(() => {
        btn.innerText = "Quick Fit +";
        btn.classList.remove(styles.added);
      }, 1000);
    }
  };

  return (
    <section className={styles.sliderSection}>
      <div className={styles.sliderHeader}>
        <div className={styles.titleArea}>
          <div className={styles.accentBadge}>CURATED DROPS</div>
          <h2 className="text-gradient">TRENDING LOOKS</h2>
        </div>
        
        {/* Navigation controls */}
        <div className={styles.controls}>
          <button 
            className={`${styles.navBtn} ${!canScrollLeft ? styles.disabled : ''}`} 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button 
            className={`${styles.navBtn} ${!canScrollRight ? styles.disabled : ''}`} 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Slide Carousel */}
      <div ref={sliderRef} className={styles.sliderContainer}>
        {products.map((product) => {
          const discountPercent = product.originalPrice 
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
            : 0;

          return (
            <div 
              key={product.id} 
              className={`${styles.slideCard} glass`}
              onClick={() => onOpenDetails(product)}
            >
              {/* Product Visual Container */}
              <div className={styles.imageContainer}>
                {discountPercent > 0 && (
                  <span className={styles.saleBadge}>-{discountPercent}%</span>
                )}
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  sizes="(max-width: 768px) 80vw, 320px"
                  className={styles.image}
                />
                
                {/* Micro-Interaction Overlay */}
                <div className={styles.hoverOverlay}>
                  <button 
                    className={styles.quickAddBtn}
                    onClick={(e) => handleQuickAdd(e, product)}
                  >
                    Quick Fit +
                  </button>
                </div>
              </div>

              {/* Product Details info */}
              <div className={styles.cardInfo}>
                <div className={styles.categoryRow}>
                  <span className={styles.category}>{product.category}</span>
                  <span className={styles.vibeTag}>{product.gender} Vibe</span>
                </div>
                <h3 className={styles.name}>{product.name}</h3>
                
                <div className={styles.priceRow}>
                  <div className={styles.priceContainer}>
                    <span className={styles.price}>₹{product.price}</span>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>₹{product.originalPrice}</span>
                    )}
                  </div>
                  <span className={styles.viewLink}>View Fit ➔</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern Shopify-style bottom progress bar */}
      <div className={styles.progressBarWrapper}>
        <div 
          className={styles.progressBarFill} 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </section>
  );
}
