const express = require("express");
const connectDB = require("./src/config/database");
const Users = require("./src/models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./src/routes/auth");
const { profileRouter } = require("./src/routes/profile");
const { requestRouter } = require("./src/routes/request");
const { userRouter } = require("./src/routes/user");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);

app.delete("/deleteById", async (req, res) => {
  const userId = req.body.userId;
  try {
    const response = await Users.findByIdAndDelete(userId);
    if (response) {
      return res.send("User deleted successfully!");
    } else {
      res.status(404).send("User not found!");
    }
  } catch (err) {
    res.status(400).send("Error while deleting:(");
    console.log("Error", err);
  }
});

app.patch("/updateUser/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const body = req?.body;
  const notAllowedFeilds = ["email","age","gender"];
  try {
    if (!body) {
      throw new Error("No Parameters found");
    }
    Object.keys(body).every((k) => {
      if (notAllowedFeilds.includes(k)) {
        throw new Error("Email can't be changed!");
      }
    });

    const response = await Users.findByIdAndUpdate(userId, body, {
      runValidators: true,
    });
    if (!response) {
      return res
        .status(404)
        .send(
          "Unable to update please verify that the details entered are correct!"
        );
    }
    res.send("Updated user Successfully!");
  } catch (err) {
    console.log("Error", err);
    res.status(400).send(err.message);
  }
});

app.patch("/forgetPassword", async (req, res) => {
  const userId = req.body.userId;
  const body = req.body;

  try {
    const response = await Users.findByIdAndUpdate(userId, body);
    if (!response) {
      return res.status(404).send("User not found");
    }

    res.send("Password reset is successfull!");
  } catch (err) {
    console.log("Error", err);

    res.status(400).send("Unable to reset password please try again:(");
  }
});

connectDB()
  .then(() => {
    console.log("Connect to DB successfully!");
    app.listen(3000, () => {
      console.log("Hello server is at 3000");
    });
  })
  .catch((err) => {
    console.log("Failed to connect to DB");
  });
