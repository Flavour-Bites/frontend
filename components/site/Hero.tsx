import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft pastel blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-rose-200/60 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-amber-200/60 blur-3xl" />
      </div>

      <div className="container mx-auto grid items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-6">
          <span className="inline-block rounded-full border bg-white/60 px-3 py-1 text-xs font-medium text-rose-700 shadow-sm">
            Freshly baked daily
          </span>
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-rose-900 sm:text-5xl">
            Delicious Homemade Treats, Just for You
          </h1>
          <p className="max-w-prose text-pretty text-muted-foreground">
            From classic cakes to buttery pastries, Flavour Bites creates sweet moments
            with warm flavors and quality ingredients.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-rose-600 hover:bg-rose-700 shadow-sm hover:shadow-md transition-all">
              <Link href="/order">Order Now</Link>
            </Button>
            <Button asChild variant="outline" className="backdrop-blur">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-80 max-w-full rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 shadow-sm md:w-[28rem]">
          <Image
            src="/cake.png"
            alt="Fresh cake from Flavour Bites"
            fill
            className="object-contain p-8 md:p-12 animate__animated animate__fadeInUp"
            sizes="(max-width: 768px) 80vw, 40vw"
            priority
          />
          <div className="pointer-events-none absolute inset-x-6 bottom-6 rounded-xl bg-white/60 p-3 text-center text-sm text-rose-800 shadow backdrop-blur">
            Handcrafted with love in Dessert Town
          </div>
        </div>
      </div>
    </section>
  )
}
