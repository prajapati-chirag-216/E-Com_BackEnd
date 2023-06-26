const express = require("express");
const { adminAuth } = require("../../auth");
const roleTypes = require("../../utils/roleTypes");

const {
  httpGetProduct,
  httpGetAllProducts,
  httpGetProductDetails,
  httpAddProduct,
  httpDeleteProduct,
  httpUpdateProduct,
  httpGetFilteredProducts,
} = require("./product.controller");

const productRouter = express.Router();
productRouter.get("/getproduct/:id", httpGetProduct);
productRouter.get("/getproductDetails/:id", httpGetProductDetails);
productRouter.get(
  "/getproducts",
  adminAuth(roleTypes.FETCH_PRODUCTS),
  httpGetAllProducts
);
productRouter.post(
  "/addproduct",
  adminAuth(roleTypes.ADD_PRODUCT),
  httpAddProduct
);
productRouter.delete(
  "/deleteproduct/:id",
  adminAuth(roleTypes.DELETE_PRODUCT),
  httpDeleteProduct
);
productRouter.patch(
  "/updateproduct/:id",
  adminAuth(roleTypes.UPDATE_PRODUCT),
  httpUpdateProduct
);
productRouter.get("/getfilteredproducts/:id/:name", httpGetFilteredProducts);

module.exports = productRouter;
