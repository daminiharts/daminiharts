import OfferTag from "@/Components/OfferTag";
import { fetchProductsByType } from "@/libs/fetchProducts";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";



export default async function Page() {
   const paintingProducts = await fetchProductsByType("painting");
  const schemaData = paintingProducts.map((product) => ({
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": product.images[0],
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Daminih Arts"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.daminiharts.com/product/${product.id}`,
      "priceCurrency": "INR",
      "price": product.price.toString(),
      "availability": "https://schema.org/InStock"
    }
  }));
  return (
    <>
       <Head>
        <title>Daminih Arts | Paintings</title>
        <meta
          name="description"
          content="Explore handmade paintings at Daminih Arts."
        />
        {/* ✅ Add Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <main className=" p-1 md:py-12 md:px-6  w-full md:px-20">
        <div className="max-w-4xl h-full   mx-auto">
          <h1 className="text-2xl md:text-3xl text-gray-900 text-center mb-8">Paintings</h1>

         <div
  role="list"
  className="grid gap-4 grid-cols-2 lg:grid-cols-3 group"
>
            {paintingProducts.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500 text-lg">No art for now</div>
            ) : (
              paintingProducts.map((product) => (
                <article
              key={product.id}
  role="listitem"
  className="overflow-hidden rounded shadow-md border-gray-200 rounded border-2 hover:shadow-lg transition bg-white relative 
             transform duration-300 ease-in-out 
             group-hover:scale-95 hover:scale-105 z-10"
                >
                 <Link href={`/product/${encodeURIComponent(product.title)}`}
  aria-label={`View details for ${product.title}`}
  className="cursor-pointer block relative "
>
                  <div className="relative bg-white w-full h-48 md:h-64">
  {/* Skeleton placeholder */}
  
<OfferTag originalPrice={product.price} offerPrice={product.offer} />
  {/* Image */}
  <Image
    src={product.images[0]}
    alt={product.title}
    width={500}
    height={500}
    loading="lazy"
    sizes="(max-width: 768px) 100vw, 33vw"
    className="w-full h-full object-contain bg-white relative z-10"
   // your low-res blurred image
  />
</div>
                    <div className="p-1 md:py-4 md:px-2 space-y-1 text-center">
                      <h2 className="text-xs text-black">{product.title}</h2>
                      <p className="text-gray-600 text-xs text-start">{product.description}</p>
                    </div>
                  </Link>
                </article>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
