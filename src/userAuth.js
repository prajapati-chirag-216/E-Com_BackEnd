const jwt = require("jsonwebtoken");
const User = require("./model/user/userSchema");
const status = require("http-status");
const auth = async (req, res, next) => {
  try {
    const accessToken = req.cookies["accessToken"];
    const refreshToken = req.cookies["refreshToken"];
    let data;
    if (refreshToken) {
      let accessTokenDecoded;
      if (accessToken) {
        accessTokenDecoded = jwt.verify(
          accessToken,
          "7ab7e381146f2904109d01a6862e3ab42afdd4bcf9ba976168bae6dc2c5ec610"
        );
      }
      const refreshTokenDecoded = jwt.verify(
        refreshToken,
        "103f6d1f71a29021e0c1b42ec1d9a79ba961ce6d1b8408Fj5rD7Gh9Lm2kP6af8"
      );
      if (
        accessTokenDecoded &&
        refreshTokenDecoded &&
        accessTokenDecoded._id === refreshTokenDecoded._id
      ) {
        data = await User.findOne({
          _id: accessTokenDecoded._id,
        });
        req.user = data;
      } else if (refreshTokenDecoded) {
        throw {
          status: status.FORBIDDEN,
          message: {
            text: "invalid access",
            refreshTokenDecoded: true,
          },
        };
      }
    } else {
      throw {
        status: status.UNAUTHORIZED,
        message: {
          text: "unAuthorized access",
        },
      };
    }
    next();
  } catch (err) {
    res.status(err.status || 404).send(err.message || "somthing went wrong!");
  }
};
const verifyUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies["accessToken"];
    const refreshToken = req.cookies["refreshToken"];
    let data;
    if (refreshToken) {
      let accessTokenDecoded;
      if (accessToken) {
        accessTokenDecoded = jwt.verify(
          accessToken,
          "7ab7e381146f2904109d01a6862e3ab42afdd4bcf9ba976168bae6dc2c5ec610"
        );
      }
      const refreshTokenDecoded = jwt.verify(
        refreshToken,
        "103f6d1f71a29021e0c1b42ec1d9a79ba961ce6d1b8408Fj5rD7Gh9Lm2kP6af8"
      );
      if (
        accessTokenDecoded &&
        refreshTokenDecoded &&
        accessTokenDecoded._id === refreshTokenDecoded._id
      ) {
        data = await User.findOne({
          _id: accessTokenDecoded._id,
        });
        req.user = data;
      } else if (refreshTokenDecoded) {
        throw {
          status: status.FORBIDDEN,
          message: {
            text: "invalid access",
            refreshTokenDecoded: true,
          },
        };
      }
    } else {
      req.user = data;
    }
    next();
  } catch (err) {
    res.status(err.status || 404).send(err.message || "somthing went wrong");
  }
};
const verifyRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies["refreshToken"];
    let data;
    if (refreshToken) {
      const refreshTokenDecoded = jwt.verify(
        refreshToken,
        "103f6d1f71a29021e0c1b42ec1d9a79ba961ce6d1b8408Fj5rD7Gh9Lm2kP6af8"
      );
      if (refreshTokenDecoded) {
        data = await User.findOne({
          _id: refreshTokenDecoded._id,
        });
        req.user = data;
      }
    } else {
      throw {
        status: status.FORBIDDEN,
        message: {
          text: "anAuthorized access",
        },
      };
    }
    next();
  } catch (err) {
    res.status(err.status || 404).send(err.message || "Somthing Went Wrong!");
  }
};
module.exports = { auth, verifyUser, verifyRefreshToken };
