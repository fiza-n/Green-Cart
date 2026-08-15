import express from "express"
import { getAllOrders, getUserOrders, placeOrderCOD } from "../controllers/orderController.js"
import { checkForAuthentication } from "../middlewares/user.js"
import { checkForAuthenticationSeller } from "../middlewares/seller.js"


const router = express.Router()

router.post("/cod", checkForAuthentication,placeOrderCOD)
router.get("/user", checkForAuthentication, getUserOrders)
router.get("/seller", checkForAuthenticationSeller,getAllOrders)

export default router