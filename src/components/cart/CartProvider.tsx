// @ts-nocheck
'use client';

import * as React from 'react';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Define cart item type
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'product' | 'service';
  details?: Record<string, any>;
}

// Define cart context type
interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  checkout: () => void;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Calculate derived values
  const totalItems = items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
  const totalPrice = items.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Failed to parse saved cart:', err);
      }
    }
    setInitialized(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (initialized) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, initialized]);

  // Add item to cart
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems: CartItem[]) => {
      // Check if item already exists in cart
      const existingItem = prevItems.find((i: CartItem) => i.id === item.id);
      
      if (existingItem) {
        // Update quantity of existing item
        return prevItems.map((i: CartItem) => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems((prevItems: CartItem[]) => 
      prevItems.map((item: CartItem) => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setItems((prevItems: CartItem[]) => prevItems.filter((item: CartItem) => item.id !== id));
  };

  // Clear the entire cart
  const clearCart = () => {
    setItems([]);
  };

  // Proceed to checkout
  const checkout = () => {
    if (items.length === 0) return;
    
    // If there's only one item, redirect directly to checkout with its details
    if (items.length === 1) {
      const item = items[0];
      
      if (item.type === 'product') {
        router.push(`/dashboard/checkout?product=${item.id}&name=${encodeURIComponent(item.name)}&price=${item.price}&quantity=${item.quantity}`);
      } else if (item.type === 'service') {
        const plan = item.id;
        const kilos = item.details?.kilos || 1;
        router.push(`/dashboard/checkout?plan=${plan}${plan !== 'subscription' ? `&kilos=${kilos}` : ''}`);
      }
    } else {
      // If there are multiple items, redirect to a cart page first
      router.push('/dashboard/cart');
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Create custom hook for using the cart
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 