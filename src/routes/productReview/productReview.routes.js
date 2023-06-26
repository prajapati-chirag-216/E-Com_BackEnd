const express = require("express");
const { auth } = require("../../userAuth");

const {
  httpPostReview,
  httpGetProductReviews,
  httpDeleteReview
} = require("./productReview.controller");

const productReviewRouter = express.Router();

productReviewRouter.post("/productreview/:id", auth, httpPostReview);
productReviewRouter.get("/getproductReviews/:id", httpGetProductReviews);
productReviewRouter.delete('/deletereview/:id',httpDeleteReview)


module.exports = productReviewRouter;
