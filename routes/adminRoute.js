import express from 'express'
import {addRecord, missingParcelRegistration, readDB, readWeekDB, updateDB, updateWeekDB} from '../controllers/adminController.js'
import upload from '../middleweares/multer.js'

const adminRouter = express.Router()

adminRouter.post('/add-data', upload.single('image'), addRecord)
adminRouter.get('/all-rider',readDB)
adminRouter.get('/week-data',readWeekDB)
adminRouter.post('/update-data', upload.single('image'), updateDB)
adminRouter.post('/update-weekdata', upload.single('image'), updateWeekDB)
adminRouter.post('/missing-parcel', upload.single('image'), missingParcelRegistration)

export default adminRouter