import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/DataSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
