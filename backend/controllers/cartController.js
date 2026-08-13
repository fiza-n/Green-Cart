import User from "../models/user.js"


export const updateCart = async (req, res) => {
   try {
     const { _id, cartItems} = req.body
    await User.findByIdAndUpdate(_id, {cartItems})
    return res.json({ success: true, message: "Cart Updated" })
   } catch (error) {
     console.log(error)
        return res.json({ success: "Error", message: "Cart not Updated" });
   }
}