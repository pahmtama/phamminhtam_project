import { Product } from "./product";


export interface Cart {
  id: number;
  quantity: number;
  totalPrice: number;
  productId: number;
  size: string | null;
  createdAt: string;
  product: Product | null;
}
