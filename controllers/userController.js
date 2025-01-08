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

export {isCheck, reportItem}