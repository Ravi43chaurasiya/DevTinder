const express = require("express");
const app = express();

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

app.get('/user/:username([a-zA-Z0-9@_-]+)', (req, res) => {
  res.send(`Username: ${req.params.username}`);
  
});


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
