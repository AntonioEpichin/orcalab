'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface CartItem {
  nome: string;
  id: string;
  preço: number;
}

interface CartContextState {
  cartItems: CartItem[];
  total: number;
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (item: CartItem) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextState | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    const storedTotal = localStorage.getItem('total');
    if (storedCartItems && storedTotal) {
      setCartItems(JSON.parse(storedCartItems));
      setTotal(parseFloat(storedTotal));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('total', total.toString());
  }, [cartItems, total]);

  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems;
      } else {
        return [...prevItems, item];
      }
    });
    setTotal((prevTotal) => prevTotal + item.preço);
    setIsCartOpen(true);
  };

  const removeItemFromCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(cartItem => cartItem.id !== item.id);
      return updatedItems;
    });
    setTotal((prevTotal) => prevTotal - item.preço);
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
