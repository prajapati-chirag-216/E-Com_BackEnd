const jwt = require("jsonwebtoken");
const User = require("./model/user/userSchema");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies["userToken"];
    const decoded = jwt.verify(
      token,
      "7ab7e381146f2904109d01a6862e3ab42afdd4bcf9ba976168bae6dc2c5ec610"
    );
    const data = await User.findOne({
      _id: decoded._id,
    });
    if (!data || data.length === 0) {
      throw { message: "User is not LogedIn!" };
    }
    req.user = data;
    next();
  } catch (err) {
    res.status(err.status || 404).send(err);
  }
};
const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies["userToken"];
    let data;
    if (token) {
      const decoded = jwt.verify(
        token,
        "7ab7e381146f2904109d01a6862e3ab42afdd4bcf9ba976168bae6dc2c5ec610"
      );
      data = await User.findOne({
        _id: decoded._id,
      }).select({ name: 1 });
    }
    req.user = data;
    next();
  } catch (err) {
    res.status(404).send({ message: "somthing went wrong" });
  }
};
module.exports = { auth, verifyUser };
