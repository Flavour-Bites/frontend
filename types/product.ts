export type Product = {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  category: string;
  image: string;
  ingredients: string[];
  averageRating?: number;
  reviewCount?: number;
};
