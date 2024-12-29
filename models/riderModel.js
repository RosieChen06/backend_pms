import mongoose from "mongoose";

const riderSchema = new mongoose.Schema({
    phone: {type:String, required:true},
    name:{type:String, required:true},
    date:{type:String, required:true},
    is_report:{type:Boolean, default:false},
    is_confirmed:{type:Boolean, default:false}
})

const riderModel = mongoose.models.rider || mongoose.model('rider', riderSchema)

export default riderModel