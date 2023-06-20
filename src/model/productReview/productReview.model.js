const ReviewDb = require("../productReview/productReview.mongo");

const postReview = async (userId, productId, reviewData) => {
  const reviewObj = {
    productId,
    userId,
    ...reviewData,
  };
  try {
    const data = new ReviewDb(reviewObj);
    await data.save();
    return data;
  } catch (err) {
    throw err;
  }
};

const getReviews = async (id) => {
  try {
    const data = await ReviewDb.find({ productId: id }).select({
      __v: 0,
      productId: 0,
    });

    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  postReview,
  getReviews,
};
