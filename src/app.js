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
    res.status(400).send("error saving database");
  }
 
})

 










connectDB().then(()=>{
  console.log("Database connection is successfull")
  app.listen(3000, () => {
    console.log("server is running successfully on port 3000...");
  });
})
.catch((err)=>{
  console.error("database can not be connected");
})


