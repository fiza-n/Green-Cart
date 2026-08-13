import express from "express"
import { updateCart } from "../controllers/cartController.js"
import { checkForAuthentication } from "../middlewares/user.js"


const router = express.Router()

router.post("/update", checkForAuthentication ,updateCart)
export default router