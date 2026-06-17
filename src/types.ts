export interface Review {
  id: string;
  user: string;
  stars: number;
  comment: string;
  date: string;
}

export interface ProductSpec {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  brand: string;
  rating: number;
  ratingCount: number;
  price: number;
  originalPrice?: number;
  tag?: string; // e.g. "Limited Offer", "Best Seller"
  image: string;
  images: string[]; // for detail thumbnail gallery
  description: string;
  specs: ProductSpec[];
  reviews: Review[];
  colors?: string[]; // hex or color names
  sizes?: string[]; // sizes like 42mm, 46mm
}

export interface CartItem {
  id: string; // combination of product ID + color + size
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  brands: string[];
  rating: number;
  sortBy: string;
}
