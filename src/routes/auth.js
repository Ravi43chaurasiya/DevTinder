const express = require("express");
const {validateSignUpData}=require("../utils/validation");
const bcrypt=require("bcrypt");
const User=require("../models/user");

const authRouter=express.Router();

authRouter.post("/signup",async(req,res)=>{
  
  try{
    const {firstName,lastName,emailId,password,age,gender,photoUrl,about,skills}=req.body;
    // validation of data
  validateSignUpData(req);
 
  // Encrypt the Password
  const passwordHash=await bcrypt.hash(password,10)
  console.log(passwordHash);
  const user=new User({
    firstName,lastName,emailId,password:passwordHash,age,gender,photoUrl,about,skills
  });
  
    await user.save();
    res.send(user);
  }
  catch(err){
    res.status(400).send("error: "+ err.message);
  }
 
})

authRouter.post("/login",async(req,res)=>{
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
       
      //Add the token to cokkie and  send the respose back to the user.
      res.cookie("token",token,{expires:new Date(Date.now()+ 8 * 360000)});


      res.send(user);
    }
    else{
      throw new Error("invalid password!");
    }
  }
  catch(err){
    res.status(400).send("error: "+ err.message);
  }
})

authRouter.post("/logout",async(req,res)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now())
  })
  res.send("logout successfull!");
})



module.exports=authRouter;