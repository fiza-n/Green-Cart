import jwt from "jsonwebtoken"
import "dotenv/config"

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required")
}

async function createTokenForUser(user){
    const payload = {
        _id: user._id,
        email: user.email
    }
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "30d"
    })
    return token;
}

async function verifyToken(token) {
    if (typeof token !== "string" || !token.trim()) {
        throw new Error("Invalid token")
    }
    return jwt.verify(token, JWT_SECRET)
}

export{
    createTokenForUser,
    verifyToken
}