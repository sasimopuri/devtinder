const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sasikmopuri:sasi191199@namastenode.s2seap0.mongodb.net/devTinder"
  );
};
module.exports = connectDB;
