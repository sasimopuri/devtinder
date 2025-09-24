const express = require("express");
const AuthMiddleWare = require("./src/utils/AuthMiddleware");
const connectDB = require("./src/config/database");
const Users = require("./src/models/userSchema");
const app = express();

app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = Users(req.body);
  try {
    await user.save();
    res.send("Added Successfully!");
  } catch (err) {
    console.log("Error Saving the data", err);
    res.status(500).send(err.message);
  }
});

app.get("/getUserDetails", async (req, res) => {
  try {
    const userDetails = await Users.findOne({ email: req.body.email });
    if (!userDetails) {
      return res.status(404).send("No user found!");
    }
    res.send(userDetails);
  } catch (err) {
    console.log("Error", err);
    res.status(400).send("Unable to fetch user details :(");
  }
});

app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await Users.find({});
    if (!users) {
      return res.status(404).send("No Users to fetch!");
    }
    res.send(users);
  } catch (err) {
    res.send("Unable to fetch the details:(");
    console.log("Error", err);
  }
});

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

app.patch("/updateUser", async (req, res) => {
  const userId = req.body.userId;
  const body = req.body;
  try {
    const response = await Users.findByIdAndUpdate(userId, body);
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
    res.status(400).send("Unable to update the user details:(");
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
