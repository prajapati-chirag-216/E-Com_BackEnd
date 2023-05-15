const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: [true, "enter valide email please .."],
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("enter valide email .. ");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.length < 6) {
        throw new Error("enter valide password .. ");
      }
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

adminSchema.methods.toJSON = function () {
  const admin = this.toObject(); // this will return a clone object so we can delete from that

  delete admin.password;

  return admin;
};

adminSchema.methods.createResetToken = function () {
  const resettoken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 5 * 60 * 1000; // expires in 5 min
  return resettoken;
};

adminSchema.methods.getAuthToken = function () {
  const admin = this;
  const token = jwt.sign(
    { _id: admin._id.toString() },
    "7ab7e381146f2904109d01a6862e3ab42afdd4bcf9ba976168bae6dc2c5ec610",
    {
      expiresIn: "2d", // expires in 2 days
    }
  );
  return token;
};

adminSchema.statics.findbyCredentials = async function (email, password) {
  const admin = await Admin.findOne({ email });
  if (admin == null) {
    throw {
      message: "Invalide Login details!",
      status: 502,
      validityStatus: "email",
    };
  }
  const compare = await bcrypt.compare(password, admin.password);
  if (!compare) {
    throw {
      message: "Invalide Password !",
      status: 502,
      validityStatus: "password",
    };
  }
  return admin;
};

adminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }
  next();
});
const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
