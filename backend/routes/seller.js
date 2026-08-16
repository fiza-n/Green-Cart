import express from "express"
import { handleSellerSignout,handleSellerIsAuth,handleSellerSignin } from "../controllers/sellerController.js"


const router = express.Router()

router.post("/signin", handleSellerSignin)
router.get("/signout", handleSellerSignout)
router.get("/is-auth",handleSellerSignin)


export default router