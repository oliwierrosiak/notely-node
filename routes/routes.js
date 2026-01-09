import express from 'express'
import postBoardImg from '../controllers/postBoardImg.js'
import boardMediaUpload from '../middleware/uploadBoardMedia.js'
import getBoardData from '../controllers/getBoardData.js'
import updateBoardTitle from '../controllers/updateNoteTitle.js'
import updateNoteContent from '../controllers/updateNoteContent.js'
import deleteBoardItem from '../controllers/deleteBoardItem.js'
import deleteAWSMedia from '../controllers/deleteAWSMedia.js'
import updateNoteColor from '../controllers/updateNoteColor.js'
import updateNoteTemplate from '../controllers/updateNoteTemplate.js'
import updateNoteCanvas from '../controllers/updateNoteCanvas.js'
import registerUser from '../controllers/registerUser.js'
import userImgUploader from '../middleware/uploadUserImg.js'
import login from '../controllers/login.js'
import refreshToken from '../auth/refreshToken.js'
import verifyToken from '../auth/verifyTokenMiddleware.js'
import getUserData from '../controllers/getUserData.js'
import logout from '../auth/logout.js'
import resetPassword from '../controllers/resetPassword.js'
import joinWithCode from '../controllers/joinWithCode.js'
import compareNotePassword from '../controllers/compareNotePassword.js'
import createNote from '../controllers/createNote.js'

const Router = new express.Router()

Router.post('/boardImg',boardMediaUpload.single('img'),postBoardImg)

Router.get('/getBoardData/:id',getBoardData)

Router.post('/updateNoteTitle/:id',updateBoardTitle)

Router.post('/updateNoteContent/:id',updateNoteContent)

Router.delete('/deleteBoardItem/:boardId/:elementId',deleteBoardItem)

Router.post('/deleteAWSMedia',deleteAWSMedia)

Router.post('/updateNoteColor/:id',updateNoteColor)

Router.post('/updateNoteTemplate/:id',updateNoteTemplate)

Router.post('/updateNoteCanvas/:id',updateNoteCanvas)

Router.post('/register',userImgUploader.single('img'),registerUser)

Router.post('/login',login)

Router.get('/refreshToken',refreshToken)

Router.get('/getUserData',verifyToken,getUserData)

Router.delete('/logout',logout)

Router.post('/resetPassword',resetPassword)

Router.get('/joinWithCode/:code',verifyToken,joinWithCode)

Router.post('/compareNotePassword',compareNotePassword)

Router.post('/createNote',createNote)

export default Router