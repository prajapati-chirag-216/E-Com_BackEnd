const User = require("../../model/user/userSchema");
const crypto = require("crypto");
const { sendResetPasswordEmail } = require("../../utils/email");
const cookieOptions = {
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
  httpOnly: true,
};
const signupUserHandler = async (req, res) => {
  try {
    const data = await new User({ ...req.body, phoneNo: +req.body.phoneNo });
    if (!data || data.length === 0) {
      throw { message: "Session Time out! Please try again.", status: 502 };
    }
    const token = data.getAuthToken();
    await data.save();
    res.cookie("userToken", token, cookieOptions);
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(err.status || 404).send(err);
  }
};
const loginUserHandler = async (req, res) => {
  try {
    const data = await User.findbyCredentials(
      req.body.email,
      req.body.password
    );
    const token = await data.getAuthToken();
    res.cookie("userToken", token, cookieOptions);
    res.status(200).send({
      success: true,
      cartItems: data.cartItems,
    });
  } catch (err) {
    res.status(err.status || 404).send(err);
  }
};

const logoutUserHandler = (req, res) => {
  try {
    res.clearCookie("userToken");
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(404).send(err);
  }
};

const forgotPasswordHandler = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    if (!data || data.length === 0) {
      throw { message: "No account exist with this E-mail Id", status: 502 };
    }
    const resettoken = data.createResetToken();
    await data.save({ validateBeforeSave: false });
    sendResetPasswordEmail(
      data.email,
      `${req.protocol}://localhost:5000/resetPassword/${resettoken}`
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
    const data = await User.findOne({
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
const addCartItemsHandler = async (req, res) => {
  try {
    const data = req.user;
    const cartData = req.body;
    let cartItems = [];
    const processCartItems = () => {
      return new Promise((resolve, reject) => {
        for (let key in cartData) {
          cartItems.push({
            product: cartData[key]._id,
            quantity: cartData[key].quntity,
          });
        }
        resolve();
      });
    };
    await processCartItems();
    data.cartItems = cartItems;
    await data.save();
    await res.status(200).send({ success: true, cartItems });
  } catch (err) {
    res.status(err.status || 404).send(err);
  }
};
module.exports = {
  signupUserHandler,
  loginUserHandler,
  logoutUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  addCartItemsHandler,
};
