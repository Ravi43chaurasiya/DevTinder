const express = require("express");
const connectDB=require("./config/database")
const User=require("./models/user");
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
const req = require("express/lib/request");
const { cookie } = require("express/lib/response");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middleware/auth");

const app = express();
app.use(express.json())
app.use(cookieParser());
app.post("/signup",async(req,res)=>{
  
  try{
    const {firstName,lastName,emailId,password}=req.body;
    // validation of data
  validateSignUpData(req);
 
  // Encrypt the Password
  const passwordHash=await bcrypt.hash(password,10)
  console.log(passwordHash);
  const user=new User({
    firstName,lastName,emailId,password:passwordHash
  });
  
    await user.save();
    res.send(user);
  }
  catch(err){
    res.status(400).send("error: "+ err.message);
  }
 
})
// Login Api
app.post("/login",async(req,res)=>{
  try{
    const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credential!");
    }
    const isPasswordValid=await user.validatePassword(password);
    if(isPasswordValid){
      //Create a JWT Token
        const token=await user.getJWT()
        console.log(token);
      //Add the token to cokkie and  send the respose back to the user.
      res.cookie("token",token,{expires:new Date(Date.now()+ 8* 36000)});


      res.send("Login Successfull");
    }
    else{
      throw new Error("invalid credential!");
    }
  }
  catch(err){
    res.status(400).send("error: "+ err.message);
  }
})

app.get("/profile",userAuth,async(req,res)=>{
  try{
   const user=req.user;

  res.send(user);
  }
  catch(err){
    res.status(400).send("error: "+ err.message);
  }
  
})

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
  const user=req.user;

  // sending a connection request
  console.log("sending a connection request!");

  res.send(user.firstName + " sent the connection request!");
})


// API- get user by email
app.get("/user",async(req,res)=>{
  const userEmail=req.body.emailId;
  try{
    
    const users= await User.findOne({emailId:userEmail});
    if(users.length===0){
      res.status(404).send("User not found");
    }
    else{
      res.send(users);
    }
  }
  catch(err){
    res.status(404).send("Something went wrong!");
  }

})

app.get("/feed",async(req,res)=>{

  try{
    const users=await User.find({});
    res.send(users);
  }
  catch(err){
    res.status(404).send("Something went wrong!");
  }
})
app.get("/userById",async(req,res)=>{
  try{
    const user=await User.findById(req.body._id);
    res.send(user);
  }
  catch(err){
    res.status(404).send("Something went wrong!");
  }
})
// delete a user from database
app.delete("/user",async(req,res)=>{
  const userId=req.body._id;
  try{
    await User.findByIdAndDelete(userId);
    res.send("user has been deleted")
  }
  catch(err)
  {
    res.status(404).send("Something went wrong!");
  }
})

// API- update a User

app.patch("/user/:userId",async(req,res)=>{
  const userid=req.params?.userId;
  const data=req.body;
  try{
    const ALLOWED_UPDATES=["photourl","about","gender","age","skills"];
    const isUpdateAllowed=Object.keys(data).every((k)=>{
      return ALLOWED_UPDATES.includes(k);
    })
    if(!isUpdateAllowed){
      throw new Error("update not allowed")
    }
    if(data.skills.length>10){
      throw new Error("more than skills can not be inserted!")
    }
    const user=await User.findByIdAndUpdate(userid,data,{runValidators:true,upsert:true,returnDocument:"after"});
    console.log(user);
    res.send("user has been updated");
  }
  catch(err)
  {
    
    res.status(404).send("Something went wrong!" + err.message);
  }
})
 










connectDB().then(()=>{
  User.syncIndexes();
  console.log("Database connection is successfull")
  app.listen(3000, () => {
    console.log("server is running successfully on port 3000...");
  });
})
.catch((err)=>{
  console.error("database can not be connected");
})


