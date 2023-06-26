const express = require("express");
const { auth } = require("../../userAuth");
const { adminAuth } = require("../../auth");
const {
  httpPostReview,
  httpGetProductReviews,
} = require("./productReview.controller");
const roleTypes = require("../../utils/roleTypes");

function allowUnauthenticated(role) {
  return (req, res, next) => {
    const { origin } = req.headers;
    if (
      origin === "https://shopzee.onrender.com" ||
      origin === "http://localhost:5000"
    ) {
      return next();
    } else {
      adminAuth(role)(req, res, next);
    }
  };
}
const productReviewRouter = express.Router();

productReviewRouter.post("/productreview/:id", auth, httpPostReview);
productReviewRouter.get(
  "/getproductReviews/:id",
  allowUnauthenticated(roleTypes.FETCH_REVIEWS),
  httpGetProductReviews
);

module.exports = productReviewRouter;
