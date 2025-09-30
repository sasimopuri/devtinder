const express = require("express");
const { authValidator } = require("../middleware/AuthValidator");
const profileRouter = express.Router();
const Users = require("../models/userSchema")

profileRouter.get("/getProfile", authValidator, async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (err) {
    console.log("Error", err.message);
    res.status(400).send("Error", err.message);
  }
});

profileRouter.get("/getAllProfiles", authValidator, async (req, res) => {
  try {
    const users = await Users.find({}).select("-password");
    if (!users) {
      return res.status(404).send("No Users to fetch!");
    }
    res.send(users);
  } catch (err) {
    res.send("Unable to fetch the details:(");
    console.log("Error", err);
  }
});

module.exports = { profileRouter };
