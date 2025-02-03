import React, { createContext, useContext, useState, useEffect } from "react";
import { Cart } from "../types/Producto";

// Definimos el tipo del contexto
interface CartContextType {
  cart: Cart;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

// Creamos el contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Proveedor del contexto
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado inicial del carrito
  const [cart, setCart] = useState<Cart>({ items: [] });

  // Cargar el carrito desde localStorage al inicializar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    console.log("Cargando carrito desde localStorage:", storedCart);

    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        console.log("Carrito parseado:", parsedCart);

        if (Array.isArray(parsedCart.items)) {
          setCart(parsedCart); // Solo establecer el estado si los datos son válidos
        } else {
          console.error("Datos del carrito inválidos en localStorage:", parsedCart);
          setCart({ items: [] }); // Reiniciar el carrito si hay un error
        }
      } catch (error) {
        console.error("Error al cargar el carrito desde localStorage:", error);
        setCart({ items: [] }); // Reiniciar el carrito si hay un error
      }
    }
  }, []);

  // Guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    console.log("Guardando carrito en localStorage:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar un producto al carrito
  const addToCart = (productId: string) => {
    const existingItem = cart.items.find((item) => item.productId === productId);

    if (existingItem) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        ),
      }));
    } else {
      // Si no está en el carrito, agregarlo
      setCart((prevCart) => ({
        ...prevCart,
        items: [...prevCart.items, { productId, quantity: 1 }],
      }));
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.productId !== productId),
    }));
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCart({ items: [] });
  };

  // Proveer el contexto
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};