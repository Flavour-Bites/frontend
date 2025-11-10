import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Inter } from "next/font/google";
import "./globals.css"; // Import global styles

const inter = Inter({ subsets: ["latin"] });

export default function NotFound() {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
          <div className="relative h-32 w-32">
            <Image src="/cake.png" alt="Flavour Bites" fill className="object-contain" priority />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-rose-900 sm:text-4xl">
            Page not found
          </h1>
          <p className="max-w-prose text-muted-foreground">
            The page you are looking for doesn&rsquo;t exist or has been moved.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-rose-600 hover:bg-rose-700">
              <Link href="/">Go home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">Browse products</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/order">Place an order</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}