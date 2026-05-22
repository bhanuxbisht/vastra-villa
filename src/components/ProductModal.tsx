'use client';

import React, { useState, useEffect, useRef } from 'react';
import ThreeDViewer from './ThreeDViewer';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import styles from './ProductModal.module.css';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);
  
  // Parse available sizes and colors from variants
  const sizes = product ? Array.from(new Set(product.variants.map((v) => v.size))) : [];
  const colors = product ? Array.from(new Set(product.variants.map((v) => v.color))) : [];

  const [selectedSize, setSelectedSize] = useState(() => sizes[0] || 'OS');
  const [selectedColor, setSelectedColor] = useState(() => colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Manage native browser dialog visibility and body scroll lock
  useEffect(() => {
    if (product) {
      dialogRef.current?.showModal();
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = ''; // Unlock scrolling
    }
    return () => {
      document.body.style.overflow = ''; // Ensure cleanup on unmount
    };
  }, [product]);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      handleClose();
    }, 800);
  };

  if (!product) return null;

  return (
    <dialog 
      ref={dialogRef} 
      className={`${styles.dialog} glass`}
      onClose={onClose}
      onClick={(e) => {
        // Close when clicking backdrop area (light dismiss)
        if (e.target === dialogRef.current) {
          handleClose();
        }
      }}
    >
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close dialog">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className={styles.grid}>
          <div className={styles.imageSection}>
            <ThreeDViewer
              src={product.image}
              alt={product.name}
              badgeText="3D Tilt Fit"
              images={product.images}
            />
          </div>

          <div className={styles.infoSection}>
            <span className={styles.category}>{product.category}</span>
            <h2 className={styles.title}>{product.name}</h2>
            
            <div className={styles.pricing}>
              <span className={styles.price}>₹{product.price}</span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>₹{product.originalPrice}</span>
              )}
            </div>

            <p className={styles.description}>{product.description}</p>

            {/* Color Select */}
            {colors.length > 0 && colors[0] !== '' && (
              <div className={styles.optionGroup}>
                <span className={styles.optionTitle}>Select Color:</span>
                <div className={styles.chips}>
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`${styles.chip} ${selectedColor === color ? styles.activeChip : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Select */}
            {sizes.length > 0 && sizes[0] !== 'OS' && (
              <div className={styles.optionGroup}>
                <span className={styles.optionTitle}>Select Size:</span>
                <div className={styles.chips}>
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`${styles.chip} ${selectedSize === size ? styles.activeChip : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className={styles.optionGroup}>
              <span className={styles.optionTitle}>Quantity:</span>
              <div className={styles.qtyControl}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={styles.qtyBtn}
                >
                  -
                </button>
                <span className={styles.qtyVal}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className={styles.qtyBtn}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add Action Button */}
            <button 
              onClick={handleAddToCart}
              className={`${styles.addBtn} ${added ? styles.addBtnSuccess : ''}`}
              disabled={added}
            >
              {added ? (
                <>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Added to Vibe!
                </>
              ) : (
                'Add to Cart'
              )}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
