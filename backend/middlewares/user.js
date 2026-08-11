import { verifyToken } from "../services/auth.js";


async function checkForAuthentication(req, res, next){
    const tokenCookie = req.cookies?.token
    req.user = null

    if(typeof tokenCookie !== "string" || !tokenCookie.trim())
        return next()

    try {
        req.user = verifyToken(tokenCookie)
        if(req.user?._id){
            req.userId = req.user._id
        } else {
            return res.status(401).json({success: false, message: "Not Authorized"})
        }
    } catch (err) {
        console.log("Invalid token:", err.message)
        req.user = null
    }

    return next()
}

function restrictTo(role = []){
    return function(req, res, next){
        if(!req.user) return res.redirect("/login")

        if(!role.includes(req.user.role)) return res.end("UnAuthorized")

        return next()
    }
}
export{
    checkForAuthentication,
    restrictTo
}