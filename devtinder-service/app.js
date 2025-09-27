const express = require("express");
const connectDB = require("./src/config/database");
const Users = require("./src/models/userSchema");
const {
  validateSignUpData,
  validateSignInData,
} = require("./src/utils/validateBodyData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { authValidator } = require("./src/utils/AuthValidator");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
  try {
    const { firstName } = req.body;
    console.log("fir", firstName, { firstName });

    validateSignUpData(req.body);
    const password = await bcrypt.hash(req.body.password, 10);
    const user = Users({
      ...req.body,
      password: password,
    });
    // console.log(user);

    await user.save();
    res.send("Added Successfully!");
  } catch (err) {
    console.log("Error Saving the data", err);
    res.status(500).send(err.message);
  }
});

app.post("/login", async (req, res) => {
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
    const token = user.getJWT();
    res.cookie("token", token, {
      express: new Date(Date.now + 7 * 24 * 3600000),
    });
    res.send("Logged in successfully!");
  } catch (err) {
    console.log("Error", err);

    res.status(400).send(err.message);
  }
});

app.get("/getUserDetails", authValidator, async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (err) {
    console.log("Error", err.message);
    res.status(400).send("Error", err.message);
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

app.patch("/updateUser/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const body = req?.body;
  const notAllowedFeilds = ["email"];
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
