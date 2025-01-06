import express from 'express'
import {isCheck, reportItem} from '../controllers/userController.js'
import upload from '../middleweares/multer.js'

const userRouter = express.Router()

userRouter.post('/confirm-data', upload.single('image'), isCheck)
userRouter.post('/report', upload.fields([{name: 'image1', maxCount:1},{name: 'image2', maxCount:1},{name: 'image3', maxCount:1}]), reportItem)

export default userRouter