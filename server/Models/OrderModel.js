import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  address: {
    name: { type: String, required: true },
    location: { type: String, required: true },
    postalcode: { type: String, required: true },
    phone: { type: String, required: true },
  },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Processing, Completed
  createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;
