import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const UserModel = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    },
    img:{
        type:String,
        default:''
    }
})

UserModel.pre('save',async function(){
    if(!this.isModified('password'))
    {
        return
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    
})

export default UserModel