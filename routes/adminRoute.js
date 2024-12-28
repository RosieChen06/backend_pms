import express from 'express'
import {addRecord, readDB, updateDB} from '../controllers/adminController.js'
import upload from '../middleweares/multer.js'

const adminRouter = express.Router()

adminRouter.post('/add-data', upload.single('image'), addRecord)
adminRouter.get('/all-rider',readDB)
adminRouter.post('/update-data', upload.single('image'), updateDB)

export default adminRouter