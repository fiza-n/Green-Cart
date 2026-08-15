import express from "express"
import { addProduct, changeStock, productById, productList } from "../controllers/productController.js"
import { upload } from "../configs/multer.js"
import { checkForAuthenticationSeller } from "../middlewares/seller.js"

const router = express.Router()

router.post("/add-product", upload.array('images'), checkForAuthenticationSeller, addProduct)
router.get("/product-list", productList)
router.get("/:id", productById)
router.post("/stock", checkForAuthenticationSeller,changeStock)

export default router