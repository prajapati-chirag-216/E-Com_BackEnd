const { postOrder,getAllOrders,updateOrderStatus,getOrderById,deleteOrder,getTodaysOrders} =  require( "../../model/Order/order.model");


const httpPostOrder = async(req,res) =>{


const userData = req.body;


   const result = await postOrder(userData)


   if (!result) {
    return res.status(400).json({
      error: "Your Order was Canceled!",
    });
  }

  return res.status(200).json(result);



}


const httpGetAllOrders = async(req,res) =>{


        const result = await getAllOrders();
          

        if (!result) {
          return res.status(400).json({
            error: " Orders was Not Found!",
          });
        }
      
        return res.status(200).json(result)
      }

  const httpOrderStatus = async(req,res) =>{

      const status = req.body;

     
      const OrderId = req.params.id

      const result = await updateOrderStatus(status,OrderId);


      if (!result) {
        return res.status(400).json({
          error: "Your Order Status was Not Updated!",
        });
      }
    
      return res.status(200).json(result)
      
  }



 const  httpGetOrderById = async(req,res)  =>{


       const orderId = req.params.id;

       const result = await getOrderById(orderId);


       if (!result) {
        return res.status(400).json({
          error: "Your Order  was Not Found!",
        });
      }

      return res.status(200).json(result)
        
 }


 const httpDeleteOrder = async(req,res) =>{

     const id = req.params.id;

      const result = await deleteOrder(id);

      if (!result) {
        return res.status(400).json({
          error: "Your Order  was Deleted!",
        });
      }

      return res.status(200).json(result)

 }

 const httpsGetTodaysOrders = async(req,res) =>{

       const result = await getTodaysOrders();

       if (!result) {
        return res.status(400).json({
          error: "Your Order  was Not Found!",
        });
      }

      return res.status(200).json(result)

 }

module.exports =    {
    
    httpPostOrder,
    httpGetAllOrders,
    httpOrderStatus,
    httpGetOrderById,
    httpDeleteOrder,
    httpDeleteOrder,
    httpsGetTodaysOrders
}
     
