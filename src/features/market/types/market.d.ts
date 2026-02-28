export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Food' | 'Tech' | 'Craft';
  stock: number;
  quality: number;
  image: string;
}
