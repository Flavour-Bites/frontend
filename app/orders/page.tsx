'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ordersAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Order } from '@/types/order';
import toast from 'react-hot-toast';

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    setLoading(true);
    const response = await ordersAPI.getAll();
    if (response.data) {
      setOrders(response.data);
    } else if (response.error) {
      toast.error(`Failed to load orders: ${response.error}`);
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Processing':
        return 'bg-blue-500';
      case 'Completed':
        return 'bg-green-500';
      case 'Cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Log in to View Your Orders</h1>
        <p className="text-lg mb-8">You need to be logged in to view your order history.</p>
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 text-center">
        <p className="text-lg">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center">
          <p className="text-lg mb-4">You haven't placed any orders yet.</p>
          <Link href="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="w-full">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">Order #{order.id}</CardTitle>
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    {order.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.created_at).toLocaleDateString()} at{' '}
                  {new Date(order.created_at).toLocaleTimeString()}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Details</h3>
                    <p><strong>Name:</strong> {order.customer_name}</p>
                    <p><strong>Phone:</strong> {order.customer_phone}</p>
                    <p><strong>Address:</strong> {order.delivery_address}</p>
                    <p><strong>Delivery Time:</strong> {new Date(order.delivery_date_time).toLocaleString()}</p>
                    {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Order Items</h3>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-12 h-12 rounded"
                            />
                            <div>
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-semibold">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${parseFloat(order.total_amount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
