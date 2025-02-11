import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: number;
    name: string;
    image: string;
    price: number;
    rating: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            console.log(action.payload);
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
              existingItem.quantity += 1; 
            } else {
              state.items.push({ ...action.payload, quantity: 1 });
            }
          },
          increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item) {
              item.quantity += 1;
            }
          },
          decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item && item.quantity > 1) {
              item.quantity -= 1;
            } else {
              state.items = state.items.filter((item) => item.id !== action.payload); 
            }
          },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item, index) => index !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;



