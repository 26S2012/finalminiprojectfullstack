import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  postalcode: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

// Create and export the model
const AddressModel = mongoose.model("Adress", AddressSchema);

export default AddressModel;
