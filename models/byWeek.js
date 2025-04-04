import mongoose from "mongoose";

const riderWeekSchema = new mongoose.Schema({
    phone: {type:String, required:true},
    name:{type:String, required:true},
    ttl_delivered: {type:String, required:true},
    ttl_worksday: {type:String, required:true},
    ttl_workday_weekend: {type:String, required:true},
    seq: {type:String, required:true},
    epod_lost: {type:String, required:true},
    status:{type:String, default:'submit'},
    reportItem:{type:Object, required:false},
    comment:{type: String, required:false},
    image:{type: Array, required:false},
    admincomment: {type: String, required:false},
    reportdatetime: {type: String, required:false},
    weeknum: {type: String, required:true},
    uncleanCnt: {type: String, required:true},
    lost_cnt: {type: Array, required:false},
    is_online_bonus:{type: String, required:true},
})

const riderWeekModel = mongoose.models.riderbyweek || mongoose.model('riderbyweek', riderWeekSchema)

export default riderWeekModel