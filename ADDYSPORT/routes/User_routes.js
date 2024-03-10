const express=require('express');
const router=express.Router();
const {ResgisterUser, Login_Controllers, Logoutapp, Joinedgroup,getusers}=require("../controllers/User_controllers");
const {IsAuthentication}=require('../middeleware/auth_middeleware')
router.route('/user/register').post(ResgisterUser);
router.route('/user/login').post(Login_Controllers);
router.route('/user/logout').get(IsAuthentication,Logoutapp);
router.route('/user/getusers').get(IsAuthentication,getusers);
router.route('/user/joingroup/:id').get(IsAuthentication,Joinedgroup);
module.exports=router;