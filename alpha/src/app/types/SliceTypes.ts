export type DataItem = {
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
  };
};

export interface DataState {
  data: DataItem[];
  loading: boolean;
  error: string | null;
}

export interface CartItem {
  name: string;
  image: string;
  price: number;
  rating: number;
}