import mongoose from "mongoose";

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
    }
})

export default NotesModel