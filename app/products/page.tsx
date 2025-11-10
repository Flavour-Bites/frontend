'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductCard from "@/components/ProductCard";
import { productsAPI } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Head from 'next/head';
import toast from 'react-hot-toast';

interface BackendProduct {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  ingredients: string[] | string;
}

interface FrontendProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  ingredients: string[];
  averageRating?: number;
  reviewCount?: number;
}

const categories = ['All', 'Cakes', 'Cookies', 'Pastries'];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('name-asc');
  const [products, setProducts] = useState<FrontendProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        if (response.error) {
          toast.error('Failed to load products');
          setProducts([]);
        } else {
          // Transform backend data to frontend format
          const rawData = response.data ?? [];
          const transformedProducts: FrontendProduct[] = (rawData as unknown as BackendProduct[]).map((product: BackendProduct) => ({
            id: String(product.id),
            name: product.name,
            description: product.description,
            price: typeof product.price === 'string' ? parseFloat(product.price) : Number(product.price || 0),
            category: product.category,
            image: product.image || "/cake.png",
            ingredients: Array.isArray((product as any).ingredients)
              ? ((product as any).ingredients as string[])
              : ((product as any).ingredients
                  ? String((product as any).ingredients).split(',').map((s: string) => s.trim()).filter(Boolean)
                  : []),
            averageRating: 0,
            reviewCount: 0,
          }));
          setProducts(transformedProducts);
        }
      } catch (error) {
        toast.error('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = products
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => category === 'All' || p.category === category);

    switch (sortOrder) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return filteredProducts;
  }, [products, searchTerm, category, sortOrder]);

  return (
    <>
      <Head>
        <title>Our Products | Fresh Baked Goods | Flavour Bites Bakery</title>
        <meta name="description" content="Browse our complete collection of homemade cakes, cookies, and pastries. Fresh baked daily with premium ingredients. Order online for delivery." />
        <meta name="keywords" content="bakery products, homemade cakes, fresh cookies, pastries, baked goods, birthday cakes, custom cakes" />
        <meta property="og:title" content="Our Products | Flavour Bites Bakery" />
        <meta property="og:description" content="Browse our complete collection of homemade cakes, cookies, and pastries." />
        <meta property="og:url" content="https://flavourbites.com/products" />
        <meta property="og:image" content="https://flavourbites.com/background_image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Products | Flavour Bites Bakery" />
        <meta name="twitter:description" content="Browse our complete collection of homemade cakes, cookies, and pastries." />
        <meta name="twitter:image" content="https://flavourbites.com/background_image.jpg" />
        <link rel="canonical" href="https://flavourbites.com/products" />
      </Head>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-50">
            Our Delicious Products
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4 dark:text-gray-400">
            Browse our collection of handcrafted treats, made fresh daily.
          </p>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-12">
          <div className="flex-grow">
            <Input
              placeholder="Search for treats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={category === cat ? 'default' : 'outline'}
                onClick={() => setCategory(cat)}
                className={category === cat ? 'bg-pink-500 hover:bg-pink-600' : ''}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="w-full md:w-auto">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
