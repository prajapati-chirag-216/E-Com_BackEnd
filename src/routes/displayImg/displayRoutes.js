const express = require("express");
const auth = require("../../auth");
const multer = require("multer");

const {
  addImageHandler,
  fetchImageHandler,
  deleteImageHandler,
} = require("./displayHandler");
const displayImgrouter = express.Router();

function allowUnauthenticated(req, res, next) {
  const { origin } = req.headers;
  if (
    origin === "https://shopzee.onrender.com"
    // origin === "http://192.168.0.108:5000" ||
    // origin === "http://localhost:3000"
  ) {
    return next();
  } else {
    auth(req, res, next);
  }
}

displayImgrouter.post("/admin/addDisplayImage", auth, addImageHandler);

displayImgrouter.get(
  "/admin/fetchDisplayImage",
  allowUnauthenticated,
  fetchImageHandler
);
displayImgrouter.delete(
  "/admin/deleteDisplayImage/:id",
  auth,
  deleteImageHandler
);
module.exports = displayImgrouter;
