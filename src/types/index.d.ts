type ResponseObject = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
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
  rating: number;
  stock: {size: string; count: number}[];
  thumbnail: string;
  images: string[];
};
