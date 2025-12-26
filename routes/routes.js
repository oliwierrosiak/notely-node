import express from 'express'
import postBoardImg from '../controllers/postBoardImg.js'
import boardMediaUpload from '../middleware/uploadBoardMedia.js'
import getBoardData from '../controllers/getBoardData.js'
import updateBoardTitle from '../controllers/updateNoteTitle.js'
import updateNoteContent from '../controllers/updateNoteContent.js'
import deleteBoardItem from '../controllers/deleteBoardItem.js'
import deleteAWSMedia from '../controllers/deleteAWSMedia.js'

const Router = new express.Router()

Router.post('/boardImg',boardMediaUpload.single('img'),postBoardImg)

Router.get('/getBoardData/:id',getBoardData)

Router.post('/updateNoteTitle/:id',updateBoardTitle)

Router.post('/updateNoteContent/:id',updateNoteContent)

Router.delete('/deleteBoardItem/:boardId/:elementId',deleteBoardItem)

Router.post('/deleteAWSMedia',deleteAWSMedia)

export default Router