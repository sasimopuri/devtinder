const express = require("express");
const { authValidator } = require("../utils/AuthValidator");
const connectionRequest = require("../models/connectionSchema");
const requestRouter = express.Router();
const Users = require("../models/userSchema");

requestRouter.post(
  "/connection/:action/:id",
  authValidator,
  async (req, res) => {
    try {
      const fromUserId = req.user.id;
      const toUserId = req.params?.id;
      const status = req.params?.action;
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
  }
);

// review
// accept, reject
// req-params id of fromUser
// check if fromUser still exist
// check if status is already accepted/connected
// update request status in DB
// check if request still exist -> db findOne fromUser and toUser

requestRouter.patch("/review/:action/:id", authValidator, async (req, res) => {
  try {
    const { action, id } = req.params;
    const currentUser = req.user;
    //check action is accepted/rejected
    const allowedActionTypes = ["accepted", "rejected"];
    if (!allowedActionTypes.includes(action.toLowerCase())) {
      return res.status(400).json({
        message: `Action status is not valid.`,
        validStatus: allowedActionTypes,
      });
    }
    //check if request is there
    // const checkStatus = await connectionRequest.findOne({
    //   fromUserId: fromUserId,
    //   toUserId: currentUser._id.toString()
    // });

    // if (!checkStatus) {
    //   return res.status(400).json({
    //     status: "Failed",
    //     message: "No request found!",
    //   });
    // }
    //check if user is exist or user profile is deleted/deactivated
    // const userExist = await Users.findById(fromUserId);
    // if (!userExist) {
    //   return res.status(400).json({
    //     status: "Failed",
    //     message: "Requested user doesn't exist anymore!",
    //   });
    // }

    //check if status is already accepted or ignored
    // const allowedStatus = ["interested"];
    // if (!allowedStatus.includes(checkStatus.status)) {
    //   return res.status(400).json({
    //     status: "Failed",
    //     message: `The request is already ${checkStatus.status} `,
    //   });
    // // }
    // const updatedBody = {status:action};
    // const statusUpdated = await connectionRequest.findByIdAndUpdate(checkStatus._id,updatedBody,{new:true})
    const connection = await connectionRequest.findOne({
      _id: id,
      toUserId: currentUser._id.toString(),
      status: "interested",
    });
    if (!connection) {
      return res.status(404).json({
        message: "No request found!",
      });
    }

    const requestedUser = await Users.findById(connection.fromUserId);
    if (!requestedUser) {
      return res.status(404).json({
        message: "The requested user account is not found!",
      });
    }

    connection.status = action;
    const statusUpdated = await connection.save({ new: true });

    res.json({
      message: `Request updated`,
      body: statusUpdated,
    });
  } catch (err) {
    console.log("Error", err.message);
    res.status(400).json({ err });
  }
});

module.exports = { requestRouter };
