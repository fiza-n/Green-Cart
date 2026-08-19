import multer from "multer";
 
// We no longer write to local disk (Vercel's filesystem is read-only/ephemeral
// in serverless functions). Files are kept in memory as a Buffer, then
// productController.js uploads that buffer straight to Vercel Blob storage.
const storage = multer.memoryStorage();
 
export const upload = multer({ storage });