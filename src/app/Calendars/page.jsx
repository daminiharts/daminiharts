import OfferTag from "@/Components/OfferTag";
import { fetchProductsByType } from "@/libs/fetchProducts";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";



export default async function Page() {
   const calendarsProducts = await fetchProductsByType("calendars");
  const schemaData = calendarsProducts.map((product) => ({
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
      "url": `https://www.daminiharts.com/product/${product.title}`,
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
          content="Explore Workshops paintings at Daminih Arts."
        />
        {/* ✅ Add Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <main className="min-h-screen bg-[var(--color-primary)] py-12 px-6 w-full md:px-20 text-[var(--color-text)]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[var(--color-accent)] tracking-tight">
            Calendars
          </h1>

          <div
            role="list"
            className="flex flex-wrap justify-center gap-10"
          >
            {calendarsProducts.length === 0 ? (
              <div className="w-full text-center py-12 text-gray-500 text-lg">No art for now</div>
            ) : (
              calendarsProducts.map((product) => (
                <article
                  key={product.id}
                  role="listitem"
                  className="w-full sm:w-[350px] md:w-[400px] bg-white overflow-hidden rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 relative"
                >
                  <Link href={`/product/${encodeURIComponent(product.title)}`}
                    aria-label={`View details for ${product.title}`}
                    className="cursor-pointer block relative flex flex-col h-full"
                  >
                    <div className="relative bg-gray-50 w-full h-64 md:h-80 overflow-hidden">
                      <OfferTag originalPrice={product.price} offerPrice={product.offer} />
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-grow text-center">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{product.title}</h2>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-grow">
                        {product.description}
                      </p>
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
