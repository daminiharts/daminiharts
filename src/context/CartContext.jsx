"use client";

import { toast } from "@/utils/toast";
import { createContext, useContext, useState, useEffect } from "react";


const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("daminih-cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("daminih-cart", JSON.stringify(cartItems));
  }, [cartItems]);

const addToCart = (product) => {
  const priceNumber = Number(product.price.toString().replace(/[^\d]/g, ""));
  const offerNumber = product.offer
    ? Number(product.offer.toString().replace(/[^\d]/g, ""))
    : null;

  let updated = false;

  setCartItems((prev) => {
    const exists = prev.find((item) => item.id === product.id);
    updated = !!exists;

    if (exists) {
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [
      ...prev,
      {
        ...product,
        quantity: 1,
       originalPrice: priceNumber,
discountedPrice: offerNumber,// discounted price (if any)
      },
    ];
  });

  setTimeout(() => {
    toast.show(updated ? "Quantity updated in cart!" : "Added to cart!", "success");
  }, 0);
};

  const clearCart = () => {
  setCartItems([]);
  localStorage.removeItem("daminih-cart");
};

  const updateQuantity = (id, delta) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    )
  );

  // Safely show toast after state update (only once)
  
  setTimeout(() => {
    toast.show("Quantity updated!", "default");
  }, 0);
};


  const removeItem = (id) => {
  setCartItems((prev) => prev.filter((item) => item.id !== id));

  // Trigger toast outside render cycle
  setTimeout(() => {
    toast.show("Item removed from cart.", "error");
  }, 0);
};

const total = (() => {
  let calendarCount = 0;
  let calendarTotal = 0;
  let otherTotal = 0;

  cartItems.forEach((item) => {
    const raw = item.discountedPrice ?? item.originalPrice;
    const price =
      typeof raw === "string" ? Number(raw.replace(/[^\d.]/g, "")) : Number(raw);

    const lineTotal = price * (item.quantity || 1);

    if (item.type && item.type.toLowerCase() === "calendar") {
      calendarCount += item.quantity || 0;
      calendarTotal += lineTotal;
    } else {
      otherTotal += lineTotal;
    }
  });

  let finalTotal = calendarTotal + otherTotal;

  // ✅ Apply 10% discount only if more than 1 calendar
  if (calendarCount > 1) {
    console.log("Applying 10% discount on calendars");
    const discount = calendarTotal * 0.1; // 10% off calendars
    finalTotal = calendarTotal - discount + otherTotal;
  }

  return finalTotal;
})();


const originalTotal = cartItems.reduce((sum, item) => {
  const numericPrice = Number(
    typeof item.price === "string" ? item.price.replace(/[^\d.]/g, "") : item.price
  );
  const safePrice = isNaN(numericPrice) ? 0 : numericPrice;

  return sum + safePrice * (item.quantity || 1);
}, 0);
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem,   total,         // discounted total
    originalTotal,clearCart}}
    >
      {children}
    </CartContext.Provider>
  );
};
