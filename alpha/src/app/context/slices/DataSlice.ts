import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../lib/contentful";
import { RootState } from "../store";

type DataItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rating: number;
};

interface DataState {
  data: DataItem[];
  loading: boolean;
  error: string | null; 
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "menu/fetchData",
  async () => {
    const entries = await client.getEntries({ content_type: "menu" });
    const data = entries.items.map((entry:any) => {
      const { id, name, image,price, description, category, rating} = entry.fields as any
      return {
        id,
        name,
        image: image?.fields?.file.url || "",
        price,
        description,
        category,
        rating
      }
    })
    return data;
  }
);

const DataSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export const selectData = (state: RootState) => state.data;
export default DataSlice.reducer;
