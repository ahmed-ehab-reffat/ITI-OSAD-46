import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  count: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, 'count'>>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({...action.payload, count: 1});
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementCount(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.count += 1;
      }
    },
    decrementCount(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.count > 1) {
          item.count -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    }
  }
});

export const {addToCart, removeFromCart, incrementCount, decrementCount} =
  cartSlice.actions;

export default cartSlice.reducer;
