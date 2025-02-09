export type DataItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rating: number;
};

export interface DataState {
  data: DataItem[];
  loading: boolean;
  error: string | null;
}
