import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import emailValidate from "../validators/emailValidator.js";
import nameValidate from "../validators/nameValidator.js";
import passwordValidate from "../validators/passwordValidator.js";

const UserModel = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true,'Podaj nazwę'],
        validate:[(name)=>nameValidate(name),'Nazwa jest za krótka']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Podaj adres email'],
        validate:[(email)=>emailValidate(email),'Wprowadź prawidłowy adres email']
    },
    password:{
        type:String,
        required:[true,'Podaj hasło'],
        validate:[(password)=>passwordValidate(password),'Hasło jest za słabe']
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