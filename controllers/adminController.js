import riderModel from "../models/riderModel.js"

const addRecord = async(req, res)=>{
    try{
        const {phone, name, date} = req.body
        const riderData = {
            phone,
            name, 
            date
        }

        const newRecord = new riderModel(riderData)
        await newRecord.save()

        res.json({success:true, message:'Record Saved'})
        
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const readDB = async(req, res) => {
    try{
        const riders = await riderModel.find({})
        res.json({success:true, riders})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const updateDB = async(req, res) => {
    try{

        const { riderId, date, name, is_garantee, smart_inbound_sop, is_report} = req.body
        await riderModel.findByIdAndUpdate(riderId, {name, date, is_garantee, smart_inbound_sop, is_report})
        res.json({success:true, message:"Updated Successful"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {addRecord, readDB, updateDB}