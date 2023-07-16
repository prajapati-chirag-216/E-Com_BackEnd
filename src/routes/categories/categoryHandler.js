const Category = require("../../model/category/categorySchema");
const generateBlurHash = require('../displayImg/displayHandler')

const addCategoryHandler = async (req, res) => {

 
  const imgUrl = req.body.image;


  const hash = await generateBlurHash(imgUrl); 
  

 const displayData = req.body;

displayData = {
  ...displayData,
  blurhash:hash
}
 

  try {
    const data = await Category.findOneAndUpdate(
      { name: req.body.name },
      { ...displayData },
      { upsert: true, new: true }
    );
    await data.save();
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(err.status || 404).send(err || "somthing went Wrong!");
  }
};
const fetchCategoriesHandler = async (req, res) => {
  try {
    const data = await Category.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(err.status || 404).send(err || "somthing went Wrong!");
  }
};
const fetchCategoryHandler = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id).select({ name: 1 });
    res.status(200).send(data);
    // res.status(401).send({ message: "curruntly unavailable" });
  } catch (err) {
    res.status(err.status || 404).send(err.message || "somthing went Wrong!");
  }
};

const updateCategoryHandler = async (req, res) => {
  const catagoryId = req.params.id;
  const data = req.body;


  
  const imgUrl = req.body.image;


  const hash = await generateBlurHash(imgUrl); 
  

 const displayData = req.body;

displayData = {
  ...displayData,
  blurhash:hash
}

  

  try {
    const result = await Category.findByIdAndUpdate(
      { _id: catagoryId },
      { ...displayData },
      { new: 1 }
    );

    return res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 404).send(err || "somthing went Wrong!");
  }
};

const deleteCategoryHandler = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);
    if (data.length == 0 || !data) {
      throw { status: 500, message: "Item not Exist!" };
    }
    data.removeProducts();
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(err.status || 404).send(err.message || err);
  }
};

const httpGetCategoryByName = async (req, res) => {
  const catagoryName = req.params.name;

  try {
    const data = await Category.findOne({ name: catagoryName }).select({
      _id: 1,
    });

    return res.status(200).json(data._id.toString());
  } catch (err) {
    res.status(err.status || 404).send(err.message || "somthing went Wrong!");
  }
};

module.exports = {
  fetchCategoriesHandler,
  fetchCategoryHandler,
  addCategoryHandler,
  deleteCategoryHandler,
  updateCategoryHandler,
  httpGetCategoryByName,
};
