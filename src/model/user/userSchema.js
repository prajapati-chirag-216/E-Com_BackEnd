const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: [5, "Name should contain at least 5 characters .."],
  },
  email: {
    type: String,
    trim: true,
    unique: [true, "Enter valid email please .."],
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Enter valid email ..");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: [6, "Enter valid password .."],
  },
  phoneNo: {
    type: Number,
    trim: true,
    minlength: [10, "Enter valid Phone No .."],
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productInfo",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.methods.toJSON = function () {
  const user = this.toObject(); // this will return a clone object so we can delete from that

  delete user.password;

  return user;
};

userSchema.methods.createResetToken = function () {
  const resettoken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 5 * 60 * 1000; // expires in 5 min
  return resettoken;
};

userSchema.methods.getAuthToken = function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    "7ab7e381146f2904109d01a6862e3ab42afdd4bcf9ba976168bae6dc2c5ec610",
    {
      expiresIn: "2d", // expires in 2 days
    }
  );
  return token;
};

userSchema.statics.findbyCredentials = async function (email, password) {
  const user = await User.findOne({ email })
    .populate("cartItems.product")
    .select({ password: 1, cartItems: 1 });
  if (user == null) {
    throw {
      message: "Invalide Login details!",
      status: 502,
      validityStatus: "email",
    };
  }
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    throw {
      message: "Invalide Password !",
      status: 502,
      validityStatus: "password",
    };
  }
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const User = mongoose.model("user", userSchema);

module.exports = User;
