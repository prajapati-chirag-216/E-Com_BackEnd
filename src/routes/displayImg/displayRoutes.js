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
    origin === "https://shopzee.onrender.com"                                      // comment outif your are testing
    // origin === "http://192.168.0.108:5000" ||
    // origin === "http://localhost:3000"
  ) {
    // if(origin === 'http:// 192.168.43.226:5000' || origin === "http://localhost:5000"){   // comment out if not styling for responsive web  
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
