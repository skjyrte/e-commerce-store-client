type ResponseObject = {
  products: Product[];
};

type Product = {
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
};
