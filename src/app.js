const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.get("/hello", function (req, res) {
  res.send("Hello hello hello!");
});

app.get("/test", function (req, res) {
  res.send("Hello World from test API!");
});

app.listen(3000, () => {
  console.log("server is running successfully on port 3000...");
});
