'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { ordersAPI } from '@/lib/api';
import Link from 'next/link';

export default function OrderPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [name, setName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone_number || '');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [deliveryDateTime, setDeliveryDateTime] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Log in or Register to Place an Order</h1>
        <p className="text-lg mb-8">You need to be logged in to complete your purchase.</p>
        <div className="flex justify-center gap-4">
          <Link href="/login">
            <Button size="lg">Log In</Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline">Register</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryDateTime) {
      toast.error('Please select a delivery date and time.');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items before placing an order.');
      return;
    }

    const orderData = {
      customer_name: name,
      customer_phone: phone,
      delivery_address: deliveryAddress,
      delivery_date_time: new Date(deliveryDateTime).toISOString(),
      notes,
    };

    const response = await ordersAPI.create(orderData);

    if (response.data) {
      toast.success('Your order has been placed successfully!');
      clearCart();
    } else if (response.error) {
      toast.error(`Failed to place order: ${response.error}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-lg" />
                        <div>
                          <p className="font-semibold text-lg">{item.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">Your cart is empty. Please add items to proceed.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Customer Details Form */}
        <div className="lg:col-span-1">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">Your Details</CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.length > 0 && (
                <form onSubmit={handleSubmit} className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-lg">Name</Label>
                    <Input id="name" placeholder="John Doe" required className="py-6" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="text-lg">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (123) 456-7890" required className="py-6" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="delivery-address" className="text-lg">Delivery Address</Label>
                    <Input id="delivery-address" placeholder="123 Main St, Anytown, USA" required className="py-6" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="delivery-time" className="text-lg">Delivery Date & Time</Label>
                    <Input id="delivery-time" type="datetime-local" required className="py-6" value={deliveryDateTime} onChange={(e) => setDeliveryDateTime(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes" className="text-lg">Special Notes</Label>
                    <Textarea id="notes" placeholder="e.g., 'Happy Birthday' message, dietary restrictions" rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg transition-colors shadow-lg transform hover:scale-105">
                    Place Order
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
