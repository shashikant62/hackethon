const {Sport_model}=require('../models/Sport_models');
const {User_model}=require('../models/User_models');

//CREATEGROUP
exports.Creategroup=async(req,res)=>{
    try {
        let Sportdata={
            name:req.body.name,
            caption:req.body.caption,
            owner:req.user._id,
        }
        const createsport=await Sport_model.create(Sportdata);
        const findid=await req.user._id;
        const User=await User_model.findById(findid);
        console.log(User);
        await User.userselfgroup.push(createsport._id);
        await User.save();
        res.status(200).json({
            succes:true,
            message:"correct post",
            post:createsport
        })
    } catch (error) {
        res.status(500).json({
            succes:false,
            message:"error"+error,
        })
    }
}

//DELETE group
exports.Deletegroup=async (req,res)=>{
    try {
        let group=await Sport_model.findById(req.params.id);
        if(!group){
            return res.status(401).json({
                succes:false,
                message:"Incorrect post"
            })
        }
        if(group.owner._id.toString()!==req.user._id.toString()){
            return res.status(401).json({
                succes:false,
                message:"Incorrect post"
            })
        }
        else{
            await Sport_model.deleteOne(group._id)
            return res.status(200).json({
                succes:true,
                message:"post delete"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"error is"+error,
            succes:false
        })
    }
}

//COMMENT OPTIONS
//IF YOU IN GROUP SEND THE MASSAGE 
//ELSE NO PERMISION TO END
//PUT
exports.Commentssend=async(req,res)=>{
    try {
        const sportfind=await Sport_model.findById(req.params.id);
        const valide=await User_model.findById(req.user._id);
        if(!sportfind){
            return res.status(401).json({
                succes:false,
                message:"Incorrect sport"
            })
        }
        if(!valide.userjoingroup.includes(sportfind._id)){
            return res.status(401).json({
                succes:false,
                message:"you are not in group"
            })
        }
        else{
            sportfind.comments.push({
                user:req.user._id,
                comment:req.body.comment,
            })
            await sportfind.save();
            return res.status(201).json({
                succes:true,
                message:"comment uploaded"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"error is"+error,
            succes:false
        })
    }
}
//GETSPORT OPTIONS

exports.Getserchsport=async(req,res)=>{
    try {
        const getfind=await Sport_model.find(req.body);
        if(!getfind){
            return res.status(401).json({
                succes:false,
                message:"not found"
            })
        }
        else{
            return res.status(200).json({
                succes:true,
                message:"get sports",
                getfind
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"error is"+error,
            succes:false
        })
    }
}
//DELETE COMMENT
//forgot pass