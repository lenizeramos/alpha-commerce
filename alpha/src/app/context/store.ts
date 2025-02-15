import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/DataSlice';
import cartReducer from './slices/CartSlice';

const store = configureStore({
  reducer: {
    data: dataReducer,
    cart: cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
