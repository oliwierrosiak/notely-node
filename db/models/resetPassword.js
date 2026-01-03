import mongoose from "mongoose";

const ResetPasswordModel = new mongoose.Schema({
    email:String,
    expireDate:{
        type:Number,
        default:new Date().getTime() + 900000
    }
})

export default ResetPasswordModel