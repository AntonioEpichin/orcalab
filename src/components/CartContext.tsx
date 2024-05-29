'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for the items in the cart
interface CartItem {
  id: string;
  preço: number;
  // Add other properties of the item as needed
}

// Define the type for the context state
interface CartContextState {
  cartItems: CartItem[];
  total: number;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (item: CartItem) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
}

// Initialize the context with undefined to enforce the use of the provider
const CartContext = createContext<CartContextState | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setTotal((prevTotal) => prevTotal + parseFloat(item.preço.toString()));
    setIsCartOpen(true); // Abre o carrinho ao adicionar um item
  };

  const removeItemFromCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const index = prevItems.indexOf(item);
      if (index > -1) {
        prevItems.splice(index, 1);
        setTotal((prevTotal) => prevTotal - parseFloat(item.preço.toString()));
      }
      return [...prevItems];
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setTotal(0);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider value={{ cartItems, total, addItemToCart, removeItemFromCart, clearCart, isCartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextState => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};