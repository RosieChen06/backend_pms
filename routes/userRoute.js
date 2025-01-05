import express from 'express'
import {isCheck, reportItem} from '../controllers/userController.js'
import upload from '../middleweares/multer.js'

const userRouter = express.Router()

userRouter.post('/confirm-data', upload.single('image'), isCheck)
userRouter.post('/report', upload.single('image'), reportItem)

export default userRouter