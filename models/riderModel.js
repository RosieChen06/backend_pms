import mongoose from "mongoose";

const riderSchema = new mongoose.Schema({
    phone: {type:String, required:true},
    name:{type:String, required:true},
    date:{type:String, required:true},
    sp2_1:{type:String, required:true},
    sp2_1_remaindelivering:{type:String, required:true},
    sp2_1_sop:{type:String, required:false},
    sp2_1_appsheet:{type:String, required:false},
    sp2_1_epod:{type:String, required:false},
    sp2_2:{type:String, required:false},
    sp2_2_remaindelivering:{type:String, required:false},
    sp2_2_sop:{type:String, required:false},
    sp2_2_appsheet:{type:String, required:false},
    sp2_2_epod:{type:String, required:false},
    sp2_3:{type:String, required:false},
    sp2_3_remaindelivering:{type:String, required:false},
    sp2_3_sop:{type:String, required:false},
    sp2_3_appsheet:{type:String, required:false},
    sp2_3_epod:{type:String, required:false},
    sp2_attendance:{type:String, required:false},
    status:{type:String, default:'submit'},
    reportItem:{type:Object, required:false},
    comment:{type: String, required:false},
    image:{type: Array, required:false}
})

const riderModel = mongoose.models.rider || mongoose.model('rider', riderSchema)

export default riderModel