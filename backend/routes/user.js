import express from "express"
import {handleUserSignin, handleUserSignout, handleUserSignup} from "../controllers/userController.js"
import { checkForAuthentication } from "../middlewares/user.js"

const router = express.Router()

router.post("/signup", handleUserSignup )
router.post("/signin", handleUserSignin )
router.get("/signout", handleUserSignout)


export default router