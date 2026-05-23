"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CalendarOffer from "@/Components/CalendarOffer";

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem, total,         // discounted total
    originalTotal } = useCart();
    const [loading, setLoading] = useState(false);
     const router = useRouter();

 const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen py-20 px-4 md:px-20 font-orangegummy tracking-[1px] text-center">
        <h1 className="text-3xl text-black mb-4">Your Cart</h1>
        <p className="text-lg text-gray-600">Your cart is empty!</p>
      </main>
    );
  }
    const handleClick = () => {
    setLoading(true);
    // simulate delay if needed
    router.push("/checkout");
  };

  return (
    <main className="min-h-screen py-12 px-4 md:px-20 font-orangegummy tracking-[1px]">
      <h1 className="text-3xl text-black text-center mb-10">My Cart</h1>

      <p className="text-sm text-right text-black mb-4">
        Total Items: <span className="font-semibold">{totalItems}</span>
      </p>

     <section className="flex flex-col lg:flex-row gap-8">
  {/* Cart Items */}
  <div className="flex-1 space-y-6">
    {cartItems.map((item) => {
      const itemTotal =
        (item.offer && item.offer !== "" ? Number(item.offer) : Number(item.price)) *
        (item.quantity || 1);

      return (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row items-center sm:items-start border-b-1 border-gray-300  p-2 gap-4 bg-white"
        >
          <div className="w-full sm:w-[100px] sm:h-[100px]">
            <Image
              src={item.images[0]}
              alt={item.title}
              width={100}
              height={100}
              className="rounded-xl object-contain w-full h-full"
              sizes="(max-width: 640px) 100vw, 100px"
              quality={75}
            />
          </div>

          <div className="flex-1 w-full space-y-1">
            <h2 className="text-sm text-black font-medium">{item.title}</h2>

            {item.offer ? (
              <div className="flex items-center gap-2 text-sm">
                <span className="line-through text-red-500">₹{item.price}</span>
                <span className="text-black font-semibold">₹{item.offer} each</span>
              </div>
            ) : (
              <p className="text-xs text-gray-600">₹{item.price} each</p>
            )}

            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                disabled={item.quantity <= 1}
                className={`w-8 h-8 rounded  text-white transition ${
                  item.quantity <= 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800 cursor-pointer "
                }`}
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span className="px-2 text-black">{item.quantity}</span>

              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="w-8 h-8 cursor-pointer bg-black text-white rounded hover:bg-gray-800"
                aria-label="Increase quantity"
              >
                +
              </button>

              <button
                onClick={() => removeItem(item.id)}
                className="ml-2 cursor-pointer text-md hover:underline"
                aria-label="Remove item"
              >
               <div className="w-8 h-8 relative bg-white rounded-full flex items-center justify-center">
      <Image
        src={"/trash.png"}
        alt="Shopping Cart"
        fill
        sizes="32px"
        className="object-contain"
      />
    </div>
              </button>
            </div>
          </div>

          <div className="text-right text-black w-full sm:w-auto font-semibold">
            ₹{itemTotal}
          </div>
        </div>
      );
    })}
    <CalendarOffer/>
  </div>

  {/* Summary Panel */}
  <div className="w-full lg:w-[300px]  p-4 bg-gray-200 rounded-xl h-fit space-y-4">
    <h2 className="text-xl  text-black text-center">Order Summary</h2>
    <div className="flex justify-between border-b p-1 border-gray-300 text-sm">
      <span>Subtotal (Original)</span>
      <span className="line-through text-red-500">₹{originalTotal}</span>
    </div>
    <div className="flex justify-between border-b p-1 border-gray-300 text-base font-semibold text-green-600">
      <span>Subtotal (Discounted)</span>
      <span>₹{total}</span>
    </div>
    

     <div
      onClick={handleClick}
      className="relative inline-block text-white text-center w-full p-2 group mt-4 cursor-pointer"
    >
      <span className="absolute inset-0 w-full h-full transition-transform duration-300 transform scale-105 bg-black rounded-lg group-hover:scale-100 group-hover:bg-white group-hover:border group-hover:border-black"></span>
      <span className="relative px-6 py-1 flex items-center justify-center text-white group-hover:text-black font-medium transition-colors duration-300 gap-2">
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin group-hover:border-black group-hover:border-t-transparent"></span>
            Loading...
          </>
        ) : (
          "Proceed to Checkout"
        )}
      </span>
    </div>
<div className="flex items-center justify-center gap-2 text-gray-500">
  <div className="w-8 h-8 relative  rounded-full flex items-center justify-center">
      <Image
        src={"/lock.png"}
        alt="Shopping Cart"
        fill
        sizes="32px"
        className="object-contain"
      />
    </div>
  Secure Checkout
</div>
 

  </div>
</section>

    </main>
  );
};

export default CartPage;
