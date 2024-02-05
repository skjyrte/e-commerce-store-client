type ResponseObject = {
  products: Product[];
  total: number;
};

type Product = {
  id: string;
  brand: string;
  model: string;
  category: string;
  shortDescription: string;
  description: string;
  features: string[];
  price: number;
  initialPrice: number;
  rating: {reviews: number; value: number};
  stock: {size: string; count: number}[];
  thumbnail: string;
  images: string[];
};
