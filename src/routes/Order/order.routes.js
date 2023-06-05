const express = require('express')

const  { httpPostOrder,httpGetAllOrders,httpOrderStatus,httpGetOrderById,httpDeleteOrder,httpsGetTodaysOrders } =   require('./order.controller');

const orderRouter = express.Router();






orderRouter.post('/postOrder',httpPostOrder)
orderRouter.get('/getAllOrders',httpGetAllOrders)
orderRouter.patch('/updateOrderStatus/:id',httpOrderStatus)
orderRouter.get('/getOrderById/:id',httpGetOrderById)
orderRouter.delete('/deleteOrder/:id',httpDeleteOrder)
orderRouter.get('/getTodaysOrders',httpsGetTodaysOrders)



module.exports = orderRouter

