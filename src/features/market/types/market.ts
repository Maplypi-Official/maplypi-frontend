// تصدير الواجهة مباشرة لضمان التوافق
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Food' | 'Tech' | 'Craft' | string; 
  stock: number;
  quality: number;
  image: string;
  status?: 'available' | 'out_of_stock';
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  items: CartItem[];
  totalAmount: number;
  currency: 'Pi';
  timestamp: Date | string;
}
