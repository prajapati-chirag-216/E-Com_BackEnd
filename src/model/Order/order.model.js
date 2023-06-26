const OrderDb = require("../Order/order.mongo");
const User = require("../user/userSchema");
const { getProductById } = require("../product/product.model");

const postOrder = async (userData, userId) => {
  let result;

  try {
    const data = new OrderDb(userData);
    result = await data.save();

    const response = await User.findByIdAndUpdate(
      { _id: userId },
      { cartItems: [] },
      { new: true }
    );
  } catch (err) {
    throw err;
  }

  return result;
};

const getOrder = async (id) => {
  try {
    let response = await OrderDb.findById(id).populate(
      "orderedItems.productId"
    );
    return { data: response, success: true };
  } catch (err) {
    throw err;
  }
};

const getAllOrders = async () => {
  let orders;

  try {


 
     orders = await OrderDb.find().populate(
      "orderedItems.productId"
    );

    // console.log(orders.orderedItems)
    
    // orders = await OrderDb.find();

    // orders = await Promise.all(
    //   orders.map(async (order) => {
    //     let orderedItems = order.orderedItems;

    //     const products = await Promise.all(
    //       orderedItems.map(async (item) => {
    //         let product = await getProductById(item.productId);

    //         return { ...product, quntity: item.quntity };
    //       })
    //     );
    //     return {
    //       ...order._doc,
    //       orderedItems: products,
    //     };
    //   })
    // );

    return orders
  } catch (err) {
    throw err;
  }

  return orders;
};

const updateOrderStatus = async (status, OrderId) => {
  let response;

  try {
    response = await OrderDb.findByIdAndUpdate({ _id: OrderId }, status, {
      new: true,
    });
  } catch (err) {
    throw err;
  }

  return response;
};

const deleteOrder = async (orderId) => {
  let response;

  try {
    response = await OrderDb.findByIdAndDelete({ _id: orderId });
  } catch (err) {
    throw err;
  }

  return response;
};

const getTodaysOrders = async () => {
  let response;

  const currentDate = new Date();

  const startOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const endOfDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 1
  );

  try {
    response = await OrderDb.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    response = await Promise.all(
      response.map(async (order) => {
        let orderedItems = order.orderedItems;

        const products = await Promise.all(
          orderedItems.map(async (item) => {
            let product = await getProductById(item.productId);

            return { ...product._doc, quntity: item.quntity };
          })
        );

        return {
          ...order._doc,
          orderedItems: products,
        };
      })
    );
  } catch (err) {
    throw err;
  }

  return response;
};

const getUsersOrders = async (id) => {
  try {
    let response = await OrderDb.find({ userId: id }).populate(
      "orderedItems.productId"
    );
    return { data: response, success: true };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  postOrder,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getTodaysOrders,
  getUsersOrders,
};
