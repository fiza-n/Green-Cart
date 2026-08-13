import { mongoose, model } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
    inStock: {
      type: Boolean,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    files: {
      type: Array,
      default: true,
    },
  },
  { timestamps: true },
  { minimize: false },
);

const Product = mongoose.model("product", productSchema);

export default Product;
