export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsAll {
  products: Array<Product>;
}

export interface Categories {
  name: string[];
}

export interface CreateProductDTO extends Omit<Product, 'id'> {}
