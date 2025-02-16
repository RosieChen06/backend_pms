import riderWeekModel from "../models/byWeek.js"
import riderModel from "../models/riderModel.js"
import {v2 as cloudinary} from 'cloudinary'

const isCheck = async(req, res) => {
    try{

        const { riderId, status} = req.body
        await riderModel.findByIdAndUpdate(riderId, {status})
        res.json({success:true, message:"資料已確認"})


    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const reportItem = async(req, res) => {
    try{

        const { riderId, status, reportItem, comment, reportdatetime} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]

        const images = [image1, image2, image3].filter((item)=> item !== undefined)

        let imageUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url
            })
        )

        console.log(imageUrl)

        await riderModel.findByIdAndUpdate(riderId, {status, reportItem, comment, image: imageUrl, reportdatetime})
        res.json({success:true, message:"已提交回報"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const replyItem = async(req, res) => {
    try{

        const { riderId, status, comment, imageUrl1, imageUrl2, imageUrl3, type} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]

        const images = [image1, image2, image3].filter((item)=> item !== undefined)

        let imageUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url
            })
        )
        if(imageUrl1.startsWith('http')){
            imageUrl.push(imageUrl1)
        }
        if(imageUrl2.startsWith('http')){
            imageUrl.push(imageUrl2)
        }
        if(imageUrl3.startsWith('http')){
            imageUrl.push(imageUrl3)
        }

        if(type==='day'){
            await riderModel.findByIdAndUpdate(riderId, {status, comment, image: imageUrl})
        }else{
            await riderWeekModel.findByIdAndUpdate(riderId, {status, comment, image: imageUrl})
        }
        res.json({success:true, message:"已提交回復"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const clientReadDB = async(req, res) => {
    try{
        const {dateInput, riderInput} = req.body

        const dateConditions = Array.isArray(dateInput)
            ? dateInput.map(item => ({ date: { $regex: `^${item}`, $options: "i" } }))
            : ["2025/1/3"];
        const riderConditions = Array.isArray(riderInput)
            ? riderInput.map(item => ({ name: { $regex: `^${item}`, $options: "i" } }))
            : ["DT1041HD"];

        const query = {};

        if (dateConditions.length > 0) {
            query.$or = [...dateConditions];  // 查詢 date 欄位的條件
        }

        if (riderConditions.length > 0) {
            // 如果已有 $or 條件，則將 name 欄位的條件加到已有的 $or 中
            if (query.$or) {
                query.$or.push(...riderConditions); 
            } else {
                query.$or = [...riderConditions]; // 沒有 $or 條件則建立新的
            }
        }
        
        if (Object.keys(query).length === 0) {
            query._id = null;
        }

        const clientData = await riderModel.find(query);
        res.json({success:true, clientData})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const reportWeekItem = async(req, res) => {
    try{

        const { riderId, status, reportItem, comment} = req.body
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]

        const images = [image1, image2, image3].filter((item)=> item !== undefined)

        let imageUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url
            })
        )

        console.log(imageUrl)

        await riderWeekModel.findByIdAndUpdate(riderId, {status, reportItem, comment, image: imageUrl})
        res.json({success:true, message:"已提交回報"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {isCheck, reportItem, replyItem, reportWeekItem, clientReadDB}
