import mongoose from "mongoose";

const riderSchema = new mongoose.Schema({
    phone: {type:String, required:true},
    name:{type:String, required:true},
    date:{type:String, required:true},
    is_garantee:{type:String, required:true},
    sp2_1:{type:String, required:true},
    sp2_1_is_servicce_bonus:{type:String, required:true},
    sp2_1_serve_type:{type:String, required:true},
    sp2_1_remaindelivering:{type:String, required:true},
    sp2_1_onhold:{type:String, required:true},
    sp2_1_ttl_delivered:{type:String, required:true},
    sp2_1_delivered:{type:String, required:true},
    sp2_1_assign_delivered: {type:String, required:true},
    sp2_1_sop:{type:String, required:false},
    sp2_1_appsheet:{type:String, required:false},
    sp2_2:{type:String, required:false},
    sp2_2_is_servicce_bonus:{type:String, required:true},
    sp2_2_serve_type:{type:String, required:true},
    sp2_2_remaindelivering:{type:String, required:false},
    sp2_2_onhold:{type:String, required:true},
    sp2_2_ttl_delivered:{type:String, required:true},
    sp2_2_delivered:{type:String, required:true},
    sp2_2_assign_delivered: {type:String, required:true},
    sp2_2_sop:{type:String, required:false},
    sp2_2_appsheet:{type:String, required:false},
    sp2_3:{type:String, required:false},
    sp2_3_is_servicce_bonus:{type:String, required:true},
    sp2_3_serve_type:{type:String, required:true},
    sp2_3_remaindelivering:{type:String, required:false},
    sp2_3_onhold:{type:String, required:true},
    sp2_3_ttl_delivered:{type:String, required:true},
    sp2_3_delivered:{type:String, required:true},
    sp2_3_assign_delivered: {type:String, required:true},
    sp2_3_sop:{type:String, required:false},
    sp2_3_appsheet:{type:String, required:false},
    sp2_attendance:{type:String, required:false},
    status:{type:String, default:'submit'},
    epod:{type:String, required:false},
    lost_cnt: {type:Array, default:[]},
    reportItem:{type:Object, required:false},
    comment:{type: String, required:false},
    image:{type: Array, required:false},
    admincomment: {type: String, required:false},
    reportdatetime: {type: String, required:false},
    weeknum: {type: String, required:true},
})

riderSchema.index({ date: 1}); 

const riderModel = mongoose.models.riders || mongoose.model('riders', riderSchema)

export default riderModel
