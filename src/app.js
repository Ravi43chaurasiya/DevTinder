const express = require("express");
const connectDB=require("./config/database")

const app = express();

connectDB().then(()=>{
  console.log("Database connection is successfull")
  app.listen(3000, () => {
    console.log("server is running successfully on port 3000...");
  });
})
.catch((err)=>{
  console.error("database can not be connected");
})


