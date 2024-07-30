//SECTION - data transfer object types

interface ResponseObject {
  success: boolean;
  message: string;
  payload?: ProductBasicDataResponse[] | ProductExtraDataResponse[];
}

interface ProductBasicDataResponse {
  id: string;
  brand: string;
  model: string;
  gender: string;
  category: string;
  material: string;
  season: string;
  price: Decimal;
  initial_price: Decimal;
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
  rating_value: Decimal;
  image_url_array: string[];
}
