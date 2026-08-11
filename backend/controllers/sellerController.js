import jwt from "jsonwebtoken";

async function handleSellerSignin(req, res){
  try{
       const { email, password } = req.body;
    if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){

        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.cookie("sellerToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none": "strict"
          
        });
        return res.json({success: true, message: "Signin successfully" })
    }
    else{
        return res.json({success: false, message: "Invalid Credentials" })
    }

  }
 catch (error) {
  console.log(error);
  return res.status(500).json({
    error: "Incorrect email or password",
  });
}
}

async function handleSellerSignout(req, res) {
   res.clearCookie("sellerToken", {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none": "strict"
      
    });
    return res.json({success: true, message: "Seller signed out successfully!"})
  }

  export {handleSellerSignin, handleSellerSignout}