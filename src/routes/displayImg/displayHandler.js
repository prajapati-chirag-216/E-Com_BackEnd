const Display = require("../../model/displayImg/displaySchema");

const addImageHandler = async (req, res) => {
  try {
    const data = new Display(req.body);
    await data.save();
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(err.status || 404).send(err);
  }
};

const fetchImageHandler = async (req, res) => {
  try {
    const data = await Display.find();
    res.status(200).send({
      data,
    });
  } catch (err) {
    res.status(err.status || 404).send(err);
  }
};

const deleteImageHandler = async (req, res) => {
  try {
    const data = await Display.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(err.status || 404).send(err);
  }
};
module.exports = {
  addImageHandler,
  fetchImageHandler,
  deleteImageHandler,
};
