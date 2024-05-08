export interface Product {
  id: number;
  name: string | null;
  price: number;
  image: string | null;
  description: string | null;
  status: boolean | null;
  category: string | null;
  categoryId: number | null;
  nameCategory: string | null;
  brand: string | null;
  createdAt: string | null;
}
