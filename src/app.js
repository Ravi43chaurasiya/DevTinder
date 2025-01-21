const express = require("express");
const connectDB=require("./config/database")
const User=require("./models/user");

const app = express();
app.use(express.json())
app.post("/signup",async(req,res)=>{
  console.log(req.body);
  const user=new User(req.body);
  try{
    await user.save();
    res.send(user);
  }
  catch(err){
    res.status(400).send("error saving database"+ err.message);
  }
 
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

app.patch("/user",async(req,res)=>{
  const userId=req.body._id;
  try{
    await User.findByIdAndUpdate(userId,req.body,{runValidators:true,upsert:true});
    res.send("user has been updated");
  }
  catch(err)
  {
    
    res.status(404).send("Something went wrong!");
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


