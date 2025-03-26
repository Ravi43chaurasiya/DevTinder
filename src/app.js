const express = require("express");
const connectDB=require("./config/database")
const User=require("./models/user");


const req = require("express/lib/request");
const { cookie } = require("express/lib/response");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");

const authRouter=require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const userRouter=require("./routes/user");
const cors=require("cors");


const app = express();
const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,   
  methods:["GET","POST","PATCH"],   
  allowedHeaders: ["Content-Type", "Authorization"],      //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestsRouter);
app.use("/",userRouter);


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


