// app/product/[id]/page.js
import Image from "next/image";
import { IndianRupee } from "lucide-react";
import getProductData from "@/libs/getProductData";
import AddToCartWrapper from "@/Components/AddToCartWrapper";
import ZoomableImage from "@/Components/ZoomableImage";
import ZoomableImageGallery from "@/Components/ZoomableImage";
import { WorkshopDetails } from "@/Components/WorkshopDetails";
import CalendarOffer from "@/Components/CalendarOffer";

export async function generateMetadata({
  params,
}) {
  const { title } = await params;

  const decodedTitle =
    decodeURIComponent(title);

  const product =
    await getProductData(
      decodedTitle
    );

  return {
    title: `${
      product?.title || "Product"
    } | Daminih Arts`,
    description:
      product?.description ||
      "Explore handmade art at Daminih Arts.",
    openGraph: {
      images: product?.images?.[0],
    },
  };
}

export default async function ProductPage({
  params,
}) {
  const { title } = await params;

  const decodedTitle =
    decodeURIComponent(title);

  const product =
    await getProductData(
      decodedTitle
    );

  if (!product) {
    return (
      <main className="text-center py-20">
        Product not found
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-12 px-4 md:px-20" role="main">
      <section className="grid md:grid-cols-2 gap-8" aria-labelledby="product-title">
        {/* Product Image */}
    <ZoomableImageGallery
  images={product.images}
  altPrefix={product.title}
/>

        {/* Product Details */}
        <article className="space-y-4" role="region" aria-labelledby="product-title">
      {product.type !== "workshop" && (
  <>
    <h1 id="product-title" className="text-2xl md:text-3xl text-gray-700">
      {product.title}
    </h1>

    <p className="text-gray-700" aria-label="Product description">
      {product.description}
    </p>
  </>
)}

          {/* Workshop Details */}
          {product.type?.toLowerCase() === "workshop" && (
            <div className="text-sm md:text-base text-gray-600 space-y-2" role="group" aria-labelledby="workshop-details">
              
             {product.type?.toLowerCase() === "workshop" && (
  <WorkshopDetails title={product.title} />
)}
            </div>
          )}

          {/* Price Info */}
          <div className="flex items-center gap-2" aria-label="Product price" role="contentinfo">
            {product.offer ? (
              <>
                <p className="line-through text-red-500 flex items-center" aria-label={`Original price ₹${product.price}`}>
                  <IndianRupee className="w-5 h-5" aria-hidden="true" />
                  <span aria-hidden="true">{product.price}</span>
                </p>
                <p className="font-bold text-lg text-green-500 flex items-center" aria-label={`Discounted price ₹${product.offer}`}>
                  <IndianRupee className="w-5 h-5 text-green-500" aria-hidden="true" />
                  <span aria-hidden="true">{product.offer}</span>
                </p>
              </>
            ) : (
              <p className="font-bold text-lg flex items-center" aria-label={`Price ₹${product.price}`}>
                <IndianRupee className="w-5 h-5" aria-hidden="true" />
                <span aria-hidden="true">{product.price}</span>
              </p>
            )}
          </div>

          {/* Add to Cart Button */}
          <AddToCartWrapper product={product} />
          <CalendarOffer/>
        </article>
      </section>
    </main>
  );
}
