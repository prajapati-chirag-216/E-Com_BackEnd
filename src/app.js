const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/product/product.route");
const adminAuthrouter = require("./routes/adminAuth/adminRoutes");
const displayImgrouter = require("./routes/displayImg/displayRoutes");
const categoryRouter = require("./routes/categories/categoryRoutes");
const userRouter = require("./routes/user/userRoutes");
const orderRouter = require("./routes/Order/order.routes");
const contactUsRouter = require("./routes/ContactUs/Contactus.route");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://shopzee.onrender.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use(cors({ 
    origin: ["https://shopzee.onrender.com", "http://localhost:5000"],
    credentials: true,
}));

// {
// origin: true,
// // origin: ["http://localhost:3000", "http://localhost:5000"],
// credentials: true,
// }

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(productRouter);
app.use(adminAuthrouter);
app.use(displayImgrouter);
app.use(categoryRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(contactUsRouter);

module.exports = app;
