const express = require('express')

const  { httpPostOrder,httpGetAllOrders,httpOrderStatus } =   require('./order.controller');

const orderRouter = express.Router();






orderRouter.post('/postOrder',httpPostOrder)
orderRouter.get('/getAllOrders',httpGetAllOrders)
orderRouter.patch('/updateOrderStatus/:id',httpOrderStatus)


module.exports = orderRouter

