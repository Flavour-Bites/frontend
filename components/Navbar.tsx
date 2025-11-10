'use client';

import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Cart from "@/components/Cart"
import { useAuth } from "@/context/AuthContext"

export default function Navbar() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  return (
    <header className="flex items-center justify-between px-4 md:px-6 h-16 bg-white shadow-sm dark:bg-gray-950 sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image
          src="/cake.png"
          alt="Flavour Bites Logo"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-semibold text-lg">Flavour Bites</span>
      </Link>
      
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-pink-500 dark:hover:text-pink-400" prefetch={false}>
          Home
        </Link>
        <Link href="/products" className="hover:text-pink-500 dark:hover:text-pink-400" prefetch={false}>
          Products
        </Link>
        {isAuthenticated && (
          <Link href="/orders" className="hover:text-pink-500 dark:hover:text-pink-400" prefetch={false}>
            My Orders
          </Link>
        )}
        <Link href="/about" className="hover:text-pink-500 dark:hover:text-pink-400" prefetch={false}>
          About Us
        </Link>
        <Link href="/contact" className="hover:text-pink-500 dark:hover:text-pink-400" prefetch={false}>
          Contact
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Cart />
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : isAuthenticated && user ? (
          <div className="lg:flex hidden items-center gap-2">
            <span className="text-sm font-medium">Hello, {user.full_name}</span>
            <Button onClick={logout} size="sm" variant="outline">
              Logout
            </Button>
          </div>
        ) : (
          <div className="lg:flex hidden gap-2">
            <Button asChild size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        )}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              {isAuthenticated && user && (
                <div className="pb-4 border-b">
                  <p className="text-sm font-medium">Hello, {user.full_name}</p>
                  <p className="text-xs text-gray-500">{user.phone_number}</p>
                </div>
              )}
              <Link
                href="/"
                className="font-medium hover:text-pink-500 dark:hover:text-pink-400"
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="font-medium hover:text-pink-500 dark:hover:text-pink-400"
                prefetch={false}
              >
                Products
              </Link>
              {isAuthenticated && (
                <Link
                  href="/orders"
                  className="font-medium hover:text-pink-500 dark:hover:text-pink-400"
                  prefetch={false}
                >
                  My Orders
                </Link>
              )}
              <Link
                href="/about"
                className="font-medium hover:text-pink-500 dark:hover:text-pink-400"
                prefetch={false}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="font-medium hover:text-pink-500 dark:hover:text-pink-400"
                prefetch={false}
              >
                Contact
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="font-medium hover:text-pink-500 dark:hover:text-pink-400 text-left"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-medium hover:text-pink-500 dark:hover:text-pink-400"
                    prefetch={false}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="font-medium hover:text-pink-500 dark:hover:text-pink-400"
                    prefetch={false}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function MenuIcon(props: any) {
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
