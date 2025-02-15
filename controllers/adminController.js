import riderWeekModel from "../models/byWeek.js"
import riderModel from "../models/riderModel.js"

const addRecord = async(req, res)=>{
    try{
        const {phone, name, date, is_garantee, sp2_1, sp2_1_is_servicce_bonus, sp2_1_serve_type, sp2_1_onhold,
            sp2_1_ttl_delivered, sp2_1_delivered, sp2_1_remaindelivering, sp2_1_sop, sp2_1_appsheet, sp2_1_assign_delivered,
            sp2_2, sp2_2_is_servicce_bonus, sp2_2_serve_type, sp2_2_onhold, sp2_2_ttl_delivered, sp2_2_delivered, sp2_2_assign_delivered,
            sp2_2_remaindelivering, sp2_2_sop, sp2_2_appsheet, sp2_3, sp2_3_is_servicce_bonus, sp2_3_serve_type, sp2_3_assign_delivered,
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
            sp2_1_assign_delivered,
            sp2_1_remaindelivering,
            sp2_1_sop,
            sp2_1_appsheet,
            sp2_2,
            sp2_2_is_servicce_bonus,
            sp2_2_serve_type,
            sp2_2_onhold,
            sp2_2_ttl_delivered,
            sp2_2_delivered,
            sp2_2_assign_delivered,
            sp2_2_remaindelivering,
            sp2_2_sop,
            sp2_2_appsheet,
            sp2_3,
            sp2_3_is_servicce_bonus,
            sp2_3_serve_type,
            sp2_3_onhold,
            sp2_3_ttl_delivered,
            sp2_3_delivered,
            sp2_3_assign_delivered,
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

const massiveRecordUpload = async(req, res)=>{
    try{
        const {dataset} = req.body

        for(let i=0; i<JSON.parse(dataset).length; i++){
            const isExist_0 = await riderModel.find({name:JSON.parse(dataset)[i].name, date:JSON.parse(dataset)[i].date})
            if(isExist_0.length===0){
                const riderData = {
                    phone: JSON.parse(dataset)[i].phone,
                    name: JSON.parse(dataset)[i].name,
                    date: JSON.parse(dataset)[i].date,
                    is_garantee: JSON.parse(dataset)[i].is_garantee,
                    sp2_1: JSON.parse(dataset)[i].sp2_1,
                    sp2_1_is_servicce_bonus: JSON.parse(dataset)[i].sp2_1_is_servicce_bonus,
                    sp2_1_serve_type: JSON.parse(dataset)[i].sp2_1_serve_type,
                    sp2_1_onhold: JSON.parse(dataset)[i].sp2_1_onhold,
                    sp2_1_ttl_delivered: JSON.parse(dataset)[i].sp2_1_ttl_delivered,
                    sp2_1_assign_delivered: JSON.parse(dataset)[i].sp2_1_assign_delivered,
                    sp2_1_delivered: JSON.parse(dataset)[i].sp2_1_delivered,
                    sp2_1_remaindelivering: JSON.parse(dataset)[i].sp2_1_remaindelivering,
                    sp2_1_sop: JSON.parse(dataset)[i].sp2_1_sop,
                    sp2_1_appsheet: JSON.parse(dataset)[i].sp2_1_appsheet,
                    sp2_2: JSON.parse(dataset)[i].sp2_2,
                    sp2_2_is_servicce_bonus: JSON.parse(dataset)[i].sp2_2_is_servicce_bonus,
                    sp2_2_serve_type: JSON.parse(dataset)[i].sp2_2_serve_type,
                    sp2_2_onhold: JSON.parse(dataset)[i].sp2_2_onhold,
                    sp2_2_ttl_delivered: JSON.parse(dataset)[i].sp2_2_ttl_delivered,
                    sp2_2_assign_delivered: JSON.parse(dataset)[i].sp2_2_assign_delivered,
                    sp2_2_delivered: JSON.parse(dataset)[i].sp2_2_delivered,
                    sp2_2_remaindelivering: JSON.parse(dataset)[i].sp2_2_remaindelivering,
                    sp2_2_sop: JSON.parse(dataset)[i].sp2_2_sop,
                    sp2_2_appsheet: JSON.parse(dataset)[i].sp2_2_appsheet,
                    sp2_3: JSON.parse(dataset)[i].sp2_3,
                    sp2_3_is_servicce_bonus: JSON.parse(dataset)[i].sp2_3_is_servicce_bonus,
                    sp2_3_serve_type: JSON.parse(dataset)[i].sp2_3_serve_type,
                    sp2_3_onhold: JSON.parse(dataset)[i].sp2_3_onhold,
                    sp2_3_ttl_delivered: JSON.parse(dataset)[i].sp2_3_ttl_delivered,
                    sp2_3_assign_delivered: JSON.parse(dataset)[i].sp2_3_assign_delivered,
                    sp2_3_delivered: JSON.parse(dataset)[i].sp2_3_delivered,
                    sp2_3_remaindelivering: JSON.parse(dataset)[i].sp2_3_remaindelivering,
                    sp2_3_sop: JSON.parse(dataset)[i].sp2_3_sop,
                    sp2_3_appsheet: JSON.parse(dataset)[i].sp2_3_appsheet,
                    sp2_attendance: JSON.parse(dataset)[i].sp2_attendance,
                    weeknum: JSON.parse(dataset)[i].weeknum,
                    epod: JSON.parse(dataset)[i].epod, 
                    lost_cnt: JSON.parse(dataset)[i].lost_cnt
                }
                const newRecord = new riderModel(riderData)
                await newRecord.save()
            }

            const isExist = await riderWeekModel.find({weeknum:JSON.parse(dataset)[i].weeknum, name:JSON.parse(dataset)[i].name})

            if(isExist.length===0){
                const riderData2 = {
                    phone: JSON.parse(dataset)[i].phone,
                    name: JSON.parse(dataset)[i].name,
                    ttl_delivered: JSON.parse(dataset)[i].ttl_delivered,
                    ttl_worksday: JSON.parse(dataset)[i].ttl_worksday,
                    ttl_workday_weekend: JSON.parse(dataset)[i].ttl_workday_weekend,
                    seq: JSON.parse(dataset)[i].seq,
                    epod_lost: JSON.parse(dataset)[i].epod_lost,
                    weeknum: JSON.parse(dataset)[i].weeknum,
                    uncleanCnt: JSON.parse(dataset)[i].uncleanCnt,
                    is_online_bonus: JSON.parse(dataset)[i].is_online_bonus,
                }
                    
                const newRecord2 = new riderWeekModel(riderData2)
                await newRecord2.save()
            }
        }  

        res.json({success:true, message:'Record Saved'})
        
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// const readDB = async(req, res) => {
//     try{
//         const explainResult = await riderModel.find({}).explain("executionStats");
//         console.log("🔍 查詢分析結果:");
//         console.dir(explainResult, { depth: null });
//         const riders = await riderModel.find({})
//         res.json({success:true, riders})

//     }catch(error){
//         console.log(error)
//         res.json({success:false, message:error.message})
//     }
// }

const today = new Date();

// 計算當月、上月、下月
const getMonthYear = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}/${month}`;
};
// 上個月
const prevMonth = new Date(today);
prevMonth.setMonth(today.getMonth() - 1);

const readDB = async(req, res) => {
    try{
        const currentMonthYear = getMonthYear(new Date());
        const prevMonthYear = getMonthYear(prevMonth);
        const explainResult = await riderModel.find({$or: [
        { date: { $regex: "^2025/1" } }
    ]}).explain("executionStats");
        console.log("🔍 查詢分析結果:");
        console.dir(explainResult, { depth: null });
        const riders = await riderModel.find({$or: [
        { date: { $regex: "^2025/1" } }
    ]});
        res.json({success:true, riders})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const deleteDB = async(req, res) => {
    const {riderId} = req.body
    try{
        const data = await riderModel.findByIdAndDelete(riderId)
        res.json({success:true, data})
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const deleteAll = async(req, res) => {
    const {riderId, riderWeekId} = req.body
    try{
        const data = await riderModel.findByIdAndDelete(riderId)
        const weekData = await riderWeekModel.findByIdAndDelete(riderWeekId)
        res.json({success:true, message:"Delete Successful"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const readWeekDB = async(req, res) => {
    try{
        const weekData = await riderWeekModel.find({})
        res.json({success:true, weekData})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const updateDB = async(req, res) => {
    try{

        const { riderId, sp2_1_remaindelivering, sp2_1_onhold, sp2_1_delivered, sp2_1_serve_type, sp2_1_appsheet, sp2_1_epod, sp2_1_sop, sp2_2_remaindelivering, sp2_2_onhold, sp2_2_delivered, sp2_2_serve_type,  sp2_2_appsheet, sp2_2_epod, sp2_2_sop, sp2_3_remaindelivering, sp2_3_onhold, sp2_3_delivered, sp2_3_serve_type,  sp2_3_appsheet, sp2_3_epod, sp2_3_sop, sp2_attendance, admincomment, status, dayAdjust, riderWeekId, uncleanCnt} = req.body
        await riderModel.findByIdAndUpdate(riderId, {sp2_1_remaindelivering, sp2_1_onhold, sp2_1_delivered, sp2_1_serve_type, sp2_1_appsheet, sp2_1_epod, sp2_1_sop, sp2_2_remaindelivering, sp2_2_onhold, sp2_2_delivered, sp2_2_serve_type,  sp2_2_appsheet, sp2_2_epod, sp2_2_sop, sp2_3_remaindelivering, sp2_3_onhold, sp2_3_delivered, sp2_3_serve_type,  sp2_3_appsheet, sp2_3_epod, sp2_3_sop, sp2_attendance, admincomment, status})
        for(let i=0; i<JSON.parse(dayAdjust).length; i++){
            await riderModel.findByIdAndUpdate(JSON.parse(dayAdjust)[i].id, {
                is_garantee: JSON.parse(dayAdjust)[i].is_garantee,
                sp2_1_is_servicce_bonus: JSON.parse(dayAdjust)[i].sp2_1_service_bonus,
                sp2_2_is_servicce_bonus: JSON.parse(dayAdjust)[i].sp2_2_service_bonus,
                sp2_3_is_servicce_bonus: JSON.parse(dayAdjust)[i].sp2_3_service_bonus,
            })
        }
        await riderWeekModel.findByIdAndUpdate(riderWeekId, {uncleanCnt})
        res.json({success:true, message:"Updated Successful"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const updateStatus = async(req, res) => {
    try{

        const { riderId, status} = req.body
        await riderModel.findByIdAndUpdate(riderId, {status})

        res.json({success:true, message:"Updated Successful"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const updateWeekDB = async(req, res) => {
    try{

        const { riderWeekId, ttl_delivered, ttl_worksday, ttl_workday_weekend, seq, epod_lost, is_online_bonus, admincomment, status} = req.body

        await riderWeekModel.findByIdAndUpdate(riderWeekId, {ttl_delivered, ttl_worksday, ttl_workday_weekend, seq, epod_lost, is_online_bonus, admincomment, status})
        res.json({success:true, message:"Updated Successful"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const missingParcelRegistration = async(req, res) => {
    try{

        const {riderId, riderWeekId, is_garantee, sp2_1_is_servicce_bonus, sp2_2_is_servicce_bonus, sp2_3_is_servicce_bonus, is_online_bonus, day_lost_cnt, week_lost_cnt} = req.body

        await riderModel.findByIdAndUpdate(riderId, {is_garantee, sp2_1_is_servicce_bonus, sp2_2_is_servicce_bonus, sp2_3_is_servicce_bonus, lost_cnt: day_lost_cnt})
        await riderWeekModel.findByIdAndUpdate(riderWeekId, {is_online_bonus, lost_cnt: week_lost_cnt})
        res.json({success:true, message:"Updated Successful"})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export {addRecord, readDB, updateDB, readWeekDB, updateWeekDB, missingParcelRegistration, massiveRecordUpload, deleteDB, deleteAll, updateStatus}
