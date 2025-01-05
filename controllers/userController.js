import riderModel from "../models/riderModel.js"

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

        const { riderId, status, reportItem} = req.body
        await riderModel.findByIdAndUpdate(riderId, {status, reportItem})
        res.json({success:true, message:"已提交回報"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {isCheck, reportItem}