import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/app/types/SliceTypes";

const loadCart = () => {
  if(typeof window !== 'undefined'){
  try{
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
} catch (err) {
  console.error("Error loading cart:", err);
  return [];
}
}
return [];
}

const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch (err) {
    console.error("Error saving cart:", err);
  }
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: loadCart(),
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
            saveCart(state.items);
          },
          increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item) {
              item.quantity += 1;
            }
            saveCart(state.items);
          },
          decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item && item.quantity > 1) {
              item.quantity -= 1;
            } else {
              state.items = state.items.filter((item) => item.id !== action.payload); 
            }
            saveCart(state.items);
          },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload);
            saveCart(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            saveCart(state.items);
        },
    },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;



