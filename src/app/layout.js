// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { CartProvider } from "@/context/CartContext";

import Script from "next/script";
import WhatsAppButton from "@/Components/WhatsAppButton";
import ClientProviders from "@/Components/ClientProvider";// ✅ Add this
import CookieConsent from "@/Components/CookiesConsent";


export const metadata = { /* ... existing metadata ... */ };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Existing scripts */}
       

        {/* Adobe Fonts */}
        <Script
          id="adobe-fonts"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `/* same adobe script */`,
          }}
        />

        {/* ✅ Google Analytics with Consent Mode */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PYDJTXMVSZ"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              // Default to denied until user accepts
              gtag('consent', 'default', {
                'analytics_storage': 'denied'
              });

              gtag('js', new Date());
              gtag('config', 'G-PYDJTXMVSZ');
            `,
          }}
        />

        <ClientProviders>
          <Navbar />
          {children}
          <Footer />

          {/* ✅ Consent Banner */}
          <CookieConsent />
        </ClientProviders>

        <WhatsAppButton />
      </body>
    </html>
  );
}
