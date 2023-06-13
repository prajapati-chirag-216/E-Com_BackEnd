const express = require("express");
const auth = require("../../auth");
const multer = require("multer");
const path = require("path");
const {
  addCategoryHandler,
  fetchCategoriesHandler,
  fetchCategoryHandler,
  deleteCategoryHandler,
  updateCategoryHandler,
  httpGetCategoryByName,
} = require("./categoryHandler");
const categoryRouter = express.Router();

function allowUnauthenticated(req, res, next) {
  const { origin } = req.headers;
  console.log(origin);
  if (origin === "https://shopzee.onrender.com") {
    console.log("here");
    return next();
  } else {
    console.log("in auth");
    auth(req, res, next);
  }
}

categoryRouter.get(
  "/fetchCategory/:id",
  allowUnauthenticated,
  fetchCategoryHandler
);
categoryRouter.get(
  "/fetchCategories",
  allowUnauthenticated,
  fetchCategoriesHandler
);
categoryRouter.get(
  "/getCategoryByName/:name",
  allowUnauthenticated,
  httpGetCategoryByName
);
categoryRouter.post("/addCategory", auth, addCategoryHandler);
categoryRouter.delete("/deleteCategory/:id", auth, deleteCategoryHandler);
categoryRouter.patch("/updatecategory/:id", updateCategoryHandler);

module.exports = categoryRouter;
