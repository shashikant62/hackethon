const app=require('./app');
const {Databaseconnection}=require('./config/Database')
Databaseconnection();
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server running ${port}....`)
})