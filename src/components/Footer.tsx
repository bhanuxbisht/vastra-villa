'use client';

import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const contact1 = "8218371219";
  const contact2 = "8937938932";

  return (
    <footer id="about" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.aboutColumn}>
          <h3 className={`${styles.logo} text-gradient`}>VASTRA VILLA</h3>
          <p className={styles.description}>
            Curated Gen Z fits. High-quality streetwear aesthetic for university students. Serving the Dehradun community with local store pickups and campus deliveries.
          </p>
          <div className={styles.socials}>
            {/* Instagram Link */}
            <a 
              href="https://www.instagram.com/itsvastrvilla/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            
            {/* WhatsApp Link */}
            <a 
              href={`https://wa.me/91${contact1}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="WhatsApp"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.019-5.101-2.875-6.959-1.856-1.857-4.321-2.879-6.953-2.88-5.438 0-9.862 4.422-9.865 9.866-.001 1.772.475 3.502 1.382 5.03l-.998 3.645 3.732-.979zm11.368-7.234c-.3-.15-1.776-.877-2.046-.975-.27-.1-.466-.15-.66.15-.195.3-.756.975-.926 1.17-.17.195-.34.218-.64.067-.3-.15-1.268-.467-2.417-1.493-.892-.796-1.494-1.78-1.67-2.08-.17-.3-.018-.462.13-.61.135-.133.3-.349.45-.523.15-.174.2-.3.3-.497.1-.198.05-.373-.026-.523-.075-.15-.66-1.59-.904-2.178-.238-.57-.479-.493-.66-.503-.17-.008-.365-.01-.56-.01-.195 0-.51.073-.777.365-.268.293-1.023 1.002-1.023 2.444 0 1.442 1.049 2.836 1.195 3.031.147.195 2.064 3.153 5.002 4.428.699.303 1.244.484 1.67.62.704.224 1.346.193 1.853.118.563-.083 1.776-.726 2.025-1.428.248-.702.248-1.303.174-1.428-.075-.124-.27-.198-.57-.348z"/>
              </svg>
            </a>

            {/* Call Link */}
            <a 
              href={`tel:+91${contact2}`} 
              aria-label="Call Store"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.infoColumn}>
          <h4 className={styles.colTitle}>Store Information</h4>
          <ul className={styles.infoList}>
            <li>
              <strong>Location:</strong> Lane No. 4, Turner Road, Clement Town, Dehradun, Uttarakhand 248002
            </li>
            <li>
              <strong>Hours:</strong> Mon - Sat: 11:00 AM - 09:00 PM
            </li>
            <li>
              <strong>Sunday:</strong> 12:00 PM - 08:00 PM
            </li>
            <li>
              <strong>Phone/WA 1:</strong> <a href={`tel:+91${contact1}`} className={styles.infoLink}>+91 {contact1}</a>
            </li>
            <li>
              <strong>Phone/WA 2:</strong> <a href={`tel:+91${contact2}`} className={styles.infoLink}>+91 {contact2}</a>
            </li>
          </ul>
        </div>

        <div className={styles.linksColumn}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linksList}>
            <li><a href="#hero">Back to Top</a></li>
            <li><a href="#catalog">View Catalog</a></li>
            <li><a href="#near-me">Find Us</a></li>
            <li><a href="#about">About Vastra Villa</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>&copy; {currentYear} Vastra Villa. All Rights Reserved. Crafted for Gen Z students.</p>
          
          <div className={styles.bottomContact}>
            <a 
              href={`https://wa.me/91${contact1}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.bottomContactLink}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style={{ verticalAlign: 'middle', marginRight: '4px' }}>
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.019-5.101-2.875-6.959-1.856-1.857-4.321-2.879-6.953-2.88-5.438 0-9.862 4.422-9.865 9.866-.001 1.772.475 3.502 1.382 5.03l-.998 3.645 3.732-.979zm11.368-7.234c-.3-.15-1.776-.877-2.046-.975-.27-.1-.466-.15-.66.15-.195.3-.756.975-.926 1.17-.17.195-.34.218-.64.067-.3-.15-1.268-.467-2.417-1.493-.892-.796-1.494-1.78-1.67-2.08-.17-.3-.018-.462.13-.61.135-.133.3-.349.45-.523.15-.174.2-.3.3-.497.1-.198.05-.373-.026-.523-.075-.15-.66-1.59-.904-2.178-.238-.57-.479-.493-.66-.503-.17-.008-.365-.01-.56-.01-.195 0-.51.073-.777.365-.268.293-1.023 1.002-1.023 2.444 0 1.442 1.049 2.836 1.195 3.031.147.195 2.064 3.153 5.002 4.428.699.303 1.244.484 1.67.62.704.224 1.346.193 1.853.118.563-.083 1.776-.726 2.025-1.428.248-.702.248-1.303.174-1.428-.075-.124-.27-.198-.57-.348z"/>
              </svg>
              WA: +91 {contact1}
            </a>
            
            <a 
              href={`tel:+91${contact2}`} 
              className={styles.bottomContactLink}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ verticalAlign: 'middle', marginRight: '4px' }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Call: +91 {contact2}
            </a>
          </div>

          <div className={styles.phaseBadge}>
            Phase 1 Active • Checkout Sandbox Enabled
          </div>
        </div>
      </div>
    </footer>
  );
}
