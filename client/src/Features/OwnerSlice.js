import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    owner: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    msg: null,
    isLogin: false,
  };
  export const loginOwner = createAsyncThunk(
    "owner/loginOwner",
    async (OwnerData,{rejectWithValue}) => {
      try {
        const response = await axios.post("http://localhost:3001/loginOwner", {
          email: OwnerData.email,
          password: OwnerData.password,
        });
        const owner = response.data.owner;
        const msg = response.data.msg;
        return { owner, msg };
      } catch (error) {
        //const msg = 'Invalid credentials';
        const msg = error.response.data.msg;
        return rejectWithValue({ msg });
      }
    }
  );
  

export const registerOwner = createAsyncThunk(
    "owner/registerOwner",
    async (OwnerData)=>{
        try{
            const response = await
            axios.post("http://localhost:3001/registerOwner",{
                email:OwnerData.email,
                password:OwnerData.password
            });
            console.log(response);
            const owner = response.data.owner;
            const msg = response.data.msg
            return {owner,msg}
        }catch(error){
            const msg = error.message;
            return {msg}
        }
    }
)
export const OwnerSlice = createSlice({
    name: "owner", // Name of the state
    initialState, // Initial state values
    reducers: {}, // No synchronous reducers needed for now
    extraReducers: (builder) => {
      builder
      .addCase(registerOwner.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(registerOwner.fulfilled,(state,action)=>{
        state.isSuccess = true;
        state.owner = action.payload.owner;
        state.msg = action.payload.msg;
      })
      .addCase(registerOwner.rejected,(state)=>{
        state.isLoading = false;
        state.isError = true;
        state.msg = "Unexpected error";
      })
      .addCase(loginOwner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginOwner.fulfilled, (state, action) => {
        state.isLogin = true;
        state.owner = action.payload.owner;
        state.msg = action.payload.msg;
      })
      .addCase(loginOwner.rejected, (state,action) => {
         state.isError = true;
         state.isLogin = false;
         state.owner = null;
         state.msg = action.payload.msg;
      })

      

    }})

export default OwnerSlice.reducer;