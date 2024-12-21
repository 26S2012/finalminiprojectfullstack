import mongoose from "mongoose";
const OwnerSchema = mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
        unique: true,
    }

});
const OwnerModel = mongoose.model("owner",OwnerSchema);
export default OwnerModel;