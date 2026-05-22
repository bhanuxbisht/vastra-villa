'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface CheckoutPayload {
  orderId: string; // Ready for ACID server-side generation
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: {
    productId: string;
    name: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number; // in INR
  totalAmountInPaise: number; // Razorpay payload
  status: 'PENDING' | 'CONFIRMED' | 'PAID' | 'FAILED';
  createdAt: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  checkoutSimulate: (customer: { name: string; phone: string; address: string }) => Promise<CheckoutPayload>;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper functions to keep component render phase pure
function generateSimulatedOrderId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `VV_ORD_${timestamp}_${random}`;
}

function getTimestampString(): string {
  return new Date().toISOString();
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vastra_villa_cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        requestAnimationFrame(() => {
          setCart(parsed);
          setIsInitialized(true);
        });
        return;
      }
    } catch (e) {
      console.error('Failed to parse cart storage', e);
    }
    requestAnimationFrame(() => {
      setIsInitialized(true);
    });
  }, []);

  // Save cart to local storage on update
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('vastra_villa_cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkoutSimulate = async (customer: { name: string; phone: string; address: string }): Promise<CheckoutPayload> => {
    // Generate simulated Order ID mimicking transaction lock using pure helpers
    const orderId = generateSimulatedOrderId();
    const total = cartTotal;

    const payload: CheckoutPayload = {
      orderId,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerAddress: customer.address,
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        size: item.selectedSize,
        color: item.selectedColor,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: total,
      totalAmountInPaise: total * 100,
      status: 'CONFIRMED', // Ready for Phase 2 checkout capture
      createdAt: getTimestampString(),
    };

    // Simulate server processing network latency
    await new Promise((res) => setTimeout(res, 1200));

    // Clear cart locally
    clearCart();
    return payload;
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkoutSimulate,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
