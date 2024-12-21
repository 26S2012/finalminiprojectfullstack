import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for adding to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userEmail, productId, productName, price }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/add-to-cart', {
        userEmail:userEmail,
        productId:productId,
        productName:productName,
        price:price,
      });
      return response.data.cartItem;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// Thunk for fetching cart items
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userEmail) => {
    try {
      const response = await axios.get(`http://localhost:3001/cart/${userEmail}`);
      return response.data.cartItems;  // Ensure this matches the response structure from your server
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ email, productId }) => {
    try {
      const response = await axios.delete(`http://localhost:3001/cart/${email}/${productId}`);
      return response.data.removedItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const increaseQuantity = createAsyncThunk(
  'cart/increaseQuantity',
  async ({ email, productId }) => {
    try {
      const response = await axios.patch(`http://localhost:3001/cart/increase/${email}/${productId}`);
      return response.data.updatedItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Decrease quantity
export const decreaseQuantity = createAsyncThunk(
  'cart/decreaseQuantity',
  async ({ email, productId }) => {
    try {
      const response = await axios.patch(`http://localhost:3001/cart/decrease/${email}/${productId}`);
      return response.data.updatedItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.items = action.payload;  // Store the cart items in the state
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.error = action.error.message;  // Handle errors
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        // Remove the item from the state after successful deletion
        state.items = state.items.filter(item => item.productId !== action.payload.productId);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        state.items = state.items.map((item) =>
          item.productId === updatedItem.productId ? updatedItem : item
        );
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        state.items = state.items.map((item) =>
          item.productId === updatedItem.productId ? updatedItem : item
        );
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.error = action.error.message;
      });

  },
});

export default cartSlice.reducer;


