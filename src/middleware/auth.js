const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from req cookies
    const cookies = req.cookies;
    // validate the token
    const { token } = cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;
    // Find the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found!");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = { userAuth };
