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

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestsRouter);

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


