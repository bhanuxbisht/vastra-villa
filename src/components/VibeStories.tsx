'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './VibeStories.module.css';

interface StorySlide {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  categoryFilter: string;
}

interface Story {
  id: string;
  title: string;
  thumbnail: string;
  slides: StorySlide[];
}

const STORIES: Story[] = [
  {
    id: 'campus',
    title: 'Campus Fits',
    thumbnail: '/images/products/oversized_tee_black.png',
    slides: [
      {
        image: '/images/products/oversized_tee_black.png',
        title: 'Oversized Vibes',
        subtitle: '240 GSM heavy French terry fits designed for daily campus wear.',
        ctaText: 'Explore Tees',
        categoryFilter: 'Tees'
      },
      {
        image: '/images/products/sage_shirt.png',
        title: 'Sage Corduroy',
        subtitle: 'Earth-toned premium corduroy layer to complete the look.',
        ctaText: 'Explore Shirts',
        categoryFilter: 'Shirts'
      }
    ]
  },
  {
    id: 'cozy',
    title: 'Cozy Season',
    thumbnail: '/images/products/baggy_hoodie.png',
    slides: [
      {
        image: '/images/products/baggy_hoodie.png',
        title: 'Heavy Fleece',
        subtitle: '380 GSM acid-wash comfort for study sessions and chilly evenings.',
        ctaText: 'Explore Hoodies',
        categoryFilter: 'Hoodies'
      },
      {
        image: '/images/products/cable_knit.png',
        title: 'Vintage Knitwear',
        subtitle: 'Classic cream cable-knit pullover for a sophisticated style.',
        ctaText: 'Explore Knitwear',
        categoryFilter: 'Knitwear'
      }
    ]
  },
  {
    id: 'y2k',
    title: 'Y2K Revival',
    thumbnail: '/images/products/y2k_sunglasses.png',
    slides: [
      {
        image: '/images/products/y2k_sunglasses.png',
        title: 'Chrome Sunglasses',
        subtitle: 'Futuristic rave statement piece to highlight your fit.',
        ctaText: 'Explore Accessories',
        categoryFilter: 'Accessories'
      },
      {
        image: '/images/products/crop_top.png',
        title: 'Lettuce Crops',
        subtitle: 'Retro blue ribbed crops for the ultimate early-2000s mood.',
        ctaText: 'Explore Tees',
        categoryFilter: 'Tees'
      }
    ]
  },
  {
    id: 'utility',
    title: 'Utility Gear',
    thumbnail: '/images/products/cargo_pants.png',
    slides: [
      {
        image: '/images/products/cargo_pants.png',
        title: 'Tactical Cargoes',
        subtitle: '8 pocket heavyweight cotton twill pants with adjustable drawstrings.',
        ctaText: 'Explore Cargoes',
        categoryFilter: 'Cargoes'
      }
    ]
  }
];

interface VibeStoriesProps {
  onSelectCategory: (category: string) => void;
}

