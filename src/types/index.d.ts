interface ObsoleteResponseObject {
  products: Product[];
}

interface ObsoleteProduct {
  id: string;
  gender: string;
  category: string;
  brand: string;
  model: string;
  shortDescription: string;
  description: string;
  features: string[];
  price: number;
  initialPrice: number;
  rating: {reviews: number; value: number};
  stock: {size: string; count: number}[];
  thumbnail: string;
  images: string[];
}

/* updated types */

interface Product {
  id: string;
  brand: string;
  model: string;
  gender: string;
  category: string;
  material: string;
  season: string;
  shortDescription: string;
  description: string;
  features: string[];
  price: number;
  initialPrice: number;
  ratingReviews: number;
  ratingValue: number;
  thumbnail: string;
  color: string;
}

interface stock {
  size: string;
  count: number;
}

interface ProductWithData extends Product {
  stock?: stock[];
  imageUrlArray?: string[];
}

interface ExpectedResponse {
  success: boolean;
  message: string;
  payload?: ProductWithData[];
}
