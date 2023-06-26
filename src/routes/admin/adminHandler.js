const Admin = require("../../model/admin/adminSchema");
const crypto = require("crypto");
const { sendResetPasswordEmail } = require("../../utils/email");
const status = require("http-status");

// const signupAdminHandler = async (req, res) => {
// try {
//   const data = new Admin(req.body);
//   const { accessToken, refreshToken } = data.getAuthToken();
//   await data.save();
//   const accessTokenCookieOptions = {
//     expires: new Date(Date.now() + 1000 * 60 * 5),
//     httpOnly: true,
//     sameSite: "None",
//     secure: true,
//   };
//   const refreshTokenCookieOptions = {
//     expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
//     httpOnly: true,
//     sameSite: "None",
//     secure: true,
//   };
//   res.cookie("accessToken", accessToken, accessTokenCookieOptions);
//   res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
//   res.status(200).send({ success: true });
// } catch (err) {
//   res.status(err.status || 404).send(err);
// }
// };
const loginAdminHandler = async (req, res) => {
  try {
    const data = await Admin.findbyCredentials(
      req.body.email,
      req.body.password
    );
    // const token = await data.getAuthToken();
    // res.cookie("token", token, cookieOptions);
    const { accessToken, refreshToken } = await data.getAuthToken();
    const accessTokenCookieOptions = {
      expires: new Date(Date.now() + 1000 * 60 * 5),
      httpOnly: true,
      sameSite: "None",
      secure: true,
    };
    const refreshTokenCookieOptions = {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      httpOnly: true,
      sameSite: "None",
      secure: true,
    };
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    res.status(err.status || 400).send(err.message || "somthing went Wrong");
  }
};

const logoutAdminHandler = (req, res) => {
  try {
    res.clearCookie("refreshToken", { secure: true, sameSite: "None" });
    res.clearCookie("accessToken", { secure: true, sameSite: "None" });
    // res.clearCookie("token");
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(404).send(err);
  }
};

const forgotPasswordHandler = async (req, res) => {
  try {
    const data = await Admin.findOne({ email: req.body.email });
    if (!data || data.length === 0) {
      throw {
        text: "No account exist with this E-mail Id",
        status: status.UNAUTHORIZED,
      };
    }
    const resettoken = data.createResetToken();
    await data.save({ validateBeforeSave: false });
    sendResetPasswordEmail(
      data.email,
      `${req.protocol}://localhost:3000/resetPassword/${resettoken}`
    );
    res.status(200).send({ success: true, resettoken });
  } catch (err) {
    res.status(err.status || status.BAD_REQUEST).send(err);
  }
};

const resetPasswordHandler = async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.id)
    .digest("hex");
  try {
    const data = await Admin.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!data || data.length === 0) {
      throw {
        text: "Session Time out! Please try again.",
        status: 440,
      };
    }
    data.password = req.body.password;
    data.passwordResetToken = undefined;
    data.passwordResetExpires = undefined;
    await data.save();

    return res.status(200).send({ status: true });
  } catch (err) {
    res.status(err.status || status.BAD_REQUEST).send(err);
  }
};

const getAccessToken = async (req, res) => {
  try {
    if (!req?.admin) {
      throw { text: "Admin not exist", status: status.BAD_REQUEST };
    }
    const accessToken = await req.admin.getAccessToken();
    const accessTokenCookieOptions = {
      expires: new Date(Date.now() + 1000 * 60 * 5),
      httpOnly: true,
      sameSite: "None",
      secure: true,
    };
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    res.status(err.status || 400).send(err.text || "somthing went Wrong");
  }
};
const fetchAdminHandler = async (req, res) => {
  try {
    res.status(200).send({ adminProfile: req.admin || null });
  } catch (err) {
    res.status(err.status || status.BAD_REQUEST).send(err);
  }
};
const getAllAdmins = async (req, res) => {
  try {
    const result = await Admin.find();
    return res.status(200).json(result);
  } catch (err) {
    throw err;
  }
};
const updateAdmin = async (req, res) => {
  const adminObj = req.body;
  const adminId = req.params.id;

  try {
    const response = await Admin.findByIdAndUpdate({ _id: adminId }, adminObj, {
      new: 1,
    });
    return res.status(200).json(response);
  } catch (err) {
    res.status(err.status || status.BAD_REQUEST).send(err);
  }
};
const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;

  const result = await Admin.findByIdAndDelete(adminId);
  if (!result) {
    return res.status(400).json({
      error: "Your Admin was not deleted!",
    });
  }
  return res.status(200).json(result);
};
const addAdmin = async (req, res) => {
  try {
    const year = new Date().getFullYear();
    req.body.password = `admin@${year}`;
    const data = new Admin(req.body);
    await data.save();
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(err.status || 404).send(err);
  }
};
module.exports = {
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
};
