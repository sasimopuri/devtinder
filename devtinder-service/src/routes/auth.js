const express = require("express");
const authRouter = express.Router();
const {
  validateSignInData,
  validateSignUpData,
} = require("../utils/validateBodyData");
const Users = require("../models/userSchema");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName } = req.body;
    validateSignUpData(req.body);
    const password = await bcrypt.hash(req.body.password, 10);
    const user = Users({
      ...req.body,
      password: password,
    });
    await user.save();
    res.send("Added Successfully!");
  } catch (err) {
    console.log("Error Saving the data", err);
    res.status(500).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    validateSignInData(req.body);
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error("Email is not registered!");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    }
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 3600000),
    });
    res.send("Logged in successfully!");
  } catch (err) {
    console.log("Error", err);
    res.status(400).send(err.message);
  }
});

// authRouter.get("/logout", (req,res) => {
//   res.cookie("token", "", { expires: new Date(Date.now()) });
//   res.send("Logout successfull!")
// });
authRouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logout successfull!");
});

module.exports = { authRouter };
