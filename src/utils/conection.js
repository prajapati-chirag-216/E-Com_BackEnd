// require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/e-comerce");
//   .connect(process.env.CONECTION_URL)
