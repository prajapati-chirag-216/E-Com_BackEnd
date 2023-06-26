const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/product/product.route");
const adminRouter = require("./routes/admin/adminRoutes");
const displayImgrouter = require("./routes/displayImg/displayRoutes");
const categoryRouter = require("./routes/categories/categoryRoutes");
const userRouter = require("./routes/user/userRoutes");
const orderRouter = require("./routes/order/order.routes");
const contactUsRouter = require("./routes/ContactUs/Contactus.route");
const productReviewRouter = require("./routes/productReview/productReview.routes");
const app = express();

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://shopzee.onrender.com");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   next();
// });

app.use(
  cors({
    origin: [
      "https://shopzee.onrender.com",
      "http://localhost:5000",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(productRouter);
app.use(adminRouter);
app.use(displayImgrouter);
app.use(categoryRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(contactUsRouter);
app.use(productReviewRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
