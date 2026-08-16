import {mongoose, model} from "mongoose"

const orderSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
},
    items:[
      {  product:{
        type:String,
        required: true,
        ref: "product"
    },
 quantity:{
        type:Number,
        required: true,
        
    }}],
    amount:{
        type: Number,
        required: true,
        
    },
    address:{
        type:String,
       required: true,
       ref: "address"
    },

   status:{
    type:String,
    default:"Order placed"
   }, 
   paymentType:{
        type:String,
       required: true,
      
    },
      isPaid:{
        type:Boolean,
       required: true,
        default: false
    },
}, {timestamps: true})

const Order = mongoose.model("order", orderSchema)

export default Order