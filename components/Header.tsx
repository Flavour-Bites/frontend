import Link from "next/link"
import type React from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 md:px-6 h-16 bg-white shadow-sm dark:bg-gray-950">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <CakeIcon className="h-6 w-6 text-pink-500" />
        <span className="font-semibold text-lg">Flavour Bites</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link href="#" className="hover:text-pink-500 dark:hover:text-pink-400" prefetch={false}>
          Home
        </Link>
        <Link href="#" className="hover:text-pink-500 dark:hover:text-pink-400" prefetch={false}>
          Products
        </Link>
        <Link href="#" className="hover:text-pink-500 dark:hover:text-pink-400" prefetch={false}>
          Order
        </Link>
        <Link href="#" className="hover:text-pink-500 dark:hover:text-pink-400" prefetch={false}>
          Contact
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-4">
            <Link
              href="#"
              className="font-medium hover:text-pink-500 dark:hover:text-pink-400"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="#"
              className="font-medium hover:text-pink-500 dark:hover:text-pink-400"
              prefetch={false}
            >
              Products
            </Link>
            <Link
              href="#"
              className="font-medium hover:text-pink-500 dark:hover:text-pink-400"
              prefetch={false}
            >
              Order
            </Link>
            <Link
              href="#"
              className="font-medium hover:text-pink-500 dark:hover:text-pink-400"
              prefetch={false}
            >
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

function CakeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-10a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10" />
      <path d="M12 8V3" />
      <path d="M7 12h10" />
      <path d="M7 16h10" />
    </svg>
  );
}


function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
