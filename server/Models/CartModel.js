import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
    userEmail: { type: String, required: true }, 
     productId: { type: String, required: true }, 
     productName: { type: String, required: true }, 
     quantity: { type: Number, default: 1 }, 
     price: { type: Number, required: true },
});

const CartModel = mongoose.model("cart",CartSchema);
export default CartModel;