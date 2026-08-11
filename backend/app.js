import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import DBConnect from "./configs/db.js"
import { checkForAuthentication } from "./middlewares/user.js"
import userRouter from "./routes/user.js"
import sellerRouter from "./routes/seller.js"
import { checkForAuthenticationSeller } from "./middlewares/seller.js"

const app = express()
const PORT = process.env.PORT  || 8000

//DB Connection
await DBConnect(process.env.MONGODB_URI)

//allow multiple origins
const allowedOrigins = ["http://localhost:5173"]


//middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(checkForAuthentication)
app.use(checkForAuthenticationSeller)
app.use(cors({origin: allowedOrigins, credentials: true}))

//routes
app.use("/api/user" ,userRouter)
app.use("/api/seller", sellerRouter)

app.listen(PORT, ()=> console.log("Server is running on port", PORT))
