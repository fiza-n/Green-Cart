import { mongoose, model } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
},
    name: {
      type: String,
      required: true,
    },
    description: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    images: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
  { minimize: false },
);

const Product = mongoose.model("product", productSchema);

export default Product;
