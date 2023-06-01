const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(

{

     contactInformation:{

        email:{
            type:String,
            required:true
        },
        phoneNumber:{
           type:Number,
           required:true
        }
     },
     
     shippingAddress:{
        country:{
            type:String,
            required:true
        },
        userName:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        pinNumber:{
            type:String,
            required:true
        }
     },
     deliveryStatus:{
         type:String,
         default:'Pending',
         required:true
     },
     orderedItems:{
        type:Array,
        required:true

     },
     totalPrice:{
        type:Number,
        required:true
     }

    },
{timestamps:true}
)
module.exports = mongoose.model('Order',orderSchema)