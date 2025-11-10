import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import StructuredData from "@/components/StructuredData";
import { Product } from "@/types/product";
import { productsAPI } from "@/lib/api";

export default async function Home() {

  // Try to fetch featured products from backend; fall back to local static data
  let featuredProducts: Product[] = [];
  try {
    const res = await productsAPI.getAll();
    if (res.data) {
      featuredProducts = (res.data || []).map((product) => ({
        ...product,
        id: String(product.id),
        price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
        image: product.image || "/cake.png",
      })).slice(0, 6);
    }
  } catch (err) {
    console.error('Failed to load featured products via productsAPI', err);
  }

  const testimonials = [
    {
      name: "Sarah L.",
      avatar: "SL",
      text: "The Chocolate Fudge Cake was absolutely divine! It was the highlight of our celebration.",
    },
    {
      name: "Mike D.",
      avatar: "MD",
      text: "Best cookies in town, hands down. The Chocolate Chip Cookies are a must-try!",
    },
    {
      name: "Jessica P.",
      avatar: "JP",
      text: "I ordered the Strawberry Shortcake for a birthday and everyone loved it. So fresh and delicious!",
    },
  ];

  const faqs = [
    {
      question: "What makes Flavour Bites special?",
      answer: "We use only the finest ingredients and bake everything fresh daily.",
    },
    {
      question: "Do you offer custom orders?",
      answer: "Yes, we love creating custom cakes and treats for special occasions. Contact us to discuss your needs.",
    },
    {
      question: "Are your products gluten-free?",
      answer: "We offer a selection of gluten-free options. Please check our products page or ask our staff for details.",
    },
    {
      question: "How far in advance should I place an order?",
      answer: "For best results, we recommend ordering at least 48 hours in advance, especially for custom designs.",
    },
    {
      question: "Do you deliver?",
      answer: "Yes, we offer delivery within a 20-mile radius. Additional fees may apply.",
    },
    {
      question: "What are your operating hours?",
      answer: "We're open Monday to Saturday from 8 AM to 6 PM. Closed on Sundays.",
    },
  ];

  return (
    <>
      <StructuredData type="organization" data={{}} />
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/background_image.jpg)", filter: 'brightness(0.7)' }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}
        <div className="container relative px-4 md:px-6 text-center">
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              Delicious Homemade Treats
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              Indulge in our freshly baked cakes, cookies, and pastries made with love and the finest ingredients.
            </p>
            <div className="space-x-4 pt-4">
              <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 text-white shadow-lg transition-transform transform hover:scale-105">
                <Link href="/products">Start Shopping</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white shadow-lg transition-transform transform hover:scale-105">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-50">
                Featured Delights
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Discover our most popular and delicious baked goods, crafted with the finest ingredients.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-50">
              What Our Customers Say
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed dark:text-gray-400">
              Hear from our satisfied customers about their experiences with Flavour Bites.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                <Avatar className="mb-4 h-16 w-16 border-2 border-pink-500">
                  <AvatarFallback className="text-pink-500 font-semibold text-xl">{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4 text-lg">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-base">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-50">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed dark:text-gray-400">
              Find answers to common questions about our products and services.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
