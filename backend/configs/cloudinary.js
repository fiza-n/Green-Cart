import {v2 as cloudinary }from "cloudinary"

async function cloudinaryConnect() {
  try {
    await cloudinary.config({
       cloud_name: process.env.CLOUD_NAME,
       api_key : process.env.API_KEY,
       api_secret: process.env.API_SECRET

    })
    console.log("Cloudinary config now:", cloudinary.config())
    
    console.log("Connected to Cloudinary")
    return true
  } catch (err) {
    console.log("Error connecting to Cloudinary", err)
    throw err
  }
}

export default cloudinaryConnect;