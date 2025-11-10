'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full h-10 w-10">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90vw] max-w-md flex flex-col bg-gray-50 dark:bg-gray-900 p-6">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto pr-4 -mr-4 py-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
          ) : (
            <div className="mt-4 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                  <div className="flex items-start gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-50">{item.name}</h4>
                      <p className="text-md text-gray-600 dark:text-gray-400 mt-1">${item.price}</p>
                      <div className="flex items-center gap-3 mt-4">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold text-lg">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500 transition-colors" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <SheetFooter className="mt-auto pt-6">
            <div className="w-full space-y-4">
              <Separator />
              <div className="flex justify-between font-bold text-xl text-gray-900 dark:text-gray-50">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Button asChild size="lg" className="w-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg transition-transform transform hover:scale-105 py-6">
                <Link href="/order">Proceed to Checkout</Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full py-6" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
