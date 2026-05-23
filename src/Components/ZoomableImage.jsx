'use client';

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
export default function ZoomableImageGallery({ images = [], altPrefix = "Product" }) {
  const [zoomed, setZoomed] = useState(false);

  const [selectedImage, setSelectedImage] = useState(images[0]);
  return (
    <>
      {/* ✅ Small image with shared layoutId */}
        <div className="space-y-2">
           <motion.div
        layoutId="zoom-image"
        onClick={() => setZoomed(true)}
        className="relative sm:w-[90vw] md:w-full h-[350px] cursor-zoom-in bg-white rounded overflow-hidden"
      >
        <Image
          src={selectedImage}
          alt={`${altPrefix} main image`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </motion.div>
       <div className="flex gap-2 w-[90vw] md:w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setSelectedImage(img)}
            className={`shrink-0 w-15 h-15 rounded overflow-hidden border-2 cursor-pointer ${
              selectedImage === img ? "border-blue-500" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt={`${altPrefix} thumbnail ${i}`}
              width={80}
              height={80}
             loading="lazy"
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
        </div>

      {/* ✅ Fullscreen zoomed image */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 overflow-auto z-50 flex items-center justify-center"
            onClick={() => setZoomed(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId="zoom-image"
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[95vw] max-h-[90vh] w-auto h-auto"
            >
              
               <Image
                src={selectedImage}
                alt={`${altPrefix} zoomed`}
                width={1200}
                height={1000}
                className="object-contain"
                priority
              />
              <button
                onClick={() => setZoomed(false)}
                className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded-full"
                aria-label="Close zoom"
              >
                <X className="w-6 h-6 cursor-pointer " />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
