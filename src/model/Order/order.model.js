const OrderDb= require("../Order/order.mongo")


const postOrder = async(userData) =>{


    const data = await new OrderDb(userData)

    let result;

    try{

        result = await data.save();

    }catch(err)
    {
        throw err
    }

  return result
     
}


const getAllOrders = async() =>{


    let response;

    try{

        response = await OrderDb.find();

    }catch(err){

          throw err
    }

     return response
       
}

 const updateOrderStatus = async(status,OrderId) =>{

console.log(1)
    let response;

    try{

        response = await OrderDb.findByIdAndUpdate({_id:OrderId},{
            deliveryStatus:status
        },{new:true})

        console.log(response)
    }catch(err){
        throw err
    }

     return response
 }

module.exports = {
  
postOrder,
getAllOrders,
updateOrderStatus
}