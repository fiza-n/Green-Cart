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
    const { fullname, email, password, cartItems } = req.body;
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
    await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    return res.redirect("/");
  } catch (error) {
    return res.json({ success: "Error", message: error });
  }
}

async function handleUserSignin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.redirect("/signup");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).render("signin", {
        error: "Incorrect email or password",
      });
    }

    const token = createTokenForUser(user);
    res.cookie("token", token, {
      httpOnly: true, //preventing js to access cookie
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none": "strict"//CSRF protection
      
    });
    return res.redirect("/")
  } catch (error) {
    console.log(error);
    return res.status(500).render("signin", {
      error: "Incorrect email or password",
    });
  }
}

async function handleUserSignout(req, res) {
  return res.clearCookie("token").redirect("/");
}

export { handleUserSignup, handleUserSignin, handleUserSignout };
