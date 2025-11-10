import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import ClientOnly from "@/components/ClientOnly";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Flavour Bites | Homemade Bakery - Fresh Cakes, Cookies & Pastries",
    template: "%s | Flavour Bites Bakery"
  },
  description: "Artisanal homemade bakery specializing in fresh cakes, cookies, and pastries. Order delicious baked goods made with love and the finest ingredients. Free delivery available.",
  keywords: ["bakery", "homemade cakes", "fresh cookies", "pastries", "baked goods", "birthday cakes", "custom cakes", "Addis Ababa bakery"],
  authors: [{ name: "Flavour Bites" }],
  creator: "Flavour Bites",
  publisher: "Flavour Bites",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://flavourbites.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flavourbites.com',
    title: 'Flavour Bites | Homemade Bakery - Fresh Cakes, Cookies & Pastries',
    description: 'Artisanal homemade bakery specializing in fresh cakes, cookies, and pastries. Order delicious baked goods made with love.',
    siteName: 'Flavour Bites',
    images: [
      {
        url: '/background_image.jpg',
        width: 1200,
        height: 630,
        alt: 'Flavour Bites Homemade Bakery - Fresh Baked Goods',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flavour Bites | Homemade Bakery',
    description: 'Fresh homemade cakes, cookies, and pastries made with love.',
    images: ['/background_image.jpg'],
    creator: '@flavourbites',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col bg-linear-to-b from-rose-50/60 via-amber-50/40 to-white dark:from-background dark:via-background dark:to-background">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
        <ClientOnly>
          <Toaster
            position="top-center"
            toastOptions={{
              // Define default options
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              // Apply responsive styles
              error: {
                style: {
                  background: '#e53e3e',
                },
              },
              // Smaller toasts on mobile
              ...(typeof window !== 'undefined' && window.innerWidth < 768 && {
                style: {
                  fontSize: '12px',
                  padding: '8px 12px',
                },
              }),
            }}
          />
        </ClientOnly>
      </body>
    </html>
  );
}
