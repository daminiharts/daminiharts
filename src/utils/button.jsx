"use client";

import React, { useState } from "react";

const AnimatedButton = ({ children, onClick, className = "" }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    if (loading) return;
    setLoading(true);

    try {
      await onClick?.(e); // wait if async
    } finally {
      setTimeout(() => setLoading(false), 1000); // reset loading state
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`relative cursor-pointer w-30 h-10  text-center border-2 border-black  font-semibold text-black transition-all duration-500 group disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      {/* Background fill animation (hover only) */}
      <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 z-0" />

      {/* Content (loader or text) */}
      <span className={`relative z-10 flex  items-center   justify-center transition duration-300 group-hover:text-white ${loading ?("bg-black h-9"):("")} `}>
        {loading ? (
          <span className="w-4 h-4  border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </span>
    </button>
  );
};

export default AnimatedButton;
