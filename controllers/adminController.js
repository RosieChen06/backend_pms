import riderModel from "../models/riderModel.js"

const addRecord = async(req, res)=>{
    try{
        const {phone, name, date, sp2_1, sp2_1_remaindelivering, sp2_1_sop, sp2_1_appsheet, sp2_1_epod, sp2_2, sp2_2_remaindelivering, sp2_2_sop, sp2_2_appsheet, sp2_2_epod, sp2_3, sp2_3_remaindelivering, sp2_3_sop, sp2_3_appsheet, sp2_3_epod, sp2_attendance} = req.body
        const riderData = {
            phone,
            name,
            date,
            sp2_1,
            sp2_1_remaindelivering,
            sp2_1_sop,
            sp2_1_appsheet,
            sp2_1_epod,
            sp2_2,
            sp2_2_remaindelivering,
            sp2_2_sop,
            sp2_2_appsheet,
            sp2_2_epod,
            sp2_3,
            sp2_3_remaindelivering,
            sp2_3_sop,
            sp2_3_appsheet,
            sp2_3_epod,
            sp2_attendance
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

        const { riderId, date, name, is_garantee, smart_inbound_sop, status} = req.body
        await riderModel.findByIdAndUpdate(riderId, {name, date, is_garantee, smart_inbound_sop, status})
        res.json({success:true, message:"Updated Successful"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {addRecord, readDB, updateDB}