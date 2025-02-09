import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    error: null,
  };

const DataSlice = createSlice({
    name:'menu',
    initialState: initialState,
    reducers:{
        fetchDataStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          fetchDataSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
          },
          fetchDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
    }
})

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = DataSlice.actions;
export default DataSlice.reducer;