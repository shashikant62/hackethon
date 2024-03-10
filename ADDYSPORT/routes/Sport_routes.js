const express=require('express');
const router=express.Router();
const { Creategroup, Deletegroup, Commentssend, Getserchsport }=require('../controllers/Sport_controllers');
const {IsAuthentication}=require('../middeleware/auth_middeleware')
router.route('/sport/create').post(IsAuthentication,Creategroup);
router.route("/sport/delete/:id").delete(IsAuthentication,Deletegroup);
router.route('/sport/comment/:id').post(IsAuthentication,Commentssend);
router.route('/sport/getname/:name').get(IsAuthentication,Getserchsport);
module.exports=router;