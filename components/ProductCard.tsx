'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isLoading } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoading || isAdded) return;

    try {
      await addToCart(product, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      toast.error("Failed to add item to cart.");
    }
  };

  return (
    <Link href={`/products/${product.id}`} passHref>
      <Card className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-transparent hover:border-pink-500 group">
        <div className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-50 truncate">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400 h-10 mt-2">
            {product.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between p-4 pt-0">
          <span className="text-2xl font-bold text-pink-500 dark:text-pink-400">
            ${product.price}
          </span>
          <Button
            size="icon"
            className={`transition-all duration-300 ${isAdded ? 'bg-green-500 hover:bg-green-600' : 'bg-pink-500 hover:bg-pink-600'} text-white rounded-full shadow-md`}
            onClick={handleAddToCart}
            disabled={isLoading || isAdded}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isAdded ? (
              <Check className="h-5 w-5" />
            ) : (
              <ShoppingCart className="h-5 w-5" />
            )}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
