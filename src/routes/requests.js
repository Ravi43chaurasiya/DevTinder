const express=require("express");
const {userAuth}=require("../middleware/auth");

const requestsRouter=express.Router();
requestsRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
  const user=req.user;

  // sending a connection request
  console.log("sending a connection request!");

  res.send(user.firstName + " sent the connection request!");
})

module.exports=requestsRouter;