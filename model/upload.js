const mongoose=require('mongoose')
const new_schema=mongoose.Schema
const up=new new_schema({
    username:{
        required:false,
        type:String
    },
    message:{
        required:false,
        type:String
    },
    filepath:{
        required:false,
        type:String
    }
   , enrollno:{
        required:false,
        type:String
    }
},{versionKey:false})
const upload_mod=mongoose.model('uploads',up)
module.exports=upload_mod