import { verifyToken } from "../services/auth.js";

const checkForAuthenticationSeller = async (req, res, next)=>{
    const tokenCookie = req.cookies?.sellerToken
    

    if(typeof tokenCookie !== "string" || !tokenCookie.trim())
        return next()

    try {
        // quick token summary for debugging
        const tokenSummary = { type: typeof tokenCookie, length: tokenCookie?.length, hasBearer: typeof tokenCookie === 'string' && tokenCookie.toLowerCase().startsWith('bearer ') };
        // console.debug('Seller token summary:', tokenSummary)
        const token = await verifyToken(tokenCookie)
        if(token?.email === process.env.SELLER_EMAIL){
        req.userId = token._id || token.id
        return next()
        }else {
            return res.status(401).json({success: false, message: "Not Authorized"})
        }
    } catch (err) {
        console.log("Invalid token:", err.message)
        req.user = null
    }

    return next()

}

export{checkForAuthenticationSeller}