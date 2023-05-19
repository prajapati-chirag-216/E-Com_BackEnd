const Category = require("../../model/category/categorySchema");

const addCategoryHandler = async (req, res) => {
  try {
    const data = await Category.findOneAndUpdate(
      { name: req.body.name },
      { ...req.body },
      { upsert: true, new: true }
    );
    await data.save();
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(404).send(err || "somthing went Wrong!");
  }
};
const fetchCategoriesHandler = async (req, res) => {
  try {
    const data = await Category.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send(err || "somthing went Wrong!");
  }
};
const fetchCategoryHandler = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id).select({ name: 1 });
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send(err || "somthing went Wrong!");
  }
};

const updateCategoryHandler = async (req, res) => {
  const catagoryId = req.params.id;
  const data = req.body;

  try {
    const result = await Category.findByIdAndUpdate(
      { _id: catagoryId },
      { ...data },
      { new: 1 }
    );

    return res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
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
module.exports = {
  fetchCategoriesHandler,
  fetchCategoryHandler,
  addCategoryHandler,
  deleteCategoryHandler,
  updateCategoryHandler,
};
