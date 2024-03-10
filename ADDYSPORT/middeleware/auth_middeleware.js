const {User_model}=require('../models/User_models');
const jwttoken=require('jsonwebtoken');

exports.IsAuthentication=async(req,res,next)=>{
   try {
    const {token}=req.cookies;
    // console.log(token);
    if(!token){
        return res.status(401).json({
            message:"login first please isquth"
        })
    }
    const decode=await jwttoken.verify(token,process.env.SECRETE_JWTKEY)
    req.user=await User_model.findById(decode._id);
    next();
   } catch (error){
    res.status(501).json({
        message:`error=${error}`,
    })
   }
}