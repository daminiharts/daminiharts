"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function OfferTag({ originalPrice, offerPrice }) {
  const [animationParams, setAnimationParams] = useState(null);

  useEffect(() => {
    const delay = Math.random() * 2;
    const range = Math.floor(Math.random() * 10) + 5;
    const duration = Math.random() * 2 + 1.5;

    setAnimationParams({ delay, range, duration });
  }, []);

  if (!offerPrice || offerPrice >= originalPrice || !animationParams) return null;

  const discount = Math.round(((originalPrice - offerPrice) / originalPrice) * 100);
  const { delay, range, duration } = animationParams;

  return (
    <div className="absolute top-2 left-2 z-30 flex flex-col items-center pointer-events-none">
      {/* Thread */}
      <div className="w-0.5 h-3 bg-gray-800" />

      {/* Painted offer tag */}
      <motion.div
        initial={{ rotate: -range }}
        animate={{ rotate: [-range, range, -range] }}
        transition={{
          repeat: Infinity,
          duration,
          ease: "easeInOut",
          delay,
        }}
        className="relative px-3 py-1 text-white text-[8px] md:text-xs shadow-lg"
        style={{
          background:
            "url('https://www.transparenttextures.com/patterns/brush.png'), linear-gradient(135deg, #dc2626, #f87171)",
          backgroundSize: "cover",
          clipPath: "polygon(5% 10%, 95% 0%, 100% 90%, 0% 100%)",
         
        }}
      >
        {discount}% OFF
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full border shadow-sm" />
      </motion.div>
    </div>
  );
}
