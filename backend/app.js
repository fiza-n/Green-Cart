import express from "express"
import path from "path"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import DBConnect from "./configs/db.js"
import { checkForAuthentication } from "./middlewares/user.js"
import userRouter from "./routes/user.js"
import sellerRouter from "./routes/seller.js"
import { checkForAuthenticationSeller } from "./middlewares/seller.js"
import productRouter from "./routes/product.js"
import cartRouter from "./routes/cart.js"
import addressRouter from "./routes/address.js"
import orderRouter from "./routes/order.js"
import { stripeWebhooks } from "./controllers/orderController.js"
const app = express()
const PORT = process.env.PORT  || 8000
app.set("trust proxy", 1)

//DB Connection
await DBConnect(process.env.MONGODB_URI)

//allow multiple origins
const allowedOrigins = ["http://localhost:5173", "https://green-cart-black.vercel.app"]

app.post("/online", express.raw({type: "json/application"}), stripeWebhooks)


//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// app.use(checkForAuthentication)
// app.use(checkForAuthenticationSeller)
app.use(cors({origin: allowedOrigins, credentials: true}))

// authentication middlewares run after CORS so cookies and CORS headers are available
app.use(checkForAuthentication)
app.use(checkForAuthenticationSeller)

// serve uploaded product images (multer disk storage)
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")))

app.get("/", (req, res)=>{
    res.status(200).json({ success: true, message: "Api is working" })
})

//routes
app.use("/api/user" ,userRouter)
app.use("/api/seller", sellerRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/address", addressRouter)
app.use("/api/order", orderRouter)

export default app

if (process.env.VERCEL !== "1") {
    app.listen(PORT, ()=> console.log("Server is running on port", PORT))
}