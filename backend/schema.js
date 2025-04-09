const mongoose =require('mongoose');
let userenquiry=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    message:{
        type:String,
        required:true
    }
});

let Enquirymodel = mongoose.model("enquiry",userenquiry)
module.exports=Enquirymodel;