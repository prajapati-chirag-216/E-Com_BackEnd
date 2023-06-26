const jwt = require("jsonwebtoken");
const Admin = require("./model/admin/adminSchema");

const {
  auth,
} = async (req, res, next) => {
  try {
    const token = req.cookies["token"];
    const decoded = jwt.verify(
      token,
      "7ab7e381146f2904109d01a6862e3ab42afdd4bcf9ba976168bae6dc2c5ec610"
    );
    const data = await Admin.findOne({
      _id: decoded._id,
    });
    if (!data || data.length === 0) {
      throw { message: "Admin is not LogedIn!" };
    }
    req.admin = data;
    next();
  } catch (err) {
    res.status(err.status || 404).send(err);
  }
};
module.exports = auth;
