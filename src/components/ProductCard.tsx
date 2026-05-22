'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '../data/products';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const { name, price, originalPrice, image, category, gender } = product;

  // Calculate discount percentage
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <article className={`${styles.card} premium-card`} onClick={() => onOpenDetails(product)}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 300px"
          loading="lazy"
          className={styles.image}
        />
        {discount > 0 && (
          <span className={styles.discountBadge}>
            -{discount}% OFF
          </span>
        )}
        <span className={styles.genderBadge}>{gender}</span>
      </div>

      <div className={styles.details}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.name}>{name}</h3>
        
        <div className={styles.pricing}>
          <span className={styles.price}>₹{price}</span>
          {originalPrice && (
            <span className={styles.originalPrice}>₹{originalPrice}</span>
          )}
        </div>

        <button 
          className={styles.actionBtn}
          onClick={(e) => {
            e.stopPropagation(); // Avoid triggering open modal double-actions
            onOpenDetails(product);
          }}
          aria-label={`View details for ${name}`}
        >
          Select Fit
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>
    </article>
  );
}
