const express=require("express");
const {userAuth}=require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestsRouter=express.Router();
requestsRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
  const user=req.user;

  // sending a connection request
  console.log("sending a connection request!");

  res.send(user.firstName + " sent the connection request!");
})

requestsRouter.post("/request/send/:status/:userId",userAuth,async(req,res)=>{
  try {
    const allowedStatus=["interested","ignored"];
    const fromUserId=req.user._id; // from the userAuth middleware
    const toUserId=req.params.userId;
    const status=req.params.status;

    // check if toUserId exist in user collection

    const isToUserExist=await User.findById(toUserId);

    if(!isToUserExist){
      return res.json({message:`${toUserId} does not exist in the database!`})
    }

    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:`${status} is an invalid status`})
    }
    
    // A user can not send the connection request to himself/herself

    if(fromUserId==toUserId){
      return res.json({message:"you cant send connection request to yourself!"})
    }
    

    const connectionRequest= new ConnectionRequest({
      fromUserId:fromUserId,
      toUserId:toUserId,
      status:status
    })
     // is connection already exist
    const isconnectionAlreadyExist= await ConnectionRequest.findOne({
      $or:[
      {fromUserId:fromUserId,
        toUserId:toUserId
      },
      {
        fromUserId:toUserId,
        toUserId:fromUserId
      }
    ]})

    if(isconnectionAlreadyExist){
      return res.json({message:"connection already exist"
      })
    }

    const data=await connectionRequest.save();
    console.log(data);
    res.send("connection request is successfull");

    
  } catch (error) {
    res.status(400).send("error while sending connection requeest: "+ error);
  }
})

module.exports=requestsRouter;