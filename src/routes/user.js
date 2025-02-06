const express=require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter=express.Router();

userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
  try {
    const loggedInUser=req.user;
    const safeData="firstName lastName photoUrl age gender about skills";
    const connectionRequests=await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",

        }).populate("fromUserId", safeData);

    res.json({
      message:"Data fetched successfully",
      data: connectionRequests
    })    
    
  } catch (error) {
    res.status(400).send("Error : "+ error.message);
    
  }
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
  try {
    const loggedInUser=req.user;
    const safeData="firstName lastName photoUrl age gender about skills";
    const connections=await ConnectionRequest.find({
      $or:[
        {
          toUserId:loggedInUser._id,status:"accepted"
        },
        {
          fromUserId:loggedInUser._id,
          status:"accepted"
        }
      ]

    }).populate("fromUserId",safeData)
    .populate("toUserId",safeData);

    const data=connections.map((row)=>{
      if(row.fromUserId._id==loggedInUser._id){
        return row.toUserId;
      }

      return row.fromUserId;
    })

    res.json({data:data});
    
  } catch (error) {
    res.status(400).send("Error : "+ error.message);
  }
})


module.exports=userRouter;