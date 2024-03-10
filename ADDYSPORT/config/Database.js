const mongoose=require('mongoose');
exports.Databaseconnection=()=>{
    mongoose.connect(`${process.env.MONGO_URL}`).then((con)=>{
        console.log('mongo connect '+`${con.connection.host}`);
    }).catch((err)=>{
        console.log('erroe'+err);
    })
}