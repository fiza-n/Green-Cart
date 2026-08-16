import Product from "../models/product.js"
import { v2 as cloudinary } from "cloudinary"

export const addProduct = async (req, res) => {
    try {
        const images = req.files || []

        if (!images.length) {
            return res.status(400).json({ success: false, message: "Please upload at least one image" })
        }

        const productData = JSON.parse(req.body.productData || "{}")

        const imagesUrl = await Promise.all(
            images.map(async (img) => {
               let result = await cloudinary.uploader.upload(img.path, { resource_type: 'image', folder: 'greencart' });
                return result.secure_url
            })
        )

        await Product.create({
            ...productData,
            images: imagesUrl,
        })

        return res.status(201).json({ success: true, message: "Product Added" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Product not Added" });
    }
}

export const productList =async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ status: true, products })
    }
    catch (error) {
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


