import mongoose from "mongoose";
const ProductsSchema = mongoose.Schema({
    productName:{
        type: String,
        required:true,
        
    },
    category:{
        type: String,
        required:true,
        
    },
    image:{
        type: String,
        required:true,
        
    },
    price:{
        type: Number,
        required:true,
        
    }

});
const ProductsModel = mongoose.model("products",ProductsSchema);
export default ProductsModel;