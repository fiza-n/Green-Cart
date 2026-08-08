import jwt from "jsonwebtoken"
import "dotenv/config"

async function createTokenForUser(user){
    const payload = {
        _id: user._id,
        email: user.email
    }
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "30d"
    })
    return token;
}

async function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET)
    
}

export{
    createTokenForUser,
    verifyToken
}