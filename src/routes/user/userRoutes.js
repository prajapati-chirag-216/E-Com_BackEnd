const express = require("express");
const { auth, verifyUser, verifyRefreshToken } = require("../../userAuth");
const { adminAuth } = require("../../auth");
const roleTypes = require("../../utils/roleTypes");
const {
  signupUserHandler,
  loginUserHandler,
  logoutUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  addCartItemsHandler,
  fetchUserHandler,
  getAccessToken,
  getAllUsers,
  httpUpdateUserInformation,
  httpUpdatePassword,
} = require("./userHandler");

const userrouter = express.Router();
userrouter.get("/user/profile", verifyUser, fetchUserHandler);
userrouter.post("/user/signup", signupUserHandler);
userrouter.post("/user/login", loginUserHandler);
userrouter.post("/user/logout", auth, logoutUserHandler);
userrouter.post("/user/forgotPassword", forgotPasswordHandler);
userrouter.post("/user/resetPassword/:id", resetPasswordHandler);
userrouter.post("/addCartItems", auth, addCartItemsHandler);
userrouter.get("/getAllUsers", adminAuth(roleTypes.FETCH_USERS), getAllUsers);
userrouter.get("/user/getAccessToken", verifyRefreshToken, getAccessToken);
userrouter.patch("/updateUser", auth, httpUpdateUserInformation);
userrouter.patch("/updatePassword", auth, httpUpdatePassword);
module.exports = userrouter;
