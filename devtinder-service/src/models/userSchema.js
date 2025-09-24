const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase : true,
    unique: true,
    validate(value){
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let val=emailRegex.test(value)
      if(!val){
        throw new Error("Email validation failed")
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    lowercase:true,
    validate(value){
      if(!["male","female", "other"].includes(value)){
        throw new Error("Gender is not valid :" +value)
      }
    }
  },
  age: {
    type: Number,
    min : 18
  },
  description:{
    type: String,
    default : "Hello this is default description"
  },
  photoUrl:{
    type: String
  },

},{
  timestamps:true
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
