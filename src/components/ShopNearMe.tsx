'use client';

import React from 'react';
import styles from './ShopNearMe.module.css';

export default function ShopNearMe() {
  const contact1 = "8218371219";
  const contact2 = "8937938932";

  return (
    <section id="near-me" className={styles.section}>
      <div className={`${styles.box} glass`}>
        <div className={styles.gridContainer}>
          {/* Info Side */}
          <div className={styles.infoSide}>
            <div className={styles.header}>
              <div className={styles.icon}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div>
                <h2 className="text-gradient">VISIT OUR STORE</h2>
                <p className={styles.sub}>Find us in Clement Town</p>
              </div>
            </div>

            <div className={styles.details}>
              <div className={styles.detailBlock}>
                <span className={styles.label}>Address</span>
                <p className={styles.text}>
                  Vastra Villa Boutique<br />
                  Lane No. 4, Turner Road, Clement Town,<br />
                  Dehradun, Uttarakhand 248002
                </p>
                <a 
                  href="https://maps.app.goo.gl/3XZJvfxnjeetmNAv7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directionsLink}
                >
                  Get Directions
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ marginLeft: '4px' }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </div>

              <div className={styles.detailBlock}>
                <span className={styles.label}>Hours</span>
                <p className={styles.text}>
                  Mon - Sat: 11:00 AM - 09:00 PM<br />
                  Sunday: 12:00 PM - 08:00 PM
                </p>
              </div>

              <div className={styles.detailBlock}>
                <span className={styles.label}>Contact & Chat</span>
                
                {/* Contact Row 1 */}
                <div className={styles.contactRow}>
                  <div className={styles.numberLabel}>
                    <span className={styles.phoneNum}>+91 {contact1}</span>
                  </div>
                  <div className={styles.buttonGroup}>
                    <a 
                      href={`https://wa.me/91${contact1}?text=Hi%20Vastra%20Villa,%20I'm%20interested%20in%20your%20clothing%20fits.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.contactBtn} ${styles.whatsappBtn}`}
                      title="Chat on WhatsApp"
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.019-5.101-2.875-6.959-1.856-1.857-4.321-2.879-6.953-2.88-5.438 0-9.862 4.422-9.865 9.866-.001 1.772.475 3.502 1.382 5.03l-.998 3.645 3.732-.979zm11.368-7.234c-.3-.15-1.776-.877-2.046-.975-.27-.1-.466-.15-.66.15-.195.3-.756.975-.926 1.17-.17.195-.34.218-.64.067-.3-.15-1.268-.467-2.417-1.493-.892-.796-1.494-1.78-1.67-2.08-.17-.3-.018-.462.13-.61.135-.133.3-.349.45-.523.15-.174.2-.3.3-.497.1-.198.05-.373-.026-.523-.075-.15-.66-1.59-.904-2.178-.238-.57-.479-.493-.66-.503-.17-.008-.365-.01-.56-.01-.195 0-.51.073-.777.365-.268.293-1.023 1.002-1.023 2.444 0 1.442 1.049 2.836 1.195 3.031.147.195 2.064 3.153 5.002 4.428.699.303 1.244.484 1.67.62.704.224 1.346.193 1.853.118.563-.083 1.776-.726 2.025-1.428.248-.702.248-1.303.174-1.428-.075-.124-.27-.198-.57-.348z"/>
                      </svg>
                      Chat
                    </a>
                    <a 
                      href={`tel:+91${contact1}`}
                      className={`${styles.contactBtn} ${styles.callBtn}`}
                      title="Call Us"
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      Call
                    </a>
                  </div>
                </div>

                {/* Contact Row 2 */}
                <div className={styles.contactRow}>
                  <div className={styles.numberLabel}>
                    <span className={styles.phoneNum}>+91 {contact2}</span>
                  </div>
                  <div className={styles.buttonGroup}>
                    <a 
                      href={`https://wa.me/91${contact2}?text=Hi%20Vastra%20Villa,%20I'm%20interested%20in%20your%20clothing%20fits.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.contactBtn} ${styles.whatsappBtn}`}
                      title="Chat on WhatsApp"
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.019-5.101-2.875-6.959-1.856-1.857-4.321-2.879-6.953-2.88-5.438 0-9.862 4.422-9.865 9.866-.001 1.772.475 3.502 1.382 5.03l-.998 3.645 3.732-.979zm11.368-7.234c-.3-.15-1.776-.877-2.046-.975-.27-.1-.466-.15-.66.15-.195.3-.756.975-.926 1.17-.17.195-.34.218-.64.067-.3-.15-1.268-.467-2.417-1.493-.892-.796-1.494-1.78-1.67-2.08-.17-.3-.018-.462.13-.61.135-.133.3-.349.45-.523.15-.174.2-.3.3-.497.1-.198.05-.373-.026-.523-.075-.15-.66-1.59-.904-2.178-.238-.57-.479-.493-.66-.503-.17-.008-.365-.01-.56-.01-.195 0-.51.073-.777.365-.268.293-1.023 1.002-1.023 2.444 0 1.442 1.049 2.836 1.195 3.031.147.195 2.064 3.153 5.002 4.428.699.303 1.244.484 1.67.62.704.224 1.346.193 1.853.118.563-.083 1.776-.726 2.025-1.428.248-.702.248-1.303.174-1.428-.075-.124-.27-.198-.57-.348z"/>
                      </svg>
                      Chat
                    </a>
                    <a 
                      href={`tel:+91${contact2}`}
                      className={`${styles.contactBtn} ${styles.callBtn}`}
                      title="Call Us"
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className={styles.mapSide}>
            <iframe 
              src="https://maps.google.com/maps?q=30.2720431,77.9979194&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Vastra Villa Store Location Map"
              className={styles.mapIframe}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
