const express = require("express");
const { authValidator } = require("../middleware/AuthValidator");
const connectionRequest = require("../models/connectionSchema");
const Users = require("../models/userSchema");
const { connection } = require("mongoose");
const userRouter = express.Router();

const USER_FEILDS = [
  "firstName",
  "lastName",
  "photoUrl",
  "gender",
  "age",
  "skills",
  "description",
];

userRouter.get("/getConnectionRequests", authValidator, async (req, res) => {
  try {
    const userId = req.user._id;
    const connectionRequests = await connectionRequest
      .find({
        toUserId: userId,
        status: "interested",
      })
      .populate("fromUserId", USER_FEILDS);

    res.json({
      count: connectionRequests.length,
      connectionRequests,
    });
  } catch (err) {
    console.log("Error", err);
    res.status(400).send("Error", err.message);
  }
});

userRouter.get("/getConnections", authValidator, async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const connections = await connectionRequest
      .find({
        $or: [
          {
            fromUserId: currentUserId,
            status: "accepted",
          },
          {
            toUserId: currentUserId,
            status: "accepted",
          },
        ],
      })
      .populate("fromUserId", USER_FEILDS)
      .populate("toUserId", USER_FEILDS);

    if (!connections.length > 0) {
      return res.json({
        message: "No connections found",
        count: connections.length,
      });
    }

    const data = connections.map((connection) => {
      if (connection.fromUserId._id.toString() === currentUserId.toString()) {
        return connection.toUserId;
      }
      return connection.fromUserId;
    });

    res.json({
      count: data.length,
      data,
    });
  } catch (err) {
    console.log("Error", err);
    res.status(400).send("Error", err.message);
  }
});

userRouter.get("/feed/:page/:limit", authValidator, async (req, res) => {
  console.log("Helll");
  try {
    const { page, limit } = req.params;
    const currentUser = req.user;
    const limitValue = limit > 50 ? 50 : limit;
    const skipValue = (page - 1) * limitValue;
    const allConnections = await connectionRequest
      .find({
        $or: [{ fromUserId: currentUser._id }, { toUserId: currentUser._id }],
      })
      .select("fromUserId toUserId");
    const avoidUsersInFeed = new Set();
    avoidUsersInFeed.add(currentUser._id);
    allConnections.forEach((user) => {
      avoidUsersInFeed.add(user?.fromUserId?.toString());
      avoidUsersInFeed.add(user?.toUserId?.toString());
    });
    const allUsers = await Users.find({
      _id: { $nin: Array.from(avoidUsersInFeed) },
    })
      .select(USER_FEILDS)
      .skip(skipValue)
      .limit(limitValue);
    if (!allUsers || !allUsers.length > 0) {
      return res.status(404).send("No Users found");
    }

    res.json({
      count: allUsers.length,
      allUsers,
    });
  } catch (err) {
    console.log("Error", err);
    res.status(400).send("Unable to get feed details.");
  }
});

module.exports = { userRouter };
