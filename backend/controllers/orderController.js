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