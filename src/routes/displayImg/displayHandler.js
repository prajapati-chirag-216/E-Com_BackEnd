const Display = require("../../model/displayImg/displaySchema");

const addImageHandler = async (req, res) => {

  
 const imageLink = Object.keys(req.body)[0];

 
 try {
   const data = new Display({ image: imageLink });
   await data.save();
   console.log(data)
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(err.status || 404).send(err);
  }
};

const fetchImageHandler = async (req, res) => {
  try {
    const data = await Display.find();
    // let images = [];
    // data.map((img) => {
    //   images.push({
    //     img_data: Buffer.from(img.image, "binary").toString("base64"),
    //     id: img._id,
    //   });
    // });
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
