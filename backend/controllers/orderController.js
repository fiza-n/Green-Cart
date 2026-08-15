import Order from "../models/order.js"
import Product from "../models/product.js"


export const placeOrderCOD = async (req, res)=>{
   try {
    const {items, address, userId} = req.body
    if(!address || items.length <= 0){
        return res.json({success: false, message: "Invalid data"})
    }

   let amount = await items.reduce(async (acc, item) => {
    const product = await Product.findById(item.product)
    return (await acc) + product.offerPrice * item.quantity
   }, 0)
   //add tax
    amount+= Math.floor(amount * 0.02)

   const order = await Order.create({
    userId,
    address, items,
    amount,
    paymentType: "COD"
   })

   order.save()
   res.json({success: true, message: "Order Placed"})
   } catch (error) {
     console.log(error)
    return res.json({ success: "Error", message: error.message });
   }



}

export const getUserOrders = async (req, res) => {
    try{
        const { userId } =req.body
        const orders = await Order.find({
            userId,
            $or:[{paymentType: "COD", isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1})
        res.json({success: true, orders})
    }
    catch(error){
     console.log(error)
    return res.json({ success: "Error", message: error.message });
    }
}

export const getAllOrders = async (req, res)=>{
  try{
        const orders = await Order.find({
            $or:[{paymentType: "COD", isPaid: true}]
        }).populate("items.product address")
        res.json({success: true, orders})
    }
    catch(error){
     console.log(error)
    return res.json({ success: "Error", message: error.message });
    }
}