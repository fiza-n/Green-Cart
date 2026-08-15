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

    // Normalize common wrappers: "Bearer <token>", quoted strings, URL-encoded
    let raw = token.trim();
    if (raw.toLowerCase().startsWith("bearer ")) raw = raw.slice(7).trim();
    if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
        raw = raw.slice(1, -1);
    }
    try {
        raw = decodeURIComponent(raw);
    } catch (e) {
        // ignore decode errors, proceed with raw
    }

    // Basic structural check for JWT (should have two dots)
    const dotCount = (raw.match(/\./g) || []).length;
    if (dotCount !== 2) {
        throw new Error("Invalid token structure")
    }

    return jwt.verify(raw, JWT_SECRET)
}

export{
    createTokenForUser,
    verifyToken
}