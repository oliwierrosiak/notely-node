import mongoose from "mongoose";
import dotenv from 'dotenv'
import NotesModel from "./models/notesModel.js";
import UserModel from "./models/userModel.js";
import RefreshTokenModel from "./models/refreshTokenModel.js";
dotenv.config()

export const Notes = mongoose.model('note',NotesModel)

export const User = mongoose.model('user',UserModel)

export const RefreshToken = mongoose.model('token',RefreshTokenModel)

mongoose.connect(process.env.DATABASE)
