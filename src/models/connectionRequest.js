
const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({
  fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  status:{
    type:String,
    enum:{
      values:["interested","ignored","accepted","rejected"],
      message:"incorrect status value"
    },
    required:true
  }

},{
  timestamps:true
})
 
connectionRequestSchema.index({fromUserId:1,toUserId:1})

const ConnectionRequest=new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports=ConnectionRequest;