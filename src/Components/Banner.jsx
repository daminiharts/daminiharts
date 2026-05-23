'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    position: 'absolute',
  }),
  center: {
    x: 0,
    opacity: 1,
    position: 'absolute',
    transition: { duration: 0.6 },
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    position: 'absolute',
    transition: { duration: 0.5 },
  }),
};

const Banner = () => {
  const images = [
    '/banner/banner1.jpeg',
    '/banner/banner2.jpeg',
    '/banner/banner3.jpeg',
    '/banner/banner4.jpeg',
    '/banner/banner5.jpeg',
    '/banner/banner6.jpeg',
  ];

  const [[index, direction], setIndex] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = (newDirection) => {
    setIndex(([prevIndex]) => [
      (prevIndex + newDirection + images.length) % images.length,
      newDirection,
    ]);
  };

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => paginate(1), 3000); // slightly slower for UX
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="relative w-full aspect-[12/5] overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-live="polite"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={images[index]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={(e, { offset }) => {
            if (offset.x < -50) paginate(1);
            if (offset.x > 50) paginate(-1);
          }}
          className="w-full h-full"
        >
          <Image
            src={images[index]}
            alt={`Banner ${index + 1}`}
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover pointer-events-none select-none"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 p-2 bg-white/70 hover:bg-white rounded-full transition"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 text-black" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 p-2 bg-white/70 hover:bg-white rounded-full transition"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 text-black" />
      </button>
    </div>
  );
};

export default Banner;
