const express = require("express");
const { adminAuth } = require("../../auth");
const roleTypes = require("../../utils/roleTypes");

const {
  httpPostOrder,
  httpGetOrder,
  httpGetAllOrders,
  httpOrderStatus,
  httpGetUserOrders,
  httpsGetTodaysOrders,
  httpDeleteOrder,
} = require("./order.controller");
const { auth } = require("../../userAuth");

function verifyAuth(role) {
  return (req, res, next) => {
    const { origin } = req.headers;
    if (
      origin === "https://shopzee.onrender.com" ||
      origin === "http://localhost:5000"
    ) {
      auth(req, res, next);
    } else {
      adminAuth(role)(req, res, next);
    }
  };
}
const orderRouter = express.Router();

orderRouter.post("/postOrder", auth, httpPostOrder);
orderRouter.get(
  "/getAllOrders",
  adminAuth(roleTypes.FETCH_ORDERS),
  httpGetAllOrders
);
orderRouter.patch(
  "/updateOrderStatus/:id",
  adminAuth(roleTypes.UPDATE_ORDER_STATUS),
  httpOrderStatus
);
orderRouter.get("/getUserOrders", auth, httpGetUserOrders);
orderRouter.get(
  "/getOrder/:id",
  verifyAuth(roleTypes.FETCH_ORDER_BY_ID),
  httpGetOrder
);
orderRouter.get(
  "/getTodayOrders",
  adminAuth(roleTypes.FETCH_TODAYS_ORDERS),
  httpsGetTodaysOrders
);
orderRouter.delete(
  "/deleteOrder/:id",
  adminAuth(roleTypes.DELETE_ORDER),
  httpDeleteOrder
);

module.exports = orderRouter;
