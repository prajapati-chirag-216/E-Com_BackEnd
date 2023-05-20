const ProductDb = require("../../model/product/product.mongo");
const ReviewDb = require('../productReview/productReview.mongo')

const getProducts = async (id) => {
  let result;
  if (id) {
    result = await ProductDb.find({ category: id })
      .sort({ createdAt: 1 })
      .select({ __v: 0 });
  } else {
    result = await ProductDb.find()
      .populate({ path: "category", select: "name _id" })
      .sort({ createdAt: 1 })
      .select({ __v: 0 });
  }
  return result;
};
const getProductDetails = async (id) => {
  let result;
  if (id) {
    result = await ProductDb.findById(id);
  }
  return result;
};

const addProduct = async (product) => {
  const res = await ProductDb.findOneAndUpdate(
    { name: product.name },
    { ...product },
    { upsert: true, new: true }
  ).populate("category");

  return res;
};

const deleteProduct = async (productid) => {
  const res = await ProductDb.findOneAndDelete({ _id: productid });

  return res;
};

const updateProduct = async (productData, productId) => {
  const res = await ProductDb.findByIdAndUpdate(
    { _id: productId },
    {
      ...productData,
    },
    { new: 1 }
  );
  return res;
};


const postReview = async(productId,reviewData) =>{


     const reviewObj = { 
       productId,
       ...reviewData     
     }


     const data = new ReviewDb(reviewObj)
     let result;

     try{
        result = await data.save();
 
         console.log('inside model',result)

     }catch(err){
      throw err
     }

     return result;

}

const getReviews = async(id) =>{

console.log(id)
   try{
    const data = await ReviewDb.find({productId:id}).select({__v:0,productId:0})
   
     return data
   }catch(err){
      throw err
   }


}

module.exports = {
  getProducts,
  getProductDetails,
  addProduct,
  deleteProduct,
  updateProduct,
  postReview,
  getReviews
};
