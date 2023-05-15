const Admin = require("../../model/adminAuth/adminSchema");
const crypto = require("crypto");
const { sendResetPasswordEmail } = require("../../utils/email");

const loginAdminHandler = async (req, res) => {
  try {
    const data = await Admin.findbyCredentials(
      req.body.email,
      req.body.password
    );
    const token = await data.getAuthToken();
    const cookieOptions = {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    res.status(err.status || 404).send(err);
  }
};

const logoutAdminHandler = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(404).send(err);
  }
};

const forgotPasswordHandler = async (req, res) => {
  try {
    const data = await Admin.findOne({ email: req.body.email });
    if (!data || data.length === 0) {
      throw { message: "No account exist with this E-mail Id", status: 502 };
    }
    const resettoken = data.createResetToken();
    await data.save({ validateBeforeSave: false });
    sendResetPasswordEmail(
      data.email,
      `${req.protocol}://localhost:3000/resetPassword/${resettoken}`
    );
    res.status(200).send({ success: true, resettoken });
  } catch (err) {
    res.status(err.status || 404).send(err);
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
      throw { message: "Session Time out! Please try again.", status: 502 };
    }
    data.password = req.body.password;
    data.passwordResetToken = undefined;
    data.passwordResetExpires = undefined;
    await data.save();

    return res.status(200).send({ status: true });
  } catch (err) {
    res.status(err.status || 404).send(err);
  }
};
// const signupAdminHandler = async (req, res) => {
//   try {
//     const data = await new Admin(req.body);
//     if (!data || data.length === 0) {
//       throw { message: "Session Time out! Please try again.", status: 502 };
//     }
//     await data.save();

//     return res.status(200).send({ status: true });
//   } catch (err) {
//     res.status(err.status || 404).send(err);
//   }
// };
module.exports = {
  loginAdminHandler,
  logoutAdminHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  // signupAdminHandler,
};
