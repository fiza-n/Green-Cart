import { mongoose, model } from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
     
    },

    country: {
      type: String,
      required: true,
      default: "Pakistan"
    },
    label:{
    type: String,
  
    },
    instructions:{
    type: String,
    
    }
  },
  { timestamps: true },
  { minimize: false },
);

const Address = mongoose.model("product", addressSchema);

export default Address;
