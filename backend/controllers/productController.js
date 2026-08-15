import Product from "../models/product.js"
import { v2 as cloudinary } from "cloudinary"

export const addProduct = async (req, res) => {
    try {
        let productData = req.body.productData
        const images = req.files

        const imagesUrl = await Promise.all(
            images.map(async (img) => {
                let result = await cloudinary.uploader.upload(img.path, { resource_type: 'image' });
                return result.secure_url
            })
        )
        await Product.create({
            ...productData, image: imagesUrl
        })
        return res.status(201).json({ success: true, message: "Product Added" })
    } catch (error) {
        console.log(error)
        return res.json({ success: "Error", message: "Product not Added" });
    }
}

export const productList =async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ status: true, products })
    }
    catch (err) {
        console.log(error)
        return res.json({ success: "Error", message: "No Product found" });
    }
}

export const productById = async(req, res) => {
    try {
        const { id } = req.body
        const productById = await Product.findById(id)
        res.json({ status: true, productById })
    } catch (error) {
        console.log(error)
        return res.json({ success: "Error", message: error.message });
    }
}

export const changeStock = async (req, res) => {
    try {
          const { id, inStock } = req.body
          await Product.findByIdAndUpdate(id, {inStock})
           res.json({ status: true, message: "Stock Updated" })
    } catch (error) {
        console.log(error)
        return res.json({ success: "Error", message: error.message });
    }
}


