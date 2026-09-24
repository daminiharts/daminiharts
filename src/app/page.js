import dynamic from 'next/dynamic';
import Head from 'next/head';


const Banner = dynamic(() => import('@/Components/Banner'));
const ProductSection = dynamic(() => import('@/Components/ProductSection'));
export default function HomePage() {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return (
    <>
     <Head>
  <title>Daminih Arts | Handmade Paintings, Workshops & Calendars</title>
  <meta
    name="description"
    content={`Discover handmade paintings, creative workshops, and ${nextYear} art calendars at Daminih Arts.`}
  />

  {/* Open Graph */}
  <meta property="og:title" content="Daminih Arts" />
  <meta
    property="og:description"
    content={`Shop handmade paintings, attend workshops, and explore ${nextYear} calendars.`}
  />
  <meta property="og:image" content="https://www.daminiharts.com/banner2.jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://www.daminiharts.com" />
  <meta property="og:type" content="website" />
  <meta name="robots" content="index, follow" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Daminih Arts" />
  <meta
    name="twitter:description"
    content={`Shop handmade paintings, attend workshops, and explore ${nextYear} calendars.`}
  />
  <meta name="twitter:image" content="https://www.daminiharts.com/banner2.jpeg" />

  {/* Canonical */}
  <link rel="canonical" href="https://www.daminiharts.com" />
</Head>


      <main className="min-h-screen bg-[var(--color-primary)] text-[var(--color-text)] flex flex-col">
        <h1 className="sr-only">Daminih Arts - Handmade Paintings & Workshops</h1>
        <Banner />
        <div className="flex-grow pb-16">
          <ProductSection />
        </div>
      </main>
    </>
  );
}
