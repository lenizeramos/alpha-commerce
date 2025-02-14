export interface DataItem {
  fields: {
    id: number;
    name: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    price: number;
    description: string;
    category: string;
    rating: number;
    ingredients?: { fields: { name: string } }[];
    comments?: { fields: { comment: string } }[];
  }
  
}

export interface DataState {
  data: DataItem[];
  loading: boolean;
  error: string | null;
}

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  quantity: number;
}