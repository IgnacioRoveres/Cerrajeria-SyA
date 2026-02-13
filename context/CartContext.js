"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // 1. Cargar carrito guardado al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("syf_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // 2. Guardar cada vez que cambia
  useEffect(() => {
    localStorage.setItem("syf_cart", JSON.stringify(cart));
  }, [cart]);

  // Funciones: Agregar, Borrar, Limpiar
  const addToCart = (product) => {
    setCart((prev) => {
      // Si ya existe, sumamos cantidad
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Si es nuevo, lo agregamos con cantidad 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCart([]);

  // Calcular total de items (para el numerito del navbar)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calcular precio total
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);