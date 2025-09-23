const express = require("express");
const AuthMiddleWare = require("./src/utils/AuthMiddleware");
const connectDB = require("./src/config/database");
const Users = require("./src/models/userSchema");
const app = express();

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

app.use(express.json())  
app.post("/signup", async (req, res) => {
  console.log("req",req.body);
  
  const user = Users(req.body);
  try {
    await user.save();
    res.send("Added Successfully!");
  } catch {
    (err) => {
      console.log("Error Saving the data", err);
      res.status(500).send("Error While Saving the Data!")
    };
  }
});
