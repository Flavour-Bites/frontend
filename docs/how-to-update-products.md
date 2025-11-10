# How to Update Products

This site is frontend-only. Products are defined in a local data file and can be edited without any backend.

## File locations
- Data source: `data/products.ts`
- Featured logic: `featured` is `products.slice(0, 6)` in the same file
- Product cards UI: `components/site/ProductCard.tsx`
- Products page: `app/products/page.tsx`
- Order dropdown: `app/order/page.tsx`

## Product shape
```ts
// TypeScript
export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: "Cakes" | "Cookies" | "Pastries"
  image: string
}
```

## Add a new product
1. Open `data/products.ts`.
2. Add a new object to the `products` array:
```ts
// TypeScript
{
  id: "cake-redvelvet",
  name: "Red Velvet Cake",
  description: "Moist red velvet with cream cheese frosting.",
  price: 22.0,
  category: "Cakes",
  image: "/cake.png" // placeholder image for now
}
```
3. Keep `id` unique and URL-safe (e.g., kebab-case).
4. Choose a valid `category` ("Cakes" | "Cookies" | "Pastries").

The Products page and Order dropdown update automatically.

## Change prices or descriptions
- Edit the `price` (number) or `description` fields directly in `data/products.ts`.
- Currency symbol is rendered in `components/site/ProductCard.tsx`. By default it shows `KSh`. To change:
```tsx
// TypeScript React
// components/site/ProductCard.tsx
<span className="text-rose-700 font-semibold">
  KSh {product.price.toFixed(2)}
</span>
```
Replace `KSh` with your preferred currency label (e.g., `KES`, `ETB`, `$`).

## Featured products
- Featured items on the Home page come from:
```ts
// TypeScript
export const featured = products.slice(0, 6)
```
- To control which products are featured, reorder the `products` array or change the slice logic (e.g., filter by a `featured: true` flag you add).

## Add a new category
1. Extend the `category` union in `Product` type (optional but recommended for strict typing).
2. Update the category list in `app/products/page.tsx`:
```ts
// TypeScript
const categories: Product["category"][] = ["Cakes", "Cookies", "Pastries" /*, "NewCategory" */]
```
3. Use the new `category` value in your product objects.

## Images
- For now, all products use a single placeholder image at `public/cake.png`.
- To use a new image:
  - Add your file to `public/` (e.g., `public/red-velvet.png`).
  - Update the product’s `image` to `"/red-velvet.png"`.

## Development
- Start the dev server:
```bash
# Bash
npm run dev
```
- Edits hot-reload automatically at http://localhost:3000.

## Connecting to Django later
- Replace imports from `data/products.ts` with API calls to your Django backend (e.g., a `/api/products` endpoint).
- Keep the same product shape for a smooth drop-in replacement.
- For SEO, ensure the API delivers all fields needed for the pages/components that render metadata and product info.

## Tips
- Keep `id` values unique.
- Keep names short and clear.
- Prefer concise descriptions (1–2 lines).
- Validate types if you change the `Product` structure.
