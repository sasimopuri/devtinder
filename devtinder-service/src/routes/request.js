const express = require("express");
const { authValidator } = require("../utils/AuthValidator");
const connectionRequest = require("../models/connectionSchema");
const requestRouter = express.Router();
const Users = require("../models/userSchema");

requestRouter.post("/connection/:type/:id", authValidator, async (req, res) => {
  try {
    const fromUserId = req.user.id;
    const toUserId = req.params?.id;
    const status = req.params?.type;
    const allowedStatus = ["interested", "ignored"];
    if (!allowedStatus.includes(status.toLowerCase())) {
      return res.status(400).json({
        message: `Status is not valid.`,
        validStatus: allowedStatus,
      });
    }
    const connectRequest = connectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const toUserDetails = await Users.findById({ _id: toUserId });
    if (!toUserDetails) {
      return res.status(404).json({
        message: "toUser dosen't exist.",
      });
    }
    const connectionExist = await connectionRequest.find({
      $or: [
        { fromUserId: toUserId, toUserId: fromUserId },
        { fromUserId: fromUserId, toUserId: toUserId },
      ],
    });

    if (connectionExist.length > 0) {
      return res.status(400).json({
        message: "Connection already sent",
      });
    }
    await connectRequest.save();
    res.json({
      message: "Request sent successfully",
      status: "success",
    });
  } catch (err) {
    console.log("Error", err);
    res.status(400).json("Error");
  }
});

module.exports = { requestRouter };
