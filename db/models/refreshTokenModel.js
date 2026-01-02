import mongoose from "mongoose";

const RefreshTokenModel = new mongoose.Schema({
    token:String,
    expiresIn:{
        type:Number,
    }
})

export default RefreshTokenModel