import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const uploadOnCloudinary = async (filepath) => {
  try {
    if (!filepath) return null;

    const uploadResult = await cloudinary.uploader.upload(filepath, {
      folder: "wanderlust_Prod",
    });

    fs.unlinkSync(filepath);

    return {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  } catch (error) {
    fs.unlinkSync(filepath);
    console.log("Cloudinary Upload Error:", error);
    return null;
  }
};

export default uploadOnCloudinary;
