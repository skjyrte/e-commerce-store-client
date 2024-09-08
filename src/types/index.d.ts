//SECTION - data transfer object types

interface ProductBasicDataResponse {
  product_id: string;
  brand: string;
  model: string;
  gender: string;
  category: string;
  material: string;
  season: string;
  price: string;
  initial_price: string;
  thumbnail: string;
  color: string;
  stock_array: StockResponse[];
}

interface StockResponse {
  size: string;
  count: number;
}

interface ProductExtraDataResponse extends ProductBasicDataResponse {
  short_description: string;
  description: string;
  features: string[];
  rating_reviews: number;
  rating_value: string;
  image_url_array: string[];
}

type Nullable<T> = T | null;
