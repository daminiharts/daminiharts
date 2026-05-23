'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AnimatedButton = dynamic(() => import('@/utils/button'), {
  ssr: false,
  loading: () => <button className="opacity-50">Loading...</button>,
});

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.2, duration: 0.5 },
  }),
};

// ✅ LCP-friendly SwappingImage
function SwappingImage({ images, alt }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 2000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          width={500}
          height={500}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
          priority={i === 0} // Preload first image for LCP
          fetchPriority={i === 0 ? 'high' : 'auto'}
          className={`w-full h-full object-cover rounded-2xl shadow-lg transition-opacity duration-700 ${
            i === index ? 'opacity-100 relative' : 'opacity-0 absolute top-0 left-0'
          }`}
        />
      ))}
    </div>
  );
}

export default function ProductSection() {
  const products = useMemo(
    () => [
      {
        name: 'Paintings',
        slug: 'Paintings',
        description: 'A collection of original artwork for your space.',
        image: '/homeimages/paintings.jpeg',
      },
      {
        name: 'Painting Workshop',
        slug: 'Workshops',
        description: 'Learn how to paint your own world.',
        image: '/homeimages/workshop.jpeg',
      },
      {
        name: 'Calendars',
        slug: 'Calendars',
        description:
          'Two themes for 2026 Bollywood Villain and Animal to add a unique vibe to your year.',
        images: ['/homeimages/calender2.jpg', '/homeimages/calender1.jpeg'],
      },
    ],
    []
  );

  return (
    <section className="px-4 py-12" aria-labelledby="featured-products-heading">
      <div className="max-w-6xl mx-auto space-y-16">
        <h2 id="featured-products-heading" className="sr-only">
          Featured Products
        </h2>

        {products.map((product, i) => (
          <motion.article
            key={product.slug}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideUp}
            className={`flex flex-col md:flex-row ${
              i % 2 !== 0 ? 'md:flex-row-reverse' : ''
            } md:items-center items-stretch gap-6 md:gap-10`}
          >
            {/* Image Block */}
            <div className="relative w-full h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] overflow-hidden rounded-2xl">
              <Link href={`/${product.slug}`} aria-label={`Go to ${product.name} page`} className="block h-full">
                <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
                {product.images ? (
                  <SwappingImage
                    images={product.images}
                    alt={`${product.name} collection - Daminih Arts`}
                  />
                ) : (
                  <Image
                    src={product.image}
                    alt={`${product.name} collection - Daminih Arts`}
                    width={500}
                    height={500}
                    priority={i === 0} // LCP optimization
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                )}
              </Link>
            </div>

            {/* Text Block */}
            <div className="relative w-full md:flex-1 space-y-4 text-center flex items-center justify-center">
              <div className="p-4 space-y-2">
                <h3 className="text-lg md:text-2xl font-bold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <Link href={`/${product.slug}`} aria-label={`View more about ${product.name}`}>
                  <AnimatedButton>See More</AnimatedButton>
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
