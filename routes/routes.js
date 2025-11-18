import express from 'express'
import postBoardImg from '../controllers/postBoardImg.js'
import boardMediaUpload from '../middleware/uploadBoardMedia.js'

const Router = new express.Router()

Router.post('/boardImg',boardMediaUpload.single('img'),postBoardImg)

export default Router