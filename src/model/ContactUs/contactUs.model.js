const MessageDb = require('../ContactUs/contactUs.mongo')



const postUserMessage = async(message) =>{
  
    try{
        
        const data = new MessageDb(message);

         await data.save();

         return data;
         
    }catch(err){

         throw err
    }
     
       
}

module.exports = {postUserMessage}