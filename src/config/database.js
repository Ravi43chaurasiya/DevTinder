const mongoose=require("mongoose");


const connectDB=async()=>{
await mongoose.connect("mongodb+srv://ravi8601150552:A09rkXvro3piYine@cluster0.tzrlbey.mongodb.net/devTinder");

}

module.exports=connectDB;

