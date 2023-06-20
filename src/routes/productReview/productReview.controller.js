const {
  postReview,
  getReviews,
} = require("../../model/productReview/productReview.model");

const httpPostReview = async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;
  const reviewData = req.body;
  const result = await postReview(userId, productId, reviewData);

  if (!result) {
    return res.status(404).json({
      error: "Review Was Not Posted!",
    });
  }
  res.status(200).json(result);
};

const httpGetProductReviews = async (req, res) => {
  const productId = req.params.id;

  const result = await getReviews(productId);

  if (!result) {
    return res.status(404).json({
      error: "Review Was Found By Error!",
    });
  }

  return res.status(200).json(result);
};

module.exports = {
  httpPostReview,
  httpGetProductReviews,
};
