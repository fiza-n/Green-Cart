import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import DBConnect from "./configs/db.js"
import { checkForAuthentication } from "./middlewares/user.js"

const app = express()
const PORT = process.env.PORT  || 8000

//DB Connection
await DBConnect(process.env.MONGODB_URI)

//allow multiple origins
const allowedOrigins = ["http://localhost:5173"]


//middlewares
app.use(checkForAuthentication)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))

app.listen(PORT, ()=> console.log("Server is running on port", PORT))
