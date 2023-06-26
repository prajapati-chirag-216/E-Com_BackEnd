const express = require("express");
const { adminAuth } = require("../../auth");
const {
  addCategoryHandler,
  fetchCategoriesHandler,
  fetchCategoryHandler,
  deleteCategoryHandler,
  updateCategoryHandler,
  httpGetCategoryByName,
} = require("./categoryHandler");
const roleTypes = require("../../utils/roleTypes");
const categoryRouter = express.Router();

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

categoryRouter.get(
  "/fetchCategory/:id",
  allowUnauthenticated(roleTypes.FETCH_CATEGORY),
  fetchCategoryHandler
);
categoryRouter.get(
  "/fetchCategories",
  allowUnauthenticated(roleTypes.FETCH_CATEGORIES),
  fetchCategoriesHandler
);
categoryRouter.get(
  "/getCategoryByName/:name",
  allowUnauthenticated(roleTypes.FETCH_CATEGORY_BY_NAME),
  httpGetCategoryByName
);
categoryRouter.post(
  "/addCategory",
  adminAuth(roleTypes.ADD_CATEGORY),
  addCategoryHandler
);
categoryRouter.delete(
  "/deleteCategory/:id",
  adminAuth(roleTypes.DELETE_CATEGORY),
  deleteCategoryHandler
);
categoryRouter.patch(
  "/updatecategory/:id",
  adminAuth(roleTypes.UPDATE_CATEGORY_BY_ID),
  updateCategoryHandler
);

module.exports = categoryRouter;
