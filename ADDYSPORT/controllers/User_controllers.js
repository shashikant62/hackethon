const {User_model}=require('../models/User_models');
const {Sport_model}=require('../models/Sport_models');
//REGISTRATION
exports.ResgisterUser=async (req,res)=>{
    try {
        let {name,email,password,location}=req.body;
        let findalredyregister=await User_model.findOne({email});
        // console.log(findalredyregister);
        if(findalredyregister){
            return res.status(400).json({
                success:true,
                message:"User alredy exists",
            })
        }
        else{
        findalredyregister=await User_model.create({name,email,password,location})
        const option={expires:new Date(Date.now()+24*60*60*1000),
            httpOnly:true}
        let token=await findalredyregister.generateToken();
                res.status(200).cookie('token',token,option).json({
                    success:true,
                    message:"login",
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error is:"+error,
        })
    }
}

//LOGIN
exports.Login_Controllers=async(req,res)=>{
    try {
        const{email,password}=req.body;
        let find_login=await User_model.findOne({email}).select("+password");
        // console.log(find_login);
        if(!find_login){
            res.status(300).json({
                success:false,
                message:"not registerd yet"
            })
        }
        let matchpassword=await find_login.matchpassword(password);
        if(!matchpassword){
            res.status(400).json({
                success:false,
                message:"password incorrect"
            })
        }
        const option={expires:new Date(Date.now()+24*60*60*1000),
        httpOnly:true}
        let token=await find_login.generateToken();
            res.status(200).cookie('token',token,option).json({
                success:true,
                message:"login",
                find_login,
                token
            })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error"+error,
        })
    }
}


//LOGOUT
exports.Logoutapp=(req,res)=>{
    try {
        res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true}).json({
            success:true,
            message:"logout succesfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error"+error,
        })
    }
}

//JOINMYGROUP
// exports.Joinmygroup=(req,res)=>{
//     try {
        
//     } catch (error) {
//         res.status(500).json({
//             success:false,
//             message:"error"+error,
//         })
//     }
// }

//JOINEDGROUP
exports.Joinedgroup=async(req,res)=>{
    try {
        const findchannel=await Sport_model.findById(req.params.id);
        const follower=await User_model.findById(req.user._id);
        // console.log(findchannel);
        // console.log(follower);
        if(!findchannel){
            return res.status(401).json({
                success:false,
                message:"group not exits",
            })
        }
        if(findchannel.userjoin.includes(follower._id) && follower.userjoingroup.includes(findchannel._id)){
            const indexa=findchannel.userjoin.indexOf(follower._id);
            const indexb=follower.userjoingroup.indexOf(findchannel._id);
            findchannel.userjoin.splice(indexa,1);
            follower.userjoingroup.splice(indexb,1);
            findchannel.save();
            follower.save();
            res.status(200).json({
                success:true,
                message:"unfollow group",
            })
        }
        else{
            findchannel.userjoin.push(follower._id);
            follower.userjoingroup.push(findchannel._id);
            findchannel.save();
            follower.save();
            res.status(200).json({
                success:true,
                message:"follow group",
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error"+error,
        })
    }
}

//getusers
exports.getusers=async(req,res)=>{
    try {
        const follower=await User_model.find();
        res.status(200).json({
            success:true,
            message:follower
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"error"+error,
        })
    }
}