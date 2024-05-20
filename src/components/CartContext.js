// components/CartContext.js
'use client'

import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItemToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setTotal((prevTotal) => prevTotal + parseFloat(item.preço));
    setIsCartOpen(true); // Abre o carrinho ao adicionar um item
  };

  const removeItemFromCart = (item) => {
    setCartItems((prevItems) => {
      const index = prevItems.indexOf(item);
      if (index > -1) {
        prevItems.splice(index, 1);
        setTotal((prevTotal) => prevTotal - parseFloat(item.preço));
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

export const useCart = () => useContext(CartContext);
