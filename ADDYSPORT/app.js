const express=require('express');
require('dotenv').config({path:"./config/.env"});
const cors=require("cors");
const app=express(); 
const cookie_parser=require('cookie-parser');
const body_parser=require('body-parser');

//middlewares
app.use(express.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(cookie_parser());
app.use(cors());

//import routes
const Sport_routes=require('./routes/Sport_routes');
const User_routes=require('./routes/User_routes');

//Use routes
app.use('/api/v1',Sport_routes);
app.use('/api/v1',User_routes);


//error hadler
// app.user(notFound);
// app.user(errorHandler);
module.exports=app;