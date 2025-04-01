import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import adminRouter from './routes/adminRoute.js'
import userRouter from './routes/userRoute.js'
import connectCloudinary from './config/cloudinary.js'
import redis from 'redis'
import axios from 'axios'

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    password: process.env.REDIS_PASSWORD
});

redisClient.connect().catch(console.error);

app.use(express.json())
app.use(cors())

app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)

app.get('/',(req,res)=>{
    res.send('api working')
})

app.get('/api/data', async (req, res) => {
    try {
        // 從 Redis 取得快取
        const dayValue = await redisClient.get('dayData');
        const weekValue = await redisClient.get('weekData');

        // 如果 Redis 內有快取，回傳快取資料
        if (dayValue && weekValue) {
            console.log('✅ 使用 Redis 快取');
            return res.json({ 
                success: true, 
                dayData: JSON.parse(dayValue), 
                weekData: JSON.parse(weekValue) 
            });
        }

        console.log('❌ 無快取，請求 API');

        // 向 API 取得新資料
        const [dayResponse, weekResponse] = await Promise.all([
            axios.get('https://script.google.com/macros/s/AKfycbx-drlHbjO5h2Ks_UwTz51bX7_atvrZjMRA_SW6ZWRA7s9Mm_8Ebk_yOURZQMr4nbdz/exec'),
            axios.get('https://script.google.com/macros/s/AKfycbw1RwAEg0sGWUgG40s8v3lIxu_1ZEfrwub9oXka9JuzcMCX3a34fORX0UNRoFMFxxzs/exec')
        ]);

        const newDayData = dayResponse.data;
        const newWeekData = weekResponse.data;

        // 將新資料存入 Redis，快取 10 分鐘（600 秒）
        await redisClient.setEx('dayData', 600, JSON.stringify(newDayData));
        await redisClient.setEx('weekData', 600, JSON.stringify(newWeekData));

        console.log('✅ 成功存入 Redis');

        // 回傳 API 取得的新資料
        return res.json({ 
            success: false, 
            dayData: newDayData, 
            weekData: newWeekData 
        });

    } catch (error) {
        console.error('🚨 伺服器錯誤:', error);
        return res.status(500).json({ error: '伺服器錯誤' });
    }
});

// app.listen(port, ()=>console.log('server started', port))
export default app;
