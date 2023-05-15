const ProductDb = require("../../model/product/product.mongo");

const getProducts = async (id) => {
  let result;
  if (id) {
    result = await ProductDb.find({ category: id })
      .sort({ createdAt: 1 })
      .select({ __v: 0 });
      console.log(result,'antim')
  } else {
    result = await ProductDb.find()
      .populate({ path: "category", select: "name _id" })
      .sort({ createdAt: 1 })
      .select({ __v: 0 });
  }
  return result;
};

const addProduct = async (product) => {
  const result = await ProductDb.findOneAndUpdate(
    { name: product.name },
    { ...product },
    { upsert: true, new: true }
  ).populate("category");
  console.log(result);

  return result;
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
  console.log(res, "inside updateback");
  return res;
};

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};
