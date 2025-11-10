import Head from 'next/head';

interface ProductStructuredData {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  ingredients: string[];
  averageRating?: number;
  reviewCount?: number;
}

interface StructuredDataProps {
  type: 'product' | 'recipe' | 'organization' | 'breadcrumb';
  data: ProductStructuredData | any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'product':
        const product = data as ProductStructuredData;
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "description": product.description,
          "image": `https://flavourbites.com${product.image}`,
          "category": product.category,
          "brand": {
            "@type": "Brand",
            "name": "Flavour Bites"
          },
          "offers": {
            "@type": "Offer",
            "price": product.price.toString(),
            "priceCurrency": "ETB",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Flavour Bites Bakery"
            }
          },
          "aggregateRating": product.averageRating ? {
            "@type": "AggregateRating",
            "ratingValue": product.averageRating.toString(),
            "reviewCount": product.reviewCount?.toString() || "0"
          } : undefined,
          "recipeIngredient": product.ingredients
        };

      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Bakery",
          "name": "Flavour Bites",
          "description": "Artisanal homemade bakery specializing in fresh cakes, cookies, and pastries made with love and the finest ingredients.",
          "url": "https://flavourbites.com",
          "logo": "https://flavourbites.com/cake.png",
          "image": "https://flavourbites.com/background_image.jpg",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Sweet Street",
            "addressLocality": "Addis Ababa",
            "addressCountry": "ET"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+251-911-123-456",
            "contactType": "customer service",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://www.facebook.com/flavourbites",
            "https://www.instagram.com/flavourbites"
          ]
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  );
}
