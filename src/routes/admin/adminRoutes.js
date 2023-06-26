const express = require("express");
const {
  adminAuth,
  verifyAdminRefreshToken,
  verifyAdmin,
} = require("../../auth");
const roleTypes = require("../../utils/roleTypes");
const {
  // signupAdminHandler,
  loginAdminHandler,
  logoutAdminHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  getAccessToken,
  fetchAdminHandler,
  getAllAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} = require("./adminHandler");
const adminRouter = express.Router();

// adminRouter.post("/admin/signup", signupAdminHandler);
adminRouter.post("/admin/addAdmin", adminAuth(roleTypes.ADD_ADMIN), addAdmin);
adminRouter.post("/admin/login", loginAdminHandler);
adminRouter.post(
  "/admin/logout",
  adminAuth(roleTypes.LOGOUT_ADMIN),
  logoutAdminHandler
);
adminRouter.post("/admin/forgotPassword", forgotPasswordHandler);
adminRouter.post("/admin/resetPassword/:id", resetPasswordHandler);
adminRouter.get(
  "/admin/getAccessToken",
  verifyAdminRefreshToken,
  getAccessToken
);
adminRouter.get("/admin/profile", verifyAdmin, fetchAdminHandler);
adminRouter.get(
  "/getAllAdmins",
  adminAuth(roleTypes.FETCH_ADMINS),
  getAllAdmins
);
adminRouter.patch(
  "/updateAdmin/:id",
  adminAuth(roleTypes.UPDATE_ADMIN),
  updateAdmin
);
adminRouter.delete(
  "/deleteAdmin/:id",
  adminAuth(roleTypes.DELETE_ADMIN),
  deleteAdmin
);
module.exports = adminRouter;
