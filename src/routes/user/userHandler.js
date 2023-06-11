const User = require("../../model/user/userSchema");
const crypto = require("crypto");
const status = require("http-status");
const { sendResetPasswordEmail } = require("../../utils/email");
const { response } = require("express");

const signupUserHandler = async (req, res) => {
  const accessTokenCookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 5),
    httpOnly: false,
  };
  const refreshTokenCookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    httpOnly: true,
  };
  
  try {
    const data = await new User({ ...req.body, phoneNo: req.body.phoneNo });
    const { accessToken, refreshToken } = data.getAuthToken();
    await data.save();
    const accessTokenCookieOptions = {
      expires: new Date(Date.now() + 1000 * 60 * 5),
      httpOnly: false,
    };
    const refreshTokenCookieOptions = {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      httpOnly: true,
    };
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    res.status(200).send({ success: true });
  } catch (err) {
    res
      .status(err.status || (err.code === 11000 ? 409 : 400))
      .send(
        err.code === 11000 ? { text: "e-mail is already registered" } : err
      );
  }
};
const loginUserHandler = async (req, res) => {
  const accessTokenCookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 5),
    httpOnly: false,
  };
  const refreshTokenCookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    httpOnly: true,
  };
  
  try {
    const data = await User.findbyCredentials(
      req.body.email,
      req.body.password
    );
    const { accessToken, refreshToken } = await data.getAuthToken();
    const accessTokenCookieOptions = {
      expires: new Date(Date.now() + 1000 * 60 * 5),
      httpOnly: false,
    };
    const refreshTokenCookieOptions = {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      httpOnly: true,
    };
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
    res.status(200).send({
      success: true,
      cartItems: data.cartItems,
    });
  } catch (err) {
    res.status(err.status || 400).send(err.message || "somthing went Wrong");
  }
};

const logoutUserHandler = (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(err.status || status.BAD_REQUEST).send(err);
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
    res.status(err.status || status[400]).send(err);
  }
};

const resetPasswordHandler = async (req, res) => {

  console.log(req.params.id)

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
    res.status(err.status || status[400]).send(err);
  }
};
const fetchUserHandler = async (req, res) => {
  try {
    res.status(200).send({ userProfile: req.user || null });
  } catch (err) {
    res.status(err.status || status[400]).send(err);
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
    res.status(err.status || status[400]).send(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await User.find();

    return res.status(200).json(result);
  } catch (err) {
    throw err;
  }
};

const getAccessToken = async (req, res) => {
  const accessTokenCookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 5),
    httpOnly: false,
  };
  const refreshTokenCookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    httpOnly: true,
  };
  
  try {
    const accessToken = await req.user.getAccessToken();
    const accessTokenCookieOptions = {
      expires: new Date(Date.now() + 1000 * 60 * 5),
      httpOnly: false,
    };
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.status(200).send({
      success: true,
    });
  } catch (err) {
    res.status(err.status || status[400]).send(err);
  }
};


const httpUpdateUserInformation =  async(req,res) =>{

     const userObj = req.body;
     const userId = req.user._id.toString()

     console.log(userObj)
     console.log(userId)
     try{

         
        const response = await User.findByIdAndUpdate({_id:userId},userObj,{new:1})

        return res.status(200).json(response)
         
     }catch(err){       
      res.status(err.status || status[400]).send(err);
     }
   
}


const httpUpdatePassword = async(req,res) =>{

  
  const data = req.body;

  const user = req.user

 
  
  console.log(data)
  const currentPass = data.curPass;

  try {
    const data =  await User.findbyCredentials(user.email,currentPass)

    
    data.password = req.body.newPass;

    await data.save();

    console.log(data)

    return res.status(200).send({ success: true });
  } catch (err) {
    res.status(err.status || 400).send(err.message || "somthing went Wrong");
  }
    
}

module.exports = {
  signupUserHandler,
  fetchUserHandler,
  loginUserHandler,
  logoutUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  httpUpdateUserInformation,
  addCartItemsHandler,
  getAccessToken,
  getAllUsers,
  httpUpdatePassword
};
