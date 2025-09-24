const validator = require("validator");

const validateData = (user) => {
  const { firstName, lastName, email, password } = user;
  console.log(user.firstName);
  
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough!");
  }
};

module.exports = { validateData };
