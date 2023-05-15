const mongoose = require("mongoose");

const displaySchema = mongoose.Schema({
  image:
   {
    type: String,
    required: true,
  }
,
});

const Product = mongoose.model("display", displaySchema);

module.exports = Product;
