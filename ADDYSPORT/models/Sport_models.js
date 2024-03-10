const mongoose=require('mongoose');
const Sportschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    caption:{
        type:String,
        required:true,
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User_models"
    },
    userjoin:[{
            type:mongoose.Schema.ObjectId,
            ref:"User_models",
    }],
    comments:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User_models"
        },
        comment:{
            type:String,
        }
    }]
})

exports.Sport_model=new mongoose.model("Sport_model",Sportschema)