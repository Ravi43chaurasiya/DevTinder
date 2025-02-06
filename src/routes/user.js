const express=require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

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

userRouter.get("/feed",userAuth,async(req,res)=>{
  try {
    //user should see all the user cards, except
    // 0. his own card
    // 1. his connections
    // 2. ignored people
    // 3. already sent connection request
    const safeData="firstName lastName photoUrl age gender about skills";
    const loggedInUser=req.user;

    const page=parseInt(req.query.page) || 1;
    const limit=parseInt(req.query.limit) || 10;

    const skip=(page-1)*limit;
    
    // Find all the connection requests(sent + received)

    const connectionRequests=await ConnectionRequest.find({
      $or:[{fromUserId:loggedInUser._id},
        {
          toUserId:loggedInUser._id
        }
      ]
    })

    const hideUsersFromFeed=new Set();

    connectionRequests.forEach((req)=>{
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    })

    console.log(hideUsersFromFeed);

    const users=await User.find({
      $and:[
        {
          _id:{$nin:Array.from(hideUsersFromFeed)}
        },
        {
          _id:{$ne:loggedInUser._id}
        }
      ]
    }).select(safeData)
    .skip(skip)
    .limit(limit);

    res.json({users});
  } catch (error) {
    res.status(400).send("Error : "+ error.message);
  }
})


module.exports=userRouter;