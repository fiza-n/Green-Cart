// One-off backfill script.
// Sets inStock: true on any existing product that doesn't have the field yet
// (i.e. products created before inStock was added to the schema).
//
// Run once from the backend folder:
//   node scripts/backfillInStock.js
//
// Uses the same MONGODB_URI your backend already reads from backend/.env

import "dotenv/config"
import mongoose from "mongoose"
import Product from "../models/product.js"

async function run() {
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is not set in backend/.env")
        process.exit(1)
    }

    await mongoose.connect(process.env.MONGODB_URI, { family: 4 })
    console.log("Connected to MongoDB")

    const result = await Product.updateMany(
        { inStock: { $exists: false } },
        { $set: { inStock: true } }
    )

    console.log(`Matched ${result.matchedCount ?? result.n} product(s), updated ${result.modifiedCount ?? result.nModified}.`)

    await mongoose.disconnect()
    console.log("Done.")
}

run().catch((err) => {
    console.error("Backfill failed:", err)
    process.exit(1)
})