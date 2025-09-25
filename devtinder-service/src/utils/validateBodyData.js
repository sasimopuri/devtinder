const validator = require("validator");

const validateSignUpData = (body) => {
  const { firstName, lastName, email, password } = body;

  
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough!");
  }
};

const validateSignInData=(body)=>{
    const {email,password} = body
    if(!validator.isEmail(email)){
        throw new Error("Please enter correct Email!")
    }
}

module.exports = { validateSignUpData, validateSignInData };
