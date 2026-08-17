import express from "express"
import { getAllOrders, getUserOrders, placeOrderCOD,placeOrderStripe } from "../controllers/orderController.js"
import { checkForAuthentication } from "../middlewares/user.js"
import { checkForAuthenticationSeller } from "../middlewares/seller.js"



const router = express.Router()

router.post("/cod", checkForAuthentication,placeOrderCOD)
router.get("/my-orders", checkForAuthentication, getUserOrders)
router.get("/seller", checkForAuthenticationSeller,getAllOrders)
router.post("/online", checkForAuthentication,placeOrderStripe)

export default router