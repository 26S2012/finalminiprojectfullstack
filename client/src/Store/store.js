import { configureStore } from '@reduxjs/toolkit'
import ownerReducer from "../Features/OwnerSlice";
import ProductReducer from "../Features/ProductSlice";
import UserReducer from "../Features/UserSlice";
import CartReducer from "../Features/CartSlice";
import OrderReducer from "../Features/OrderSlice";
import addressReducer from "../Features/AdressSlice";

export const store = configureStore({
  reducer: {
    owner:ownerReducer,
    product:ProductReducer,
    user:UserReducer,
    cart: CartReducer,
    order:OrderReducer,
    Address: addressReducer,
    
  },
})


