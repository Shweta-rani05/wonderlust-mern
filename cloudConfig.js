const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// ✅ Correct config (make sure dotenv is loaded before this file)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// ✅ Storage config (FIXES APPLIED)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "wanderlust_DEV", 
    allowed_formats: ["png", "jpg", "jpeg"], // ⚠️ correct key name
  },
});

module.exports = {
  cloudinary,
  storage,
};