export default function VibeStories({ onSelectCategory }: VibeStoriesProps) {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [viewedStories, setViewedStories] = useState<string[]>([]);
  
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const storyDuration = 5000; // 5 seconds per slide
  const stepTime = 50; // Update progress every 50ms

  // Initialize viewed stories from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vv_viewed_stories');
      if (stored) {
        const parsed = JSON.parse(stored);
        setTimeout(() => {
          setViewedStories(parsed);
        }, 0);
      }
    } catch (e) {
      console.error('Failed to read viewed stories from localStorage', e);
    }
  }, []);

  // Save viewed stories
  const markStoryAsViewed = useCallback((storyId: string) => {
    setViewedStories((prev) => {
      if (prev.includes(storyId)) return prev;
      const updated = [...prev, storyId];
      try {
        localStorage.setItem('vv_viewed_stories', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  }, []);

  // Navigation handlers
  const handleClose = useCallback(() => {
    setActiveStoryIndex(null);
    setCurrentSlideIndex(0);
    setProgress(0);
    setIsPaused(false);
    
    // Release scroll lock
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, []);

  const handleNext = useCallback(() => {
    if (activeStoryIndex === null) return;
    const currentStory = STORIES[activeStoryIndex];
    
    if (currentSlideIndex < currentStory.slides.length - 1) {
      // Go to next slide in same story
      setCurrentSlideIndex((prev) => prev + 1);
      setProgress(0);
    } else if (activeStoryIndex < STORIES.length - 1) {
      // Go to first slide of next story
      const nextStoryIndex = activeStoryIndex + 1;
      setActiveStoryIndex(nextStoryIndex);
      setCurrentSlideIndex(0);
      setProgress(0);
      markStoryAsViewed(STORIES[nextStoryIndex].id);
    } else {
      // Last slide of last story, close
      handleClose();
    }
  }, [activeStoryIndex, currentSlideIndex, markStoryAsViewed, handleClose]);

  const handlePrev = useCallback(() => {
    if (activeStoryIndex === null) return;
    
    if (currentSlideIndex > 0) {
      // Go to previous slide in same story
      setCurrentSlideIndex((prev) => prev - 1);
      setProgress(0);
    } else if (activeStoryIndex > 0) {
      // Go to last slide of previous story
      const prevStoryIndex = activeStoryIndex - 1;
      const prevStory = STORIES[prevStoryIndex];
      setActiveStoryIndex(prevStoryIndex);
      setCurrentSlideIndex(prevStory.slides.length - 1);
      setProgress(0);
      markStoryAsViewed(prevStory.id);
    } else {
      // First slide of first story, reset progress to 0
      setProgress(0);
    }
  }, [activeStoryIndex, currentSlideIndex, markStoryAsViewed]);

  // Handle auto-advance
  useEffect(() => {
    if (activeStoryIndex === null || isPaused) {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
      return;
    }

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimerRef.current!);
          // SetTimeout to let state finish updating and execute transition
          setTimeout(handleNext, 0);
          return 100;
        }
        return prev + (stepTime / storyDuration) * 100;
      });
    }, stepTime);

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [activeStoryIndex, isPaused, handleNext]);

  // Lock scroll when story viewer opens
  useEffect(() => {
    if (activeStoryIndex !== null) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [activeStoryIndex]);

  // CTA Click handler
  const handleCtaClick = (categoryFilter: string) => {
    onSelectCategory(categoryFilter);
    handleClose();
    
    // Smooth scroll to catalog
    setTimeout(() => {
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleThumbnailClick = (index: number) => {
    setActiveStoryIndex(index);
    setCurrentSlideIndex(0);
    setProgress(0);
    setIsPaused(false);
    markStoryAsViewed(STORIES[index].id);
  };

  return (
    <div className={styles.section}>
      <div className={styles.titleWrapper}>
        <span className={styles.tagline}>STYLING LAB</span>
        <h2 className={styles.sectionTitle}>VIBE STORIES</h2>
      </div>

      {/* Stories Horizontal Tray */}
      <div className={styles.tray}>
        {STORIES.map((story, index) => {
          const isViewed = viewedStories.includes(story.id);
          return (
            <button
              key={story.id}
              className={styles.storyButton}
              onClick={() => handleThumbnailClick(index)}
              aria-label={`Open ${story.title} story`}
            >
              <div className={`${styles.avatarRing} ${isViewed ? styles.viewed : styles.unviewed}`}>
                <div className={styles.avatarInner}>
                  <Image
                    src={story.thumbnail}
                    alt={story.title}
                    width={72}
                    height={72}
                    className={styles.avatarImg}
                  />
                </div>
              </div>
              <span className={styles.storyLabel}>{story.title}</span>
            </button>
          );
        })}
      </div>

      {/* Full screen Story Viewer Modal */}
      <AnimatePresence>
        {activeStoryIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.viewerOverlay}
            onClick={handleClose}
          >
            <div 
              className={styles.viewerContainer}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Active Slide Card */}
              {(() => {
                const story = STORIES[activeStoryIndex];
                const slide = story.slides[currentSlideIndex];
                
                return (
                  <div className={styles.slideCard}>
                    {/* Background Slide Image */}
                    <div className={styles.slideImageWrapper}>
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        priority
                        className={styles.slideImg}
                      />
                      <div className={styles.gradientOverlay} />
                    </div>

                    {/* Interactive Tap Zones */}
                    <div className={styles.tapZones}>
                      <div 
                        className={styles.tapLeft} 
                        onClick={handlePrev}
                        onMouseDown={() => setIsPaused(true)}
                        onMouseUp={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        aria-label="Previous slide"
                      />
                      <div 
                        className={styles.tapRight} 
                        onClick={handleNext}
                        onMouseDown={() => setIsPaused(true)}
                        onMouseUp={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        aria-label="Next slide"
                      />
                    </div>

                    {/* Overlay Header Controls */}
                    <div className={styles.slideHeader}>
                      {/* Multiple Progress Indicator Bars */}
                      <div className={styles.progressRow}>
                        {story.slides.map((_, sIdx) => {
                          let barWidth = '0%';
                          if (sIdx < currentSlideIndex) {
                            barWidth = '100%';
                          } else if (sIdx === currentSlideIndex) {
                            barWidth = `${progress}%`;
                          }
                          return (
                            <div key={sIdx} className={styles.progressBarBg}>
                              <div 
                                className={styles.progressBarFill} 
                                style={{ width: barWidth }} 
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Header Avatar and Label */}
                      <div className={styles.headerInfo}>
                        <div className={styles.headerAvatar}>
                          <Image
                            src={story.thumbnail}
                            alt={story.title}
                            width={32}
                            height={32}
                            className={styles.headerAvatarImg}
                          />
                        </div>
                        <span className={styles.headerTitle}>{story.title}</span>
                        
                        <button 
                          className={styles.closeButton} 
                          onClick={handleClose}
                          aria-label="Close stories"
                        >
                          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Bottom Caption and CTA */}
                    <div className={styles.slideFooter}>
                      <motion.h3 
                        key={`title-${currentSlideIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={styles.slideTitle}
                      >
                        {slide.title}
                      </motion.h3>
                      <motion.p 
                        key={`desc-${currentSlideIndex}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className={styles.slideSubtitle}
                      >
                        {slide.subtitle}
                      </motion.p>
                      
                      <button
                        className={styles.ctaButton}
                        onClick={() => handleCtaClick(slide.categoryFilter)}
                      >
                        {slide.ctaText}
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
