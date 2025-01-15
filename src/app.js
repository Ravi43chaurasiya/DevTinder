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

app.get("/use?r",(req,res)=>{
  res.send("data has been fetched successfully.");
})

app.get("/a(bc)?d",(req,res)=>{
  res.send("testing out string pattern in route")
})

app.get(/a/,(req,res)=>{
  res.send("testing out regex in route")
})

app.get(/.*fly$/,(req,res)=>{
  res.send("testing out some more regex in route")
})

app.post("/user",(req,res)=>{
//database has been updated successfully
res.send({firstName:"ravi",lastName:"Chaurasiya"});

})

app.patch("/user",(req,res)=>{
  //document has been updated successfully
  res.send({firstName:"Monu",lastName:"Chaurasiya"})
})

app.delete("/user",(req,res)=>{
  res.send("document has been deleted successfully.")
})
app.listen(3000, () => {
  console.log("server is running successfully on port 3000...");
});
