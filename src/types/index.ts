// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  images: string[];
  thumbnail: string;
  variants: ProductVariant[];
  stock: number;
  featured: boolean;
  tags: string[];
  notes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  name: string;
  size: string;
  price: number;
  stock: number;
}

// Cart Types
export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
}

// User Types
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  addresses: Address[];
  createdAt: Date;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  paymentId?: string;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  quantity: number;
  price: number;
  image: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

// Wishlist Types
export interface Wishlist {
  userId: string;
  productIds: string[];
}

// Newsletter Types
export interface NewsletterSubscriber {
  email: string;
  subscribedAt: Date;
}

// Contact Form Types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

// Admin Types
export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: Order[];
  lowStockProducts: Product[];
}
