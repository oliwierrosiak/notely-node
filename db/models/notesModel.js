import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const NotesModel = new mongoose.Schema({
    title:{
        type:String,
        default:'Nowy projekt'
    },
    content:{
        type:Array,
        default:[]
    },
    boardColor:{
        type:String,
        default:'bgBlack5'
    },
    template:{
        type:String,
        default:'backgroundTemplate9'
    },
    code:{
        type:Number,
        unique:true,
    },
    notePassword:{
        type: String,
        default: null
    },
    admin:String,
    visibility:String,
    visitors:{
        type:Array,
        default:[]
    }
})

NotesModel.pre('save',async function() {
    if(this.isModified('notePassword') && this.notePassword != null)
    {
        const salt = await bcrypt.genSalt(10)
        this.notePassword = await bcrypt.hash(this.notePassword,salt)
    }
})

export default NotesModel