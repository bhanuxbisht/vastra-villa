'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, PanInfo } from 'framer-motion';
import styles from './ThreeDViewer.module.css';

interface ThreeDViewerProps {
  src: string;
  alt: string;
  badgeText?: string;
  images?: string[];
}

export default function ThreeDViewer({ src, alt, badgeText = "3D FIT ORBIT", images = [] }: ThreeDViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [shineStyle, setShineStyle] = useState<React.CSSProperties>({});
  
  // Use provided images list, or fall back to single src
  const angleImages = images && images.length > 0 ? images : [src];
  const [activeIndex, setActiveIndex] = useState(0);
  const initialIndexRef = useRef(0);

  // Drag threshold in pixels to switch to next angle
  const dragThreshold = 25; 

  const handlePanStart = () => {
    initialIndexRef.current = activeIndex;
  };

  const handlePan = (event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (angleImages.length <= 1) return;
    
    // Horizontal offset from starting pan position
    const dx = info.offset.x;
    
    // Divide drag offset by threshold to get step count (using Math.round for symmetric dragging)
    const steps = Math.round(dx / dragThreshold);
    
    // Calculate new angle index (dragging right moves back, dragging left moves forward)
    let newIndex = (initialIndexRef.current - steps) % angleImages.length;
    if (newIndex < 0) {
      newIndex = angleImages.length + newIndex;
    }
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const rect = el.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const normalizedX = (mouseX / width) - 0.5;
    const normalizedY = (mouseY / height) - 0.5;

    // Subtle 3D perspective rotation on hover (Max 15 degrees for premium style)
    const rotX = -normalizedY * 15;
    const rotY = normalizedX * 15;

    setRotateX(rotX);
    setRotateY(rotY);

    // Soft reflection sheen
    const angle = Math.atan2(mouseY - height / 2, mouseX - width / 2) * (180 / Math.PI);
    setShineStyle({
      background: `linear-gradient(${angle}deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 80%)`,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setShineStyle({ opacity: 0 });
  };

  return (
    <div className={styles.viewerWrapper}>
      <motion.div 
        ref={containerRef}
        className={`${styles.container} ${isHovered ? styles.active : ''}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onPanStart={handlePanStart}
        onPan={handlePan}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.01 : 1}, ${isHovered ? 1.01 : 1}, 1)`,
        }}
      >
        {/* Sleek Overlay Badge */}
        {badgeText && (
          <div className={styles.badge}>
            {badgeText}
          </div>
        )}

        {/* Interactive Grab Handle Guide Overlay */}
        {angleImages.length > 1 && (
          <div className={styles.dragPrompt}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M3 12h18"/>
            </svg>
            <span>Drag to rotate</span>
          </div>
        )}

        <div className={styles.imageContainer}>
          {angleImages.map((img, idx) => (
            <div
              key={idx}
              className={`${styles.imageWrapper} ${activeIndex === idx ? styles.visibleImage : ''}`}
            >
              <Image 
                src={img} 
                alt={`${alt} View Angle ${idx}`}
                fill
                priority
                draggable={false}
                sizes="(max-width: 768px) 100vw, 500px"
                className={styles.clothingImage}
              />
            </div>
          ))}
          
          {/* Reflective Sheen Layer */}
          <div className={styles.shine} style={shineStyle} />
        </div>
      </motion.div>

      {/* Apple-Style Angle Selector Capsule */}
      {angleImages.length > 1 && (
        <div className={styles.controlsCapsule}>
          {angleImages.map((_, idx) => {
            let label = "Front";
            if (angleImages.length === 3) {
              if (idx === 1) label = "Side";
              if (idx === 2) label = "Back";
            } else if (angleImages.length === 2) {
              if (idx === 1) label = "Back";
            } else {
              label = `Angle ${idx + 1}`;
            }

            const active = activeIndex === idx;

            return (
              <button
                key={idx}
                type="button"
                className={`${styles.angleBtn} ${active ? styles.activeAngle : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
