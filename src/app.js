const express = require("express");


const app = express();

app.get("/getUserData",(req,res)=>{

  try{
    throw new Error("custom error");
    respond.send("user data sent");
  }
  catch(err)
  {
    res.status(500).send("something went wrong,checking from try catch block");
  }
  
})

app.use("/",(err,req,res,next)=>{
  if(err)
  {
    //log uour error
    res.status(500).send("something went wrong");
  }
})























// const {adminAuth,userAuth}=require("./middleware/auth.js");

// // Handle Auth middleware for all GET, POST,.....requests.
// app.use("/admin",adminAuth)

// app.post("/user/login",(req,res)=>{
//   res.send("login is successful");
// })

// app.get("/user/data",userAuth,(req,res)=>{
//   res.send("fetched user data")
// })

// app.get("/admin/getAllData",(req,res)=>{
//   //
//   res.send("all data fetched")
// })

// app.delete("/admin/deleteUser",(req,res)=>{
//   //
//   res.send("user has been deleted");
// })

// Route handlers

// app.get("/example/a",(req,res)=>{
//   res.send("route handler a");
// })

// app.get("/example/b",(req,res,next)=>{
//   console.log("the response will be sent by the next function ...")
//   res.send("hello from B1!")
//   next()
// },(req,res)=>{
//   // res.send("hello from B !")
//   console.log("the response will be sent by the next function 2...")
//   // res.send("hello from B2!")
// })

// const cb0=function(req,res,next){
//   console.log("cb0");
//   next();
// }
// const cb1=function(req,res,next){
//   console.log("cb1");
//   next();
// }

// const cb2=function(req,res){
//   res.send("Hello from c!")
// }

// //app.get("/example/c",[cb0,cb1,cb2]);

// //or

// app.get("/example/d",[(req,res,next)=>{
//   console.log("d1");
//   next();
// },(req,res,next)=>{
//   console.log("d2");
//   next();
// },(req,res)=>{
//   res.send("hello from d!");
// }])

// app.get("/example/e",[cb0,cb1],(req,res)=>{
//   res.send("hello from E!");
// });

























// app.get("/", function (req, res) {
//   res.send("Hello World!");
// });
// app.get("/hello", function (req, res) {
//   res.send("Hello hello hello!");
// });

// app.get("/test", function (req, res) {
//   res.send("Hello World from test API!");
// });

// app.get("/users/:userId/books/:bookId",(req,res)=>{
//   const query=req.query;
//   const params=req.params;
//   console.log(query);
//   console.log(params);
//   res.send("data has been fetched successfully.");
// })

// app.get("/users/:from-:to",(req,res)=>{
//   res.send(req.params);
//   console.log(req.params)
// })

// app.get("/users/:solar.:in",(req,res)=>{
//   res.send(req.params);
//   console.log(req.params);
// })

// app.get('/user/:userId(\\d+)', (req, res) => {
//   res.send(`User ID: ${req.params.userId}`);
//   console.log(`User ID: ${req.params.userId}`)
// });

// app.get('/user/:username([a-zA-Z0-9@_-]+)', (req, res) => {
//   res.send(`Username: ${req.params.username}`);
  
// });


// app.get("/a(bc)?d",(req,res)=>{
//   res.send("testing out string pattern in route")
// })

// app.get(/a/,(req,res)=>{
//   res.send("testing out regex in route")
// })

// app.get(/.*fly$/,(req,res)=>{
//   res.send("testing out some more regex in route")
// })

// app.post("/user",(req,res)=>{
// //database has been updated successfully
// res.send({firstName:"ravi",lastName:"Chaurasiya"});

// })

// app.patch("/user",(req,res)=>{
//   //document has been updated successfully
//   res.send({firstName:"Monu",lastName:"Chaurasiya"})
// })

// app.delete("/user",(req,res)=>{
//   res.send("document has been deleted successfully.")
// })
app.listen(3000, () => {
  console.log("server is running successfully on port 3000...");
});
