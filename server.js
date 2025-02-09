import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import adminRouter from './routes/adminRoute.js'
import userRouter from './routes/userRoute.js'
import connectCloudinary from './config/cloudinary.js'

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
})

app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

app.get('/',(req,res)=>{
    res.send('api working')
})

// app.listen(port, ()=>console.log('server started', port))
export default app;
