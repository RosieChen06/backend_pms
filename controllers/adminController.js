import riderWeekModel from "../models/byWeek.js"
import riderModel from "../models/riderModel.js"

const addRecord = async(req, res)=>{
    try{
        const {phone, name, date, is_garantee, sp2_1, sp2_1_is_servicce_bonus, sp2_1_serve_type, sp2_1_onhold,
            sp2_1_ttl_delivered, sp2_1_delivered, sp2_1_remaindelivering, sp2_1_sop, sp2_1_appsheet,
            sp2_2, sp2_2_is_servicce_bonus, sp2_2_serve_type, sp2_2_onhold, sp2_2_ttl_delivered, sp2_2_delivered,
            sp2_2_remaindelivering, sp2_2_sop, sp2_2_appsheet, sp2_3, sp2_3_is_servicce_bonus, sp2_3_serve_type,
            sp2_3_onhold, sp2_3_ttl_delivered, sp2_3_delivered, sp2_3_remaindelivering, sp2_3_sop, sp2_3_appsheet, 
            sp2_attendance, weeknum, ttl_delivered, ttl_worksday, ttl_workday_weekend, seq, epod_lost, uncleanCnt, epod, lost_cnt, is_online_bonus} = req.body
        const riderData = {
            phone,
            name,
            date,
            is_garantee,
            sp2_1,
            sp2_1_is_servicce_bonus,
            sp2_1_serve_type,
            sp2_1_onhold,
            sp2_1_ttl_delivered,
            sp2_1_delivered,
            sp2_1_remaindelivering,
            sp2_1_sop,
            sp2_1_appsheet,
            sp2_2,
            sp2_2_is_servicce_bonus,
            sp2_2_serve_type,
            sp2_2_onhold,
            sp2_2_ttl_delivered,
            sp2_2_delivered,
            sp2_2_remaindelivering,
            sp2_2_sop,
            sp2_2_appsheet,
            sp2_3,
            sp2_3_is_servicce_bonus,
            sp2_3_serve_type,
            sp2_3_onhold,
            sp2_3_ttl_delivered,
            sp2_3_delivered,
            sp2_3_remaindelivering,
            sp2_3_sop,
            sp2_3_appsheet,
            sp2_attendance,
            weeknum,
            epod, 
            lost_cnt
        }

        const newRecord = new riderModel(riderData)
        await newRecord.save()

        const isExist = await riderWeekModel.find({weeknum:weeknum, name:name})
        console.log(weeknum)
        console.log(isExist.length)
        if(isExist.length===0){
            const riderData2 = {
                phone,
                name,
                ttl_delivered,
                ttl_worksday,
                ttl_workday_weekend,
                seq,
                epod_lost,
                weeknum,
                uncleanCnt,
                is_online_bonus
            }
                
            const newRecord2 = new riderWeekModel(riderData2)
            await newRecord2.save()
        }

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

const readWeekDB = async(req, res) => {
    try{
        const weekData = await riderWeekModel.find({})
        res.json({success:true, weekData})
        console.log('success')

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const updateDB = async(req, res) => {
    try{

        const { riderId, sp2_1_appsheet, sp2_1_epod, sp2_1_sop, sp2_2_appsheet, sp2_2_epod, sp2_2_sop, sp2_3_appsheet, sp2_3_epod, sp2_3_sop, sp2_attendance, admincomment, status} = req.body
        await riderModel.findByIdAndUpdate(riderId, {sp2_1_appsheet, sp2_1_epod, sp2_1_sop, sp2_2_appsheet, sp2_2_epod, sp2_2_sop, sp2_3_appsheet, sp2_3_epod, sp2_3_sop, sp2_attendance, admincomment, status})
        res.json({success:true, message:"Updated Successful"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {addRecord, readDB, updateDB, readWeekDB}