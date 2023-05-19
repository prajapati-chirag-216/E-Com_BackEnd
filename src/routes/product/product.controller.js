const path = require("path");

const fs = require("fs");
const {
  getProducts,
  getProductDetails,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../../model/product/product.model");

function uploadToImgur(image) {
  return new Promise((resolve, reject) => {
    imgur.upload(image, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res.data.link);
      }
    });
  });
}

const httpGetProduct = async (req, res) => {
  const id = (req.params && req.params.id) || undefined;
  const result = await getProducts(id);
  if (!result)
    return res.status(400).json({
      error: "Something Wrong In Products Data",
    });

  return res.status(200).json(result);
};
const httpGetProductDetails = async (req, res) => {
  const id = (req.params && req.params.id) || undefined;
  const result = await getProductDetails(id);
  if (!result)
    return res.status(400).json({
      error: "Something Wrong In Products Data",
    });

  return res.status(200).json(result);
};
const httpGetAllProducts = async (req, res) => {
  const result = await getProducts();
  if (!result)
    return res.status(400).json({
      error: "Something Wrong In Products Data",
    });

  return res.status(200).json(result);
};

const httpAddProduct = async (req, res) => {
  const product = req.body;

  const result = await addProduct(product);

  if (!result) {
    return res.status(400).json({
      error: "Product Was Not Added Successfully",
    });
  } else {
    return res.status(201).json(result);
  }
};

const httpdeleteProduct = async (req, res) => {
  const Productid = req.params.id;

  const result = await deleteProduct(Productid);

  if (!result) {
    return res.status(400).json({
      error: "Your Product was not deleted!",
    });
  }

  return res.status(200).json(result);
};

const httpUpdateProduct = async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const result = await updateProduct(productData, productId);

  if (!result) {
    return res.status(404).json({
      error: "Product Was Not Updated!",
    });
  }

  return res.status(200).json(result);
};

module.exports = {
  httpGetProduct,
  httpGetProductDetails,
  httpGetAllProducts,
  httpAddProduct,
  httpdeleteProduct,
  httpUpdateProduct,
};
