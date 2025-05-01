const express=require("express");
const {userAuth}=require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
// const sendEmail=require("../utils/sendEmail")

const requestsRouter=express.Router();

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
    // const emailRes=await sendEmail.run("Connection request",req.user.firstName +"  "+ status + " in "+" you please login to dev-tinder.xyz and review the request!");
    // console.log(emailRes);
    res.send("connection request is successfull");

    
  } catch (error) {
    res.status(400).send("error while sending connection requeest: "+ error);
  }
})

requestsRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  try {
    const loggedInUser=req.user;
    const status=req.params.status;
    const requestId=req.params.requestId;

    // validate the status coming from request params, either it is ["accepted","rejected"] or not.

    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status)){
      return res.json({message:"invalid Status!"});
    }
    // loggedInUser = toUserId
    // status of the connection request should be "interested" only then we can accept or reject the request.
    // requestId should be valid i.e it should be present in the DB.

    const connectionRequest=await ConnectionRequest.findOne({
      _id:requestId,
      toUserId:loggedInUser._id,
      status:"interested"
    })

    if(!connectionRequest){
      return res.json({message:"connection does not found!"});
    }

    connectionRequest.status=status;

    const data=await connectionRequest.save();

    res.json({message:"request is "+ status,data});

  } catch (error) {
    res.status(400).send("Error "+ error.message);
  }
})

module.exports=requestsRouter;