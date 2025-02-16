import express from 'express'
import {isCheck, replyItem, reportItem, reportWeekItem, clientReadDB} from '../controllers/userController.js'
import upload from '../middleweares/multer.js'

const userRouter = express.Router()

userRouter.post('/confirm-data', upload.single('image'), isCheck)
userRouter.post('/report', upload.fields([{name: 'image1', maxCount:1},{name: 'image2', maxCount:1},{name: 'image3', maxCount:1}]), reportItem)
userRouter.post('/week-report', upload.fields([{name: 'image1', maxCount:1},{name: 'image2', maxCount:1},{name: 'image3', maxCount:1}]), reportWeekItem)
userRouter.post('/reply', upload.fields([{name: 'image1', maxCount:1},{name: 'image2', maxCount:1},{name: 'image3', maxCount:1}]), replyItem)
userRouter.post('/clientReadData', upload.single('image'), clientReadDB)

export default userRouter
