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
export const placeOrderStripe = async (req, res)=>{
   try {
    const {items, address, userId} = req.body

    const {origin} = req.headers
    if(!address || items.length <= 0){
        return res.json({success: false, message: "Invalid data"})
    }

    let productData = []

   let amount = await items.reduce(async (acc, item) => {

    const product = await Product.findById(item.product)
    productData.push({
        name:product.name,
        quantity: item.quantity,
        price:product.offerPrice,


    })
    return (await acc) + product.offerPrice * item.quantity
   }, 0)
   //add tax
    amount+= Math.floor(amount * 0.02)

   const order = await Order.create({
    userId,
    address, items,
    amount,
    paymentType: "Online"
   })

   order.save()
   const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

   const line_items = productData.map((item)=>{
    return{
        price_data:{
            currency: "usd",
            product_data:{
                name:item.name
            },
            unit_amount: Math.floor(item.price + item.price* 0.02) * 100
        },
        quantity: item.quantity,

    }
   })

   const session = await stripeInstance.checkout.sessions.create({
    line_items,
    mode: "payment",
    session_url: `${origin}/loaders?next=my-orders`,
    cancel_url: `${origin}/cart`,
    meta_data:{
        orderId: order._id.toString(),
        userId
    }
   })
   res.json({success: true, url:session.url})
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