const mongoose = require("mongoose");
const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["accepted","ignored","interested","rejected"],
        message: `{VALUE} is incorrect status.`,
      },
    },
  },
  { timestamps: true }
);

connectionSchema.pre("save",function(next){
    if(this.toUserId.equals(this.fromUserId)){
        throw new Error("Can't send request to you're self")
    }
    next()
})
connectionSchema.index({fromUserId:1, toUserId:1})

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionSchema)
module.exports=ConnectionRequestModel
