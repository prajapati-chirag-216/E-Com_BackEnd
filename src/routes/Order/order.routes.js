const express = require("express");

const {
  httpPostOrder,
  httpGetAllOrders,
  httpOrderStatus,
  httpGetUserOrders,
  httpsGetTodaysOrders,
} = require("./order.controller");
const { auth } = require("../../userAuth");

const orderRouter = express.Router();

orderRouter.post("/postOrder", auth, httpPostOrder);
orderRouter.get("/getAllOrders", httpGetAllOrders);
orderRouter.patch("/updateOrderStatus/:id", httpOrderStatus);
orderRouter.get("/getUserOrders", auth, httpGetUserOrders);
orderRouter.get("/getTodayOrders", httpsGetTodaysOrders);

module.exports = orderRouter;
