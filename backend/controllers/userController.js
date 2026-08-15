import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { createTokenForUser } from "../services/auth.js";

async function hashPassword(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function handleUserSignup(req, res) {
  try {
    const { fullname, email, password} = req.body;
    if (!fullname || !email || !password) {
      return res.json({
        success: "Error",
        message: "Invalid Input",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({
        success: "Error",
        message: "User exist with provided email",
      });

    const hashedPassword = await hashPassword(password);
   const user =  await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    const token = await createTokenForUser(user);
    res.cookie("token", token, {
      httpOnly: true, //preventing js to access cookie
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none": "strict"//CSRF protection
      
    });

    return res.status(201).json({success: "true", message: "User created successfully"})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error?.message || String(error) });
  }
}

async function handleUserSignin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({success: false, message: "User not found"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Incorrect email or password",
      });
    }

    const token = await createTokenForUser(user);
    res.cookie("token", token, {
      httpOnly: true, //preventing js to access cookie
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none": "strict"//CSRF protection
      
    });
    return res.json({success: true, email: user.email, name: user.fullname })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error?.message || "Incorrect email or password" });
  }
}

async function handleUserSignout(req, res) {
   res.clearCookie("token", {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none": "strict"
      
    });
    return res.json({success: true, message: "User signed out successfully!"})
  }
export { handleUserSignup, handleUserSignin, handleUserSignout };
