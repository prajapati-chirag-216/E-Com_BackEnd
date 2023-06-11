const mongoose = require("mongoose");

const displaySchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  categoryName:{
    type:String,
    required:true
  },
  text: String,
  label: String,
});

const Display = mongoose.model("display", displaySchema);

module.exports = Display;
