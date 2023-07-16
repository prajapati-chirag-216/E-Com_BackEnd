const Display = require("../../model/displayImg/displaySchema");
const  {encode}  = require('blurhash')
const fs = require('fs')
const axios = require('axios')
const sharp =  require('sharp');

const addImageHandler = async (req, res) => {

  const imgUrl = req.body.image;


  const hash = await generateBlurHash(imgUrl); 
  

 const displayData = req.body;

displayData = {
  ...displayData,
  blurhash:hash
}

  try {
    const data = new Display(displayData);
    await data.save();
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(err.status || 404).send(err);
  }
};


const generateBlurHash = async(imgUrl) =>{
    
    const response = await axios.get(imgUrl, { responseType: 'arraybuffer' });
   const imageBuffer = Buffer.from(response.data, 'binary');
 
   // Save the image locally
   const imagePath = 'images/myimage.jpg';
   fs.writeFileSync(imagePath, imageBuffer);
 
 
   const encodeImageToBlurhash = async(imgPath) =>
   new Promise((resolve, reject) => {
     sharp(imgPath)
       .resize(32, 32, { fit: 'inside' })
       .ensureAlpha()
       .raw()
       .toBuffer((err, buffer, { width, height }) => {
         if (err) return reject(err);
 
         const pixelArray = new Uint8ClampedArray(buffer, 0, width * height * 4);
         const blurhash = encode(pixelArray, width, height, 4, 4);
         resolve(blurhash);
       });
   });


   const blurhash = await encodeImageToBlurhash(imagePath)

   fs.unlinkSync(imagePath);

   return blurhash;   
}


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
  generateBlurHash
};
