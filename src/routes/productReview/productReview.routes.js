const express = require("express");
const { auth } = require("../../userAuth");

const {
  httpPostReview,
  httpGetProductReviews,
} = require("./productReview.controller");

const productReviewRouter = express.Router();

productReviewRouter.post("/productreview/:id", auth, httpPostReview);
productReviewRouter.get("/getproductReviews/:id", httpGetProductReviews);

module.exports = productReviewRouter;
