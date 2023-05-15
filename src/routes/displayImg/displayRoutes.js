const express = require("express");
const auth = require("../../auth");
const multer = require("multer");

const {
  addImageHandler,
  fetchImageHandler,
  deleteImageHandler,
} = require("./displayHandler");
const displayImgrouter = express.Router();

// const storage = multer({
//   limits: {
//     fileSize: 5000000,
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

displayImgrouter.post(
  "/admin/addDisplayImage",
  auth,
  addImageHandler
);

displayImgrouter.post("/admin/fetchDisplayImage", auth, fetchImageHandler);
displayImgrouter.post(
  "/admin/deleteDisplayImage/:id",
  auth,
  deleteImageHandler
);
module.exports = displayImgrouter;
