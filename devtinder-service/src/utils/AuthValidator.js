const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const authValidator = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw new Error("Access Denied. No Token Provided.");
    }
    const decodedToken = jwt.verify(token, "secretAnta");
    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) {
      throw new Error("No user found!");
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("Error:", err.message);
    res.status(400).send("Error:" + err.message);
  }
};

module.exports = { authValidator };
