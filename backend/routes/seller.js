import express from "express"
import { handleSellerSignin } from "../controllers/sellerController.js"
import { handleSellerSignout } from "../controllers/sellerController.js"


const router = express.Router()

router.post("/signin", handleSellerSignin)
router.get("/signout", handleSellerSignout)


export default router