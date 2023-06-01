const OrderDb= require("../Order/order.mongo")
const {getProductById} = require('../product/product.model')

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


    let orders;

    try{

        orders = await OrderDb.find();

   

   
       orders =  await Promise.all(orders.map(async(order) =>{

           
            let orderedItems = order.orderedItems;
            
            
            const products =  await Promise.all(orderedItems.map(async(item) => {
                
                let product = await getProductById(item.productId);

              console.log(product)
                
                return {...product._doc,
                    quntity:item.quntity}
                
            }))

            
            return {
                ...order._doc,
                orderedItems:products
            }
                   

            
         }
         
         
         
         ))

           
         
        
   

    }catch(err){

          throw err
    }

     return orders
       
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