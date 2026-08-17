import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import DBConnect from "./configs/db.js"
import { checkForAuthentication } from "./middlewares/user.js"
import userRouter from "./routes/user.js"
import sellerRouter from "./routes/seller.js"
import { checkForAuthenticationSeller } from "./middlewares/seller.js"
import cloudinaryConnect from "./configs/cloudinary.js"
import productRouter from "./routes/product.js"
import cartRouter from "./routes/cart.js"
import addressRouter from "./routes/address.js"
import orderRouter from "./routes/order.js"
import { stripeWebhooks } from "./controllers/orderController.js"
const app = express()
const PORT = process.env.PORT  || 8000

//DB Connection
await DBConnect(process.env.MONGODB_URI)
await cloudinaryConnect()

//allow multiple origins
const allowedOrigins = ["http://localhost:5173"]

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
app.get("/", (req, res)=>{
    console.log("Api is working")
})

//routes
app.use("/api/user" ,userRouter)
app.use("/api/seller", sellerRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/address", addressRouter)
app.use("/api/order", orderRouter)

app.listen(PORT, ()=> console.log("Server is running on port", PORT))
