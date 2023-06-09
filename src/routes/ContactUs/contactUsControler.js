const {postUserMessage} = require('../../model/ContactUs/contactUs.model')

const  httpPostMyMeassageHandler = async(req,res) =>{


       const data = req.body;
  
           const result = await postUserMessage(data);
       


       if (!result) {
        return res.status(400).json({
          error: "Your Order  was Not Found!",
        });
      }


      return res.status(200).json(result)
}

module.exports = {httpPostMyMeassageHandler}