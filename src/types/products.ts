/**
 * Product types for the bakery e-commerce website
 */

// Make sure Product is exported as a named export
export type Product = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  price: number;
  formattedPrice: string;
  category?: 'cake' | 'pastry' | 'cookie' | 'bread';
  featured?: boolean;
  inStock?: boolean;
  description?: string;
  ingredients?: string[];
  btntxt?: string;
};

// Create an interface version for runtime use
export interface ProductInterface {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  price: number;
  formattedPrice: string;
  category?: 'cake' | 'pastry' | 'cookie' | 'bread';
  featured?: boolean;
  inStock?: boolean;
  description?: string;
  ingredients?: string[];
  btntxt?: string;
}

// Export a class version as well to ensure JavaScript output has something to import
export class ProductModel implements ProductInterface {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  price: number;
  formattedPrice: string;
  category?: 'cake' | 'pastry' | 'cookie' | 'bread';
  featured?: boolean;
  inStock?: boolean;
  description?: string;
  ingredients?: string[];
  btntxt?: string;

  constructor(data: ProductInterface) {
    this.id = data.id;
    this.image = data.image;
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.price = data.price;
    this.formattedPrice = data.formattedPrice;
    this.category = data.category;
    this.featured = data.featured;
    this.inStock = data.inStock;
    this.description = data.description;
    this.ingredients = data.ingredients;
    this.btntxt = data.btntxt;
  }
}

// Also export some utility types that might be useful
export type ProductId = string;
export type ProductCategory = 'cake' | 'pastry' | 'cookie' | 'bread';
