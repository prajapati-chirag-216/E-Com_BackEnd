const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/product/product.route");
const adminAuthrouter = require("./routes/adminAuth/adminRoutes");
const displayImgrouter = require("./routes/displayImg/displayRoutes");
const categoryRouter = require("./routes/categories/categoryRoutes");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(productRouter);
app.use(adminAuthrouter);
app.use(displayImgrouter);
app.use(categoryRouter);

module.exports = app;
