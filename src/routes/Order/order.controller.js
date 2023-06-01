const { postOrder,getAllOrders,updateOrderStatus } =  require( "../../model/Order/order.model");


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

      console.log(status)
      const OrderId = req.params.id

      const result = await updateOrderStatus(status,OrderId);


      if (!result) {
        return res.status(400).json({
          error: "Your Order Status was Not Updated!",
        });
      }
    
      return res.status(200).json(result)
      
  }

module.exports =    {
    
    httpPostOrder,
    httpGetAllOrders,
    httpOrderStatus
}
     
