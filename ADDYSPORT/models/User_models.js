const mongoose=require('mongoose');
const bycrypt=require('bcrypt');
const jsonwebtoken=require('jsonwebtoken');
const Userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:[true,"enter email"],
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        require:true,
    },
    skill:{
        type:Number,
        min:0,
        max:5,
        default:2
    },
    Sportactivities:[{
        type:String,
        required:true
    }],
    userselfgroup:[{
        type:mongoose.Schema.ObjectId,
        ref:"Sport_models"
    }],
    personalfriend:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User_models"
        },
        comment:{
            type:String,
        }
    }],
    userjoingroup:[{
        type:mongoose.Schema.ObjectId,
        ref:"Sport_models"
    }],
})
//hash password
Userschema.pre("save",async function(next){
    if(this.isModified('password')){
    this.password=await bycrypt.hash(this.password,10);
    }
    else{
    next();}
})

//matchpass
Userschema.methods.matchpassword=async function(password){
    console.log(await bycrypt.compare(password,this.password))
    return await bycrypt.compare(password,this.password);
}

//generatetokrn
Userschema.methods.generateToken=async function(){
    return await jsonwebtoken.sign({_id:this._id},process.env.SECRETE_JWTKEY)//do not share any one secrete 
}

exports.User_model=new mongoose.model("User_mode",Userschema)