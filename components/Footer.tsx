import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
      <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
        <div className="grid gap-1">
          <h3 className="font-semibold">Company</h3>
          <Link href="#" prefetch={false}>
            About Us
          </Link>
          <Link href="#" prefetch={false}>
            Our Team
          </Link>
          <Link href="#" prefetch={false}>
            Careers
          </Link>
          <Link href="#" prefetch={false}>
            Blog
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Products</h3>
          <Link href="#" prefetch={false}>
            Cakes
          </Link>
          <Link href="#" prefetch={false}>
            Cookies
          </Link>
          <Link href="#" prefetch={false}>
            Pastries
          </Link>
          <Link href="#" prefetch={false}>
            Custom Orders
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Legal</h3>
          <Link href="#" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" prefetch={false}>
            Refund Policy
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Contact</h3>
          <Link href="#" prefetch={false}>
            Support
          </Link>
          <Link href="#" prefetch={false}>
            Sales
          </Link>
          <Link href="#" prefetch={false}>
            Press
          </Link>
          <Link href="#" prefetch={false}>
            Partnerships
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Social</h3>
          <Link href="#" prefetch={false}>
            Facebook
          </Link>
          <Link href="#" prefetch={false}>
            Twitter
          </Link>
          <Link href="#" prefetch={false}>
            Instagram
          </Link>
          <Link href="#" prefetch={false}>
            LinkedIn
          </Link>
        </div>
      </div>
      <div className="container max-w-7xl mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
        © 2023 Flavour Bites. All rights reserved.
      </div>
    </footer>
  )
}