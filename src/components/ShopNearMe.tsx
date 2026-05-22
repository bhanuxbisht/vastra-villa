'use client';

import React, { useState } from 'react';
import styles from './ShopNearMe.module.css';

// Coordinates for Dehradun - Latitude: 30.3165, Longitude: 78.0322
const STORE_LAT = 30.3165;
const STORE_LON = 78.0322;

export default function ShopNearMe() {
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusText, setStatusText] = useState('');

  // Calculate spherical distance (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);
    setDistance(null);
    setStatusText("Acquiring GPS coordinates...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        
        setStatusText("Computing distance to Dehradun hub...");
        
        const dist = calculateDistance(userLat, userLon, STORE_LAT, STORE_LON);
        setDistance(Number(dist.toFixed(2)));
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
        setError("Could not access your location. Showing distance from center city.");
        // Fallback distance calculation from New Delhi to Dehradun
        setDistance(245.5); // New Delhi to Dehradun approximate
      }
    );
  };

  return (
    <section id="near-me" className={styles.section}>
      <div className={`${styles.box} glass`}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div>
            <h2 className="text-gradient">Shop Near Me</h2>
            <p className={styles.sub}>Check your distance to the Vastra Villa store in Dehradun.</p>
          </div>
        </div>

        <div className={styles.body}>
          {distance !== null ? (
            <div className={styles.resultContainer}>
              <div className={styles.distanceMetric}>
                <span className={styles.number}>{distance}</span>
                <span className={styles.unit}>KM</span>
              </div>
              <p className={styles.distanceDesc}>
                {distance < 5 ? (
                  <span className={styles.deliveryText}>
                    ⚡ You are in our **Ultra-Fast Zone**! Free delivery straight to your hostel or desk in 1 hour.
                  </span>
                ) : distance < 20 ? (
                  <span>
                    🚗 You are within local pickup distance. Reserve items online now and collect at the checkout counter today!
                  </span>
                ) : (
                  <span>
                    📦 You are located outside our immediate city circle. Reserve and we will ship via express courier directly to you!
                  </span>
                )}
              </p>
              <button onClick={handleLocate} className={styles.recalcBtn}>
                Recalculate Location
              </button>
            </div>
          ) : (
            <div className={styles.actionContainer}>
              <p className={styles.ctaText}>
                We use secure browser geolocation checks to verify if you are within range of our student delivery crew. Allow access to get immediate delivery options.
              </p>
              <button 
                onClick={handleLocate} 
                className={styles.locateBtn} 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className={styles.loader}></span>
                    {statusText}
                  </>
                ) : (
                  'Locate Vastra Villa Near Me'
                )}
              </button>
              {error && <p className={styles.errorText}>{error}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
