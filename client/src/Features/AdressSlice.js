import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const AddAdress = createAsyncThunk(
  'adress/AddAdress',
  async ({email, name,postalcode, location,phone  }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/AddAdress', {
        email:email, name:name,postalcode:postalcode, location:location,phone:phone
      });
      return response.data.adress;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchAddress = createAsyncThunk(
  'adress/address',
  async (email) => {
    try {
      const response = await axios.get(`http://localhost:3001/address/${email}`);
      return response.data.adress;  // Ensure this matches the response structure from your server
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const removeAddress = createAsyncThunk(
  'adress/removeAddress',
  async ({ email, adressId }) => {
    try {
      const response = await axios.delete(`http://localhost:3001/address/${email}/${adressId}`);
      return response.data.removeAddress;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Slice
const addressSlice = createSlice({
  name: "addresses",
  initialState: {
    addresses: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.status = "succeeded";
      })
      .addCase(AddAdress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
      })
      .addCase(removeAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter((address) => address.id !== action.payload);
      })
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default addressSlice.reducer;