type ResponseObject = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  initialPrice: number;
  rating: number;
  stock: {size: string; count: number}[];
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};
