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

  // Listen for storage changes (for cart reset on logout)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart' && e.newValue === null) {
        // Cart was cleared in another context (logout)
        setItems([]);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Check for stored product from non-authenticated users
  useEffect(() => {
    // Check if there's a stored product in localStorage
    const storedProduct = localStorage.getItem('cartProduct');
    if (storedProduct) {
      try {
        const product = JSON.parse(storedProduct);
        // Add the stored product to the cart
        setItems(prevItems => {
          // Check if product already exists
          const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
          
          if (existingItemIndex >= 0) {
            // Update quantity if item exists
            const newItems = [...prevItems];
            newItems[existingItemIndex].quantity += (product.quantity || 1);
            return newItems;
          } else {
            // Add new item
            return [...prevItems, {
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: product.quantity || 1,
              type: 'product',
            }];
          }
        });
        
        // Clear the stored product
        localStorage.removeItem('cartProduct');
        
        // Redirect to cart page if there was a stored product
        setTimeout(() => {
          router.push('/dashboard/cart');
        }, 300);
      } catch (err) {
        console.error('Failed to parse stored product:', err);
      }
    }
  }, [router]);

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
  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const quantity = item.quantity || 1;
    
    setItems((prevItems: CartItem[]) => {
      // Check if item already exists in cart
      const existingItem = prevItems.find((i: CartItem) => i.id === item.id);
      
      if (existingItem) {
        // For items added through product detail page, respect the passed quantity
        // rather than incrementing the existing quantity
        if (item.quantity) {
          return prevItems.map((i: CartItem) => 
            i.id === item.id 
              ? { ...i, quantity: quantity }
              : i
          );
        } else {
          // If no quantity provided, increment by 1 (for quick add buttons)
          return prevItems.map((i: CartItem) => 
            i.id === item.id 
              ? { ...i, quantity: i.quantity + 1 } 
              : i
          );
        }
      } else {
        // Add new item with provided quantity or default to 1
        return [...prevItems, { ...item, quantity }];
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
    
    // Always redirect to checkout page with all items
    router.push('/dashboard/checkout');
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