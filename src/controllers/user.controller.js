import { upload } from '../middlewares/multer.middleware.js';
import { uploadAvatarOnCloudinary } from '../models/cloudinary.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    //get user details from frontend
    const { username, email, password, fullname } = req.body;

    //validation - not empty
    if(
        [fullname, email, password, username].some((field) => !field || field?.trim() === "")
    ){
        throw new ApiError(400, "🔴All fields are required");
    }

    // check if user already exists: username, email
    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    });
    if(existedUser){
        throw new ApiError(409, "🔴User already exists");
        
    }
    
    // check for avatar
    const avatarLocalPath = await req.files?.avatar?.[0].path; 
    if(!avatarLocalPath){
        throw new ApiError(400, "🔴Avatar file is required");
    }

    // upload avatar to cloudinary
    const avatar = await uploadAvatarOnCloudinary(avatarLocalPath);
    if(!avatar){
        throw new ApiError(400, "🔴Avatar file is required");
    }

    // create user object - create entry in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        email,
        password,
        username: username.toLowerCase()
    });
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // check for user creation
    if(!createdUser){
        throw new ApiError(500, "🔴Something went wrong while registering the user")
    }

    // return res
    return res.status(201).json(
        new ApiResponse(200, createdUser, "🟢User registered Successfully !!")
    )


});

export { registerUser };