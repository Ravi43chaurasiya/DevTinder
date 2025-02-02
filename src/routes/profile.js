const express=require("express");
const {userAuth}=require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter=express.Router();
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
  try{
   const user=req.user;

  res.send(user);
  }
  catch(err){
    res.status(400).send("error: "+ err.message);
  }
  
})

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try {
    if(!validateEditProfileData(req)){
      throw new Error("invalid edit request!")
    }
    const loggedInUser=req.user;

    console.log(loggedInUser);

    Object.keys(req.body).forEach(key=>loggedInUser[key]=req.body[key])
    await loggedInUser.save();
    console.log(loggedInUser);
    res.send("profile updated successfully!")
    
  } catch (error) {
    res.status(400).send("Error: "+ error.message);
    
  }
})


module.exports=profileRouter;