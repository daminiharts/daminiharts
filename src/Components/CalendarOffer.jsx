"use client";
import React from "react";
import { useCart } from "@/context/CartContext";

const CalendarOffer = () => {
  const { cartItems, total ,originalTotal} = useCart();
  console.log("Cart Items in CalendarOffer:", cartItems);

  // Count calendars
  const calendarItems = cartItems.filter(
    (item) => item.type?.toLowerCase() === "calendar"
  );
  const calendarCount = calendarItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  // Calculate numeric calendar total safely
  const calendarTotal = calendarItems.reduce((sum, item) => {
    const raw = item.discountedPrice ?? item.originalPrice;
    const price =
      typeof raw === "string"
        ? Number(raw.replace(/[^\d.]/g, ""))
        : Number(raw);
    return sum + price * (item.quantity || 1);
  }, 0);

  // Apply offer only if more than 1 calendar
  const discountRate = 0.1;
  const discount = calendarCount > 1 ? calendarTotal * discountRate : 0;
  const finalTotal = total - discount;

  return (
    <div className="p-4 rounded-2xl shadow-md bg-green-50 mt-4">
      {calendarCount > 1 ? (
        <>
          <p className="text-lg font-semibold text-green-700">
            🎉 Special Offer Applied!
          </p>
          <p className="text-sm text-gray-600">
            You saved <span className="font-bold">₹{discount.toFixed(2)}</span> on calendars.
          </p>
          <p className="mt-2 text-lg">
            Final Total: <span className="font-bold">₹{total.toFixed(2)}</span>
          </p>
          <p className="text-sm line-through text-gray-500">
            Original: ₹{originalTotal.toFixed(2)}
          </p>
        </>
      ) : (
        <p className="text-gray-600">
          Add more than 1 calendar to unlock a discount 🎁
        </p>
      )}
    </div>
  );
};

export default CalendarOffer;
