import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const registerUser = createAsyncThunk(
    "users/registerUser",
    async (UserData)=>{
        try{
            const response = await
            axios.post("http://localhost:3001/registerUser",{
                email:UserData.email,
                password:UserData.password
            });
            console.log(response);
            const user = response.data.user;
            const msg = response.data.msg
            return {user,msg}
        }catch(error){
            const msg = error.message;
            return {msg}
        }
    }
)

export const login = createAsyncThunk(
  "users/login",
  async (userData,{rejectWithValue}) => {
    try {
     
      const response = await axios.post(
        "http://localhost:3001/login",
        {
          email: userData.email,
          password: userData.password,
        }
      );
      const user = response.data.user;
      const msg = response.data.msg;
      return { user, msg };
    } catch (error) {
      //const msg = 'Invalid credentials';
      const msg = error.response.data.msg;
      return rejectWithValue({ msg });
    }
  }
);
//logout
export const logout = createAsyncThunk("/users/logout", async () => {
  try {
    const response = await axios.post("http://localhost:3001/logout");
    return response.data; // Return the whole response for debugging
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
});

const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  msg: null,
  isLogin: false,
};
export const UserSlice = createSlice({
    name: "users", // Name of the state
    initialState, // Initial state values
    reducers: {}, // No synchronous reducers needed for now
    extraReducers: (builder) => {
      builder
      .addCase(registerUser.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled,(state,action)=>{
        state.isSuccess = true;
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(registerUser.rejected,(state)=>{
        state.isLoading = false;
        state.isError = true;
        state.msg = "Unexpected error";
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLogin = true;
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(login.rejected, (state,action) => {
         state.isError = true;
         state.isLogin = false;
         state.user = null;
         state.msg = action.payload.msg;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLogin = false;
        state.user = null;
        state.msg = action.payload.msg;          
      })
      .addCase(logout.rejected, (state) => {
         state.isError = true
      })

      

    }})

export default UserSlice.reducer;