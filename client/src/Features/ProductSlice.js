import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    msg: null,
    error: null,
    status: "idle",
  };
  export const getProducts = createAsyncThunk('product/getProducts', async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3001/getproducts'); // Replace with your actual API URL
      return response.data.products; // Return the products array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  export const addProduct = createAsyncThunk('product/add', 
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3001/addProduct', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  
// Thunk for deleting a product
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:3001/deleteProduct/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);
// Async thunk to fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/products/${category}`);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Thunk for updating a product
export const updateProduct = createAsyncThunk('products/updateProduct', async (productData, thunkAPI) => {
  try {
    const response = await axios.put(`http://localhost:3001/updateProduct/${productData._id}`, {
      // productName: productData.productName,
      // category: productData.category,
      // image: productData.image,
      price: productData.price,
    });
    return response.data.product;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || "Failed to update product");
  }
});

export const searchProductsByName = createAsyncThunk(
  'products/searchByName',
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/searchProductsByName?name=${name}`);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch products');
    }
  }
);


export const ProductsSlice = createSlice({
    name: "product", // Name of the state
    initialState, // Initial state values
    reducers: {}, // No synchronous reducers needed for now
    extraReducers: (builder) => {
      builder
      .addCase(addProduct.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        console.log("Action Payload:", action.payload);
        state.isSuccess = true;
        state.products = action.payload.product;
        state.msg = action.payload.msg;
      })
      .addCase(addProduct.rejected,(state)=>{
        state.isLoading = false;
        state.isError = true;
        state.msg = "Unexpected error";
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        // Remove the deleted product from the state
        state.products = state.products.filter((product) => product._id !== action.meta.arg);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      // Update the product in the state
      const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
              }
        })
      .addCase(updateProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload || "Failed to update product";
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(searchProductsByName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchProductsByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(searchProductsByName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }})

export default ProductsSlice.reducer;