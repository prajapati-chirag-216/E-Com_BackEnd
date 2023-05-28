const express = require("express");
const auth = require("../../userAuth");
const {
  signupUserHandler,
  loginUserHandler,
  logoutUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  addCartItemsHandler,
} = require("./userHandler");
const userrouter = express.Router();

userrouter.post("/user/signup", signupUserHandler);
userrouter.post("/user/login", loginUserHandler);
userrouter.post("/user/logout", auth, logoutUserHandler);
userrouter.post("/user/forgotPassword", forgotPasswordHandler);
userrouter.post("/user/resetPassword/:id", resetPasswordHandler);
userrouter.post("/addCartItems", auth, addCartItemsHandler);
module.exports = userrouter;
