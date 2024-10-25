import { createSlice } from '@reduxjs/toolkit';

// Load initial cart state from localStorage if it exists
const cartFromLocalStorage = JSON.parse(localStorage.getItem('cartItems')) || [];

const initialState = {
  cartItems: cartFromLocalStorage,
  totalQuantity: cartFromLocalStorage.reduce((total, item) => total + item.quantity, 0),
  totalAmount: cartFromLocalStorage.reduce((total, item) => total + item.price * item.quantity, 0),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find((product) => product.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalAmount += item.price;

      // Update cart in localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const itemToRemove = state.cartItems.find((item) => item.id === id);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
        state.cartItems = state.cartItems.filter((item) => item.id !== id);

        // Update cart in localStorage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      // Clear cart in localStorage
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
