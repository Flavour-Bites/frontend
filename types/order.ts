import { Product } from './product';

export interface OrderItem {
  id: number;
  order: number;
  product: Product;
  quantity: number;
  price: string;
}

export interface Order {
  id: number;
  user: number;
  customer_name: string;
  customer_phone: string;
  total_amount: string;
  status: string;
  delivery_address: string;
  delivery_date_time: string;
  notes: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}
