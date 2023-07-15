const express = require("express");
const { adminAuth } = require("../../auth");
const roleTypes = require("../../utils/roleTypes");

const {
  addImageHandler,
  fetchImageHandler,
  deleteImageHandler,
} = require("./displayHandler");
const displayImgrouter = express.Router();

function allowUnauthenticated(role) {
  return (req, res, next) => {
    const { origin } = req.headers;
    if (
      origin === "https://shopzee.onrender.com" ||
      origin === "http://localhost:5000"
    ) {
      if(role === "FETCH_DISPLAY"){

        console.log('here');
      }
      return next();
    } else {
      if(role === 'FETCH_DISPLAY'){

        console.log('haha');
      }
      adminAuth(role)(req, res, next);
    }
  };
}

displayImgrouter.post(
  "/addDisplayImage",
  adminAuth(roleTypes.ADD_DISPLAY),
  addImageHandler
);

displayImgrouter.get(
  "/fetchDisplayImage",
  allowUnauthenticated(roleTypes.FETCH_DISPLAY),
  fetchImageHandler
);
displayImgrouter.delete(
  "/deleteDisplayImage/:id",
  adminAuth(roleTypes.DELETE_DISPLAY),
  deleteImageHandler
);
module.exports = displayImgrouter;
