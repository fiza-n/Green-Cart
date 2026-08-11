import { verifyToken } from "../services/auth.js";

const checkForAuthenticationSeller = async (req, res, next)=>{
    const tokenCookie = req.cookies?.sellerToken
    

    if(typeof tokenCookie !== "string" || !tokenCookie.trim())
        return next()

    try {
        token = verifyToken(tokenCookie)
        if(token.email === process.env.SELLER_EMAIL){
           next()
        } else {
            return res.status(401).json({success: false, message: "Not Authorized"})
        }
    } catch (err) {
        console.log("Invalid token:", err.message)
        req.user = null
    }

    return next()

}

export{checkForAuthenticationSeller}