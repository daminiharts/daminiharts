"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const AddToCartClient = dynamic(() => import("@/libs/AddToCartClient"), {
  loading: () => <p>Loading cart button...</p>,
});

export default function AddToCartWrapper({ product }) {
  return (
   <section role="region" aria-label="Purchase section">
  <Suspense fallback={<p>Loading cart...</p>}>
    <AddToCartClient product={product} />
  </Suspense>
</section>
  );
}