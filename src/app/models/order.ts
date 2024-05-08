import { Cart } from "./cart";
export interface Order {
  id: number;
  name: string | null;
  address: string | null;
  phone: string | null;
  subTotal: number;
  createdAt: string | null;
  carts: Cart[] | null;
}
