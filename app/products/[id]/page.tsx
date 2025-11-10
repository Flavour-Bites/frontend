'use client';
import _ from "lodash";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductReviewForm from "@/components/ProductReviewForm";
import { Star } from "lucide-react";
import StructuredData from "@/components/StructuredData";
import Head from "next/head";
import { useEffect, useState } from "react";
import { productsAPI } from "@/lib/api";
import { formatDate } from "@/lib/utils";

type FetchedProduct = {
	id: number | string;
	name: string;
	description?: string;
	longDescription?: string;
	price: number | string;
	category?: string;
	image?: string;
	ingredients?: string[] | string;
	reviews?: {
		id : string;
		user_full_name: string;
		rating: number;
		comment: string;
		created_at: string;
	}[];
	averageRating?: number;
	reviewCount?: number;
};

function slugify(s: string) {
	return s
		.toString()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)+/g, "");
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
	const { addToCart } = useCart();
	const [product, setProduct] = useState<FetchedProduct | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;

		async function load() {
			setLoading(true);
			const id = params.id;

			// If id looks numeric, try direct backend lookup first
			if (/^\d+$/.test(id)) {
				const res = await productsAPI.getById(id);
				if (res.data && mounted) {
					setProduct(res.data as FetchedProduct);
					setLoading(false);
					return;
				}
			}

			// Otherwise fetch all products from backend and try to match by slugified name or id
			const allRes = await productsAPI.getAll();
			if (allRes.data && mounted) {
				const found = (allRes.data as any[]).find((p) => {
					const slug = p.name ? slugify(p.name) : String(p.id);
					return slug === params.id || String(p.id) === params.id;
				});
				if (found) {
					setProduct(found as FetchedProduct);
					setLoading(false);
					return;
				}
			}
		}
		load();

		return () => {
			mounted = false;
		};
	}, [params.id, setProduct]);

	const dummyReviews = [
		{
			id: 1,
			reviewer: "Alice B.",
			rating: 5,
			comment: "Absolutely delicious! The best I've ever had. Highly recommend.",
			date: "2023-10-26",
		},
		{
			id: 2,
			reviewer: "Bob W.",
			rating: 4,
			comment: "Very good, but a little too sweet for my taste. Still enjoyed it!",
			date: "2023-11-01",
		},
	];

	if (loading) {
		return <div className="container mx-auto px-4 py-12">Loading product...</div>;
	}

	if (!product) {
		return <div className="container mx-auto px-4 py-12">Product not found.</div>;
	}

	const ingredientsArray = Array.isArray(product.ingredients)
		? (product.ingredients as string[])
		: typeof product.ingredients === "string"
			? (product.ingredients as string).split(",").map((i) => i.trim())
			: [];

	const reviewsArray = Array.from(product.reviews as FetchedProduct["reviews"] || []);

	const displayPrice = typeof product.price === "string" ? parseFloat(product.price) : product.price;

	return (
		<>
			<Head>
				<title>{product.name} | Fresh Baked Goods | Flavour Bites Bakery</title>
				<meta name="description" content={`${product.description || ""} Made with premium ingredients.`} />
				<meta name="keywords" content={`${product.name}, ${product.category || ""}`} />
				<meta property="og:title" content={`${product.name} | Flavour Bites Bakery`} />
				<meta property="og:description" content={product.description || ""} />
				<meta property="og:url" content={`https://flavourbites.com/products/${product.id}`} />
				<meta property="og:image" content={`${product.image || "/cake.png"}`} />
				<meta property="og:type" content="product" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={`${product.name} | Flavour Bites Bakery`} />
				<meta name="twitter:description" content={product.description || ""} />
				<meta name="twitter:image" content={`${product.image || "/cake.png"}`} />
				<link rel="canonical" href={`https://flavourbites.com/products/${product.id}`} />
			</Head>

			<StructuredData type="product" data={product} />
			<div className="container mx-auto px-4 py-12 md:py-24">
				<div className="grid md:grid-cols-2 gap-12">
					<div className="flex justify-center">
						<div className="max-w-md w-full">
							<Image
								src={product.image || "/cake.png"}
								alt={product.name}
								width={600}
								height={600}
								className="w-full h-auto rounded-lg shadow-lg object-cover"
							/>
						</div>
					</div>
					<div className="flex flex-col justify-center">
						<h1 className="text-4xl font-bold mb-4">{product.name}</h1>
						<p className="text-gray-600 dark:text-gray-400 text-lg mb-6">{product.longDescription || product.description}</p>
						<div className="mb-6">
							<h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
							<ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
								{ingredientsArray.map((ingredient, index) => (
									<li key={index}>{ingredient}</li>
								))}
							</ul>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-3xl font-bold text-pink-500 dark:text-pink-400">${displayPrice}</span>
							<Button
								size="lg"
								className="bg-pink-500 hover:bg-pink-600 text-white"
								onClick={() =>
									addToCart(
										{
											id: String(product.id),
											name: product.name,
											description: product.description || '',
											longDescription: product.longDescription,
											price: typeof displayPrice === "number" ? displayPrice : parseFloat(String(displayPrice)),
											category: product.category || 'General',
											image: product.image || "/cake.png",
											ingredients: ingredientsArray,
											averageRating: product.averageRating || 4.5,
											reviewCount: product.reviewCount || 0,
										},
										1
									)
								}
							>
								Add to Cart
							</Button>
						</div>
					</div>
				</div>

				{/* Reviews Section */}
				<div className="mt-20">
					<h2 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
					<div className="grid gap-8 max-w-2xl mx-auto">
						{reviewsArray.map((review) => (
							<Card key={review.id}>
								<CardHeader>
									<div className="flex items-center mb-2">
										<div className="flex text-yellow-400">
											{[...Array(5)].map((_, i) => (
												<Star key={i} className={`h-5 w-5 ${i < review.rating ? "fill-current" : "text-gray-300 dark:text-gray-600"}`} />
											))}
										</div>
										<p className="ml-3 text-gray-700 dark:text-gray-300 font-semibold">{review.user_full_name}</p>
										<p className="ml-auto text-sm text-gray-500 dark:text-gray-400">{formatDate(review.created_at)}</p>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Product Review Form */}
				<div className="mt-16">
					<ProductReviewForm productId={String(product.id)} />
				</div>
			</div>
		</>
	);
}
