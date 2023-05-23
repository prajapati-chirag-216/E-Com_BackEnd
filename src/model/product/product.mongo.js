const mongoose = require("mongoose");

const ProductInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        require: true,
      },
    ],
    status: {
      type: String,
      require: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
  },
  { timestamps: true }
);

ProductInfoSchema.virtual("productReviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId",
});

const Product = mongoose.model("productInfo", ProductInfoSchema);
module.exports = Product;
