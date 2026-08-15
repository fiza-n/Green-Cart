import express from "express"
import { checkForAuthentication } from "../middlewares/user.js"
import { addAddress, getAddress } from "../controllers/addressController.js"


const router = express.Router()

router.post("/add-address", addAddress)
router.get("/get-address", getAddress)

export default router