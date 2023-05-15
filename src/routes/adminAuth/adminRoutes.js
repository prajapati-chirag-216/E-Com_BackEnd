const express = require("express");
const auth = require("../../auth");
const {
  loginAdminHandler,
  logoutAdminHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  // signupAdminHandler,
} = require("./adminHandler");
const adminAuthrouter = express.Router();

// adminAuthrouter.post("/signup", signupAdminHandler);
adminAuthrouter.post("/login", loginAdminHandler);
adminAuthrouter.post("/logout", auth, logoutAdminHandler);
adminAuthrouter.post("/forgotPassword", forgotPasswordHandler);
adminAuthrouter.post("/resetPassword/:id", resetPasswordHandler);
module.exports = adminAuthrouter;
