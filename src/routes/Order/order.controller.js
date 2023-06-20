const {
  postOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  deleteOrder,
  getTodaysOrders,
  getUsersOrders,
} = require("../../model/Order/order.model");

const httpPostOrder = async (req, res) => {
  const userData = req.body;
  userData.userId = req.user._id;
  try {
    const result = await postOrder(userData);
    if (!result) {
      throw { message: "Order canceled" };
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 400).send(err.message || "somthing Went Wrong");
  }
};

const httpGetAllOrders = async (req, res) => {
  try {
    const result = await getAllOrders();

    if (!result) {
      throw { message: "Orders was Not Found" };
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 400).send(err.message || "somthing Went Wrong");
  }
};

const httpOrderStatus = async (req, res) => {
  const status = req.body;

  const OrderId = req.params.id;
  try {
    const result = await updateOrderStatus(status, OrderId);
    if (!result) {
      throw { message: "Your order status was not updated" };
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 400).send(err.message || "somthing Went Wrong");
  }
};

const httpGetOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const result = await getOrderById(orderId);

    if (!result) {
      throw { message: "Your Order was Not Found" };
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 400).send(err.message || "somthing Went Wrong");
  }
  // if (!result) {
  //   return res.status(400).json({
  //     error: "Your Order  was Not Found!",
  //   });
  // }
};

const httpDeleteOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await deleteOrder(id);

    if (!result) {
      throw { message: "Your Order was Deleted" };
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 400).send(err.message || "somthing Went Wrong");
  }

  return res.status(200).json(result);
};

const httpsGetTodaysOrders = async (req, res) => {
  try {
    const result = await getTodaysOrders();

    if (!result) {
      throw { message: "Your Order was Not Found" };
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 400).send(err.message || "somthing Went Wrong");
  }
};

const httpGetUserOrders = async (req, res) => {
  const userId = req.user._id;

  try {
    const result = await getUsersOrders(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 400).send(err.message || "somthing Went Wrong");
  }
};

module.exports = {
  httpPostOrder,
  httpGetAllOrders,
  httpOrderStatus,
  httpGetOrderById,
  httpDeleteOrder,
  httpsGetTodaysOrders,
  httpGetUserOrders,
};
