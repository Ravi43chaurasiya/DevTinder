const express = require("express");
const connectDB=require("./config/database")
const User=require("./models/user");
const app = express();

app.post("/signup",async(req,res)=>{
  const userObj={
    firstName:"Rahul",
    lastName:"Chaurasiya",
    emailId:"rahul@chaurasiya.com",
    password:"rahul@321"
  }
  const user=new User(userObj);
  try{
    await user.save();
    res.send(user);
  }
  catch(err){
    res.status(400).send("error saving database");
  }
 
})

 










connectDB().then(()=>{
  console.log("Database connection is successfull")
  app.listen(3000, () => {
    console.log("server is running successfully on port 3000...");
  });
})
.catch((err)=>{
  console.error("database can not be connected");
})


