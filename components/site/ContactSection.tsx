import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-16 left-8 h-40 w-40 rounded-full bg-rose-100 blur-3xl" />
        <div className="absolute -bottom-16 right-8 h-40 w-40 rounded-full bg-amber-100 blur-3xl" />
      </div>

      <div className="container mx-auto grid gap-8 rounded-2xl border bg-white/70 px-4 py-10 shadow-sm backdrop-blur-sm sm:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-rose-900">Get in touch</h2>
          <p className="text-muted-foreground">
            Questions or custom orders? We&#39;re happy to help.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 text-rose-800">
              <MapPin className="size-4" />
              <span>123 Sweet Street, Dessert Town</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-rose-700" />
              <Link href="tel:+254700000000" className="hover:underline">
                +254 700 000 000
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-rose-700" />
              <Link href="mailto:hello@flavourbites.com" className="hover:underline">
                hello@flavourbites.com
              </Link>
            </li>
          </ul>
          <div className="pt-2">
            <Button asChild className="bg-rose-600 hover:bg-rose-700 shadow-sm hover:shadow-md transition-all">
              <Link href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <MessageSquare className="size-4" />
                WhatsApp Us
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-base font-semibold">Quick message</h3>
          {/* Frontend-only form (no backend submission) */}
          <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              className="border-input h-10 w-full rounded-md border bg-white/70 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              placeholder="Your name"
              aria-label="Your name"
            />
            <input
              className="border-input h-10 w-full rounded-md border bg-white/70 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              placeholder="Email or phone"
              aria-label="Email or phone"
            />
            <textarea
              className="border-input min-h-28 w-full rounded-md border bg-white/70 px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              placeholder="How can we help?"
              aria-label="Message"
            />
            <Button type="submit" className="bg-rose-500 hover:bg-rose-600">Send</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
