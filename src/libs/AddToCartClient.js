"use client";
import { useCart } from "@/context/CartContext";
import AnimatedButton from "@/utils/button";

export default function AddToCartClient({ product }) {
  const { addToCart } = useCart();

  return (
    <AnimatedButton onClick={() => addToCart(product)}>
      {product.type === "workshop" ? "Book Now" : "Add to Cart"}
    </AnimatedButton>
  );
}
