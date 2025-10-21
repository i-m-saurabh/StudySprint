import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadFileOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath)
            return null;
        //upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto", folder: "StudySprint/Files"})

        //file uploaded successfully & delete the file at localFilePath
        console.log("file is uploaded on cloudinary", response);
        fs.unlinkSync(localFilePath)  
        return response;
    } catch (error) {
        //remove the locally saved temporary file as the upload operation got failed
        fs.unlinkSync(localFilePath)            
        return null;
    }
}

const uploadAvatarOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath)
            return null;
        //upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto", folder: "StudySprint/Avatars"})

        //file uploaded successfully & delete the file at localFilePath
        // console.log("file is uploaded on cloudinary", response);
        fs.unlinkSync(localFilePath)  
        return response;
    } catch (error) {
        //remove the locally saved temporary file as the upload operation got failed
        fs.unlinkSync(localFilePath)            
        return null;
    }
}

const getThumbnailURL = (response)=>{
    const thumbnailUrl = cloudinary.url(response.public_id, {
        width: 200,
        height: 200,
        crop: "fill",
        folder: "StudySprint/Thumbnails"
    });
    return thumbnailUrl;
}

export {uploadFileOnCloudinary, uploadAvatarOnCloudinary, getThumbnailURL};