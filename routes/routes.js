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
import getNotes from '../controllers/getNotes.js'
import deleteNote from '../controllers/deleteNote.js'
import updateNote from '../controllers/updateNote.js'
import updateUserPhoto from '../controllers/updateUserPhoto.js'
import updateUserName from '../controllers/updateUserName.js'
import deleteUserAccount from '../controllers/deleteUserAccount.js'
import checkResetPasswordTokenValidity from '../controllers/checkResetPasswordTokenValidity.js'

const Router = new express.Router()

Router.post('/boardImg',boardMediaUpload.single('img'),postBoardImg)

Router.get('/getBoardData/:id',verifyToken,getBoardData)

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

Router.post('/compareNotePassword',verifyToken,compareNotePassword)

Router.post('/createNote',createNote)

Router.get('/getNotes',verifyToken,getNotes)

Router.delete('/deleteNote/:id',verifyToken,deleteNote)

Router.put('/updateNote/:id',verifyToken,updateNote)

Router.put('/updateUserPhoto',verifyToken,userImgUploader.single('photo'),updateUserPhoto)

Router.put('/updateUserName',verifyToken,updateUserName)

Router.post('/deleteAccount',verifyToken,deleteUserAccount)

Router.get('/checkResetPasswordTokenValidity/:id',checkResetPasswordTokenValidity)

export default Router