import express from 'express'
import postBoardImg from '../controllers/postBoardImg.js'
import boardMediaUpload from '../middleware/uploadBoardMedia.js'
import getBoardData from '../controllers/getBoardData.js'
import updateBoard from '../controllers/updateNoteTitle.js'
import updateNoteContent from '../controllers/updateNoteContent.js'

const Router = new express.Router()

Router.post('/boardImg',boardMediaUpload.single('img'),postBoardImg)

Router.get('/getBoardData/:id',getBoardData)

Router.post('/updateNoteTitle/:id',updateBoard)

Router.post('/updateNoteContent/:id',updateNoteContent)

export default Router