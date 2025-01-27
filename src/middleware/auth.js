const jwt=require("jsonwebtoken");
const User=require("../models/user");

const userAuth=async(req,res,next)=>{
try{
// Read the token from req cookies
const cookies=req.cookies;
// validate the token
const {token}=cookies;
if(!token){
  throw new Error("invalid token!");
}
const decodedObj=await jwt.verify(token,"dev@tinder$secretKey")
const {_id}=decodedObj;
// Find the user
const user=await User.findById(_id);
if(!user){
  throw new Error("user not found!");
}
req.user=user;
next();


}
catch(err){
  res.status(404).send(err.message);
}

}


module.exports={userAuth};