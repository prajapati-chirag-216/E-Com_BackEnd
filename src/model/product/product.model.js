const ProductDb = require("../../model/product/product.mongo");
const ReviewDb = require("../productReview/productReview.mongo");

const getProducts = async (id) => {
  let result;
  if (id) {
    result = await ProductDb.find({ category: id })

      .sort({ createdAt: 1 })
      .select({ __v: 0 });
  } else {
    result = await ProductDb.find()
      .populate({ path: "category", select: "name _id" })
      .sort({ createdAt: 1 })
      .select({ __v: 0 });
  }
  return result;
};

const getProductById = async (id) => {
  const result = await ProductDb.findById({ _id: id });

  return result;
};

const getProductDetails = async (id) => {
  const result = await ProductDb.findById(id);
  const reviews = await result.populate("productReviews");

  const avgRatings =
    reviews.productReviews.reduce((a, b) => a + b.rating, 0) /
    reviews.productReviews.length;
  return {
    ...result._doc,
    avgRatings,
    reviewedBy: reviews.productReviews.length,
  };
};

const getFilteredProducts = async (id, name) => {
  let result;

  if (name === "sortByHighPrice") {
    result = await ProductDb.find({ category: id }).sort({ price: -1 });
  } else if (name === "sortByLowPrice") {
    result = await ProductDb.find({ category: id }).sort({ price: 1 });
  } else if (name === "sortByNewDate") {
    result = await ProductDb.find({ category: id }).sort({ createdAt: -1 });
  } else if (name === "sortByOldDate") {
    result = await ProductDb.find({ category: id }).sort({ createdAt: 1 });
  } else if (name === "sortByPopularity") {
    const productsArr = await ProductDb.find({ category: id });

    const data = await Promise.all(
      productsArr.map(async (prodObj) => {
        const reviews = await prodObj.populate("productReviews");

        const avgRatings =
          reviews.productReviews.reduce((a, b) => a + b.rating, 0) /
          reviews.productReviews.length;

        return {
          ...prodObj._doc,
          avgRatings: isNaN(avgRatings) ? 0 : avgRatings,
          reviewedBy: reviews.productReviews.length,
        };
      })
    );

    result = data.sort((a, b) => b.avgRatings - a.avgRatings);
  }

  return result;
};

const addProduct = async (product) => {
  const res = await ProductDb.findOneAndUpdate(
    { name: product.name },
    { ...product },
    { upsert: true, new: true }
  ).populate("category");

  return res;
};

const deleteProduct = async (productid) => {
  const res = await ProductDb.findOneAndDelete({ _id: productid });

  return res;
};

const updateProduct = async (productData, productId) => {
  const res = await ProductDb.findByIdAndUpdate(
    { _id: productId },
    {
      ...productData,
    },
    { new: 1 }
  );
  return res;
};

const postReview = async (productId, reviewData) => {
  const reviewObj = {
    productId,
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
  getProducts,
  getProductDetails,
  addProduct,
  deleteProduct,
  updateProduct,
  postReview,
  getReviews,
  getFilteredProducts,
};
