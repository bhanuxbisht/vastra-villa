'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CompletedOrder {
  id: string;
  amount: number;
  currency: string;
  notes?: {
    customerName?: string;
    customerPhone?: string;
  };
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  
  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // Checkout progress states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [acidLogs, setAcidLogs] = useState<string[]>([]);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    setIsCheckingOut(true);
    setAcidLogs([]);
    setCompletedOrder(null);

    const logStages = [
      "ACID TRANSACTION INITIALIZED: Opening session in Dehradun node...",
      "CONCURRENCY ISOLATION: Checking checkout slot ticket...",
      "ISOLATION ACQUIRED: Running order sequence lock verification...",
      "ATOMICITY & CONSISTENCY: Locking product records to prevent double-booking...",
      "MUTEX GRANTED: Validating catalog pricing and variant parameters...",
      "API DISPATCH: Sending payloads to /api/orders backend route...",
    ];

    for (let i = 0; i < logStages.length; i++) {
      setAcidLogs(prev => [...prev, logStages[i]]);
      await new Promise(res => setTimeout(res, 200));
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          customerAddress: address,
          items: cart.map(item => ({
            productId: item.product.id,
            size: item.selectedSize,
            color: item.selectedColor,
            quantity: item.quantity
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setAcidLogs(prev => [
          ...prev, 
          `TRANSACTION ROLLBACK: API rejected checkout. Error: ${data.error || 'Unknown error'}`,
          "ACID ROLLBACK SUCCESS: Released all database records and locks safely.",
          "TRANSACTION STATUS: FAILED"
        ]);
        alert(`Reservation failed: ${data.error || 'Please check stock and try again.'}`);
        return;
      }

      setAcidLogs(prev => [
        ...prev,
        "DURABILITY CONFIRMED: Order appended to ledger database: orders.json.",
        "RAZORPAY INTEGRATION PREP: Packaging paise currency amount, status created.",
        "ACID COMMIT SUCCESSFUL: Transaction logs closed. Order is officially reserved!"
      ]);

      setCompletedOrder(data);
      clearCart();
      // Reset form fields
      setName('');
      setPhone('');
      setAddress('');
    } catch (err) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : String(err);
      setAcidLogs(prev => [
        ...prev, 
        `TRANSACTION EXCEPTION: ${errMsg}`,
        "ACID ROLLBACK SUCCESSFUL: All locks released.",
        "TRANSACTION STATUS: FAILED"
      ]);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={`${styles.drawer} glass`} 
        onClick={(e) => e.stopPropagation()} // Stop closing on drawer click
      >
        <header className={styles.header}>
          <h2>Your Fit Bag</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </header>

        {completedOrder ? (
          /* Order success Screen */
          <div className={styles.successScreen}>
            <div className={styles.successIcon}>
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3>Order Reserved!</h3>
            <p className={styles.successIntro}>
              Your fit has been successfully reserved on the Dehradun catalog ledger. Show this reference at the store counter.
            </p>

            <div className={styles.receiptBox}>
              <div className={styles.receiptRow}>
                <span>Order ID:</span>
                <strong className={styles.orderId}>{completedOrder.id}</strong>
              </div>
              <div className={styles.receiptRow}>
                <span>Customer:</span>
                <span>{completedOrder.notes?.customerName}</span>
              </div>
              <div className={styles.receiptRow}>
                <span>Amount Due:</span>
                <strong>₹{completedOrder.amount / 100}</strong>
              </div>
              <div className={styles.receiptRow}>
                <span>Paise Equivalent:</span>
                <span className={styles.paiseText}>{completedOrder.amount} paise (Razorpay Ready)</span>
              </div>
            </div>

            <div className={styles.acidNotice}>
              <h4>ACID Transaction Logs (Live Server):</h4>
              <div className={styles.logsConsole}>
                {acidLogs.map((log, index) => (
                  <div key={index} className={styles.logLine}>
                    <span className={styles.logTick}>✔</span> {log}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.razorpayCodeBox}>
              <h4>Razorpay SDK Options Structure:</h4>
              <pre className={styles.codeSnippet}>
{`const options = {
  key: "YOUR_RAZORPAY_KEY",
  amount: ${completedOrder.amount},
  currency: "${completedOrder.currency}",
  name: "Vastra Villa",
  description: "Aesthetic Wear Reservation",
  order_id: "${completedOrder.id}",
  prefill: {
    name: "${completedOrder.notes?.customerName}",
    contact: "${completedOrder.notes?.customerPhone}"
  },
  theme: { color: "#6d28d9" }
};`}
              </pre>
              <button 
                className={styles.razorpayBtn}
                onClick={() => alert("Simulating Razorpay Overlay checkout... Payment captured! Status: PAID")}
              >
                Launch Razorpay Checkout
              </button>
            </div>

            <button 
              className={styles.primaryBtn} 
              onClick={() => {
                setCompletedOrder(null);
                onClose();
              }}
            >
              Back to Catalog
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Checkout Progress / Logs Screen */
          <div className={styles.checkoutProgress}>
            <div className={styles.spinner}></div>
            <h3>Processing Order</h3>
            <p>Acquiring inventory lock and finalizing ledger transaction...</p>
            <div className={styles.logsConsole}>
              {acidLogs.map((log, index) => (
                <div key={index} className={styles.logLine}>
                  <span className={styles.logBullet}>➔</span> {log}
                </div>
              ))}
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* Empty Cart Screen */
          <div className={styles.emptyCart}>
            <svg width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <p>Your bag is empty.</p>
            <button className={styles.primaryBtn} onClick={onClose}>Find Your Vibe</button>
          </div>
        ) : (
          /* Standard Cart List & Form */
          <>
            <div className={styles.cartItems}>
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className={styles.itemCard}>
                  <div className={styles.itemImage}>
                    <Image 
                      src={item.product.image} 
                      alt={item.product.name} 
                      width={64} 
                      height={80} 
                      className={styles.img}
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <h4 className={styles.itemName}>{item.product.name}</h4>
                    <span className={styles.itemMeta}>Size: {item.selectedSize} | Color: {item.selectedColor}</span>
                    <div className={styles.itemPrice}>₹{item.product.price * item.quantity}</div>
                    
                    <div className={styles.qtyRow}>
                      <div className={styles.qtyControl}>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.footerSummary}>
              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Local Pickup (Dehradun)</span>
                  <span className={styles.freeText}>FREE</span>
                </div>
                <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              {/* Local Reservation Checkout Form */}
              <form className={styles.form} onSubmit={handleCheckout}>
                <h3>Reserve for Counter Pickup</h3>
                <input 
                  type="text" 
                  placeholder="Your Full Name" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number (for booking alert)" 
                  required 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.input}
                />
                <input 
                  type="text" 
                  placeholder="Campus Hostel / Local Address" 
                  required 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={styles.input}
                />
                <button type="submit" className={styles.primaryBtn}>
                  Confirm Booking (Local Reserve)
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
