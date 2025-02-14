import express from 'express'
import {addRecord, deleteAll, deleteDB, massiveRecordUpload, missingParcelRegistration, readDB, readWeekDB, updateDB, updateStatus, updateWeekDB} from '../controllers/adminController.js'
import upload from '../middleweares/multer.js'

const adminRouter = express.Router()

adminRouter.post('/add-data', upload.single('image'), addRecord)
adminRouter.get('/all-rider',readDB)
adminRouter.get('/week-data',readWeekDB)
adminRouter.post('/update-data', upload.single('image'), updateDB)
adminRouter.post('/update-weekdata', upload.single('image'), updateWeekDB)
adminRouter.post('/missing-parcel', upload.single('image'), missingParcelRegistration)
adminRouter.post('/massive-upload', upload.single('image'), massiveRecordUpload)
adminRouter.post('/delete', upload.single('image'), deleteDB)
adminRouter.post('/all-delete', upload.single('image'), deleteAll)
adminRouter.post('/update-status', upload.single('image'), updateStatus)

export default adminRouter
