const express = require("express");
const { authValidator } = require("../utils/AuthValidator");
const requestRouter = express.Router();
// const Users = require("../models/userSchema")

requestRouter.post("/connection/:type/:id", authValidator, (req, res) => {
  console.log("Type and id", req.params?.type, req.params?.id);
  res.send("yes")
});

module.exports = { requestRouter }; 
