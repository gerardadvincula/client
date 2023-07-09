import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const itemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.products[itemIndex].quantity += 1;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price;
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decreaseCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((item) => item.id !== productId);
    },
    getTotal: (state, action) => {
      let { total, quantity } = state.products.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.quantity = quantity;
      state.total = total;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  incrementQuantity,
  decreaseCart,
  getTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
