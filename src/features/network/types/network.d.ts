export interface NetworkNode {
  id: string;
  name: string;
  type: 'Merchant' | 'Producer' | 'Guild';
  lat: number;
  lng: number;
  status: 'active' | 'pending';
}
