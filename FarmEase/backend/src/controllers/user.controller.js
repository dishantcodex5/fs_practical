import User from '../models/user.model.js'
import Product from '../models/product.model.js'
import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import uploadOnCloudinary from '../utils/cloudinary.js'
import fs from 'fs/promises'

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken  = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
    
        user.refreshToken = refreshToken
    
        await user.save({validateBeforeSave: false})
    
        return {refreshToken, accessToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh Token")
    }
}

const createUser = async (req, res) => {
    try {
        let {username, email, password, isFarmer} = req.body
        isFarmer = isFarmer === 'true' ? true : false
        console.log(typeof(isFarmer))
        if (!username || !email || !password || (isFarmer!=true && isFarmer != false)){
            throw new  ApiError(400, 'Please fill in all fields.')
        }
    
        const existedUser = await User.findOne({
            $or: [{username}, {email}]
        })   
        if (existedUser){
            throw new ApiError(409, 'User with username or email already exists')
        }
    
        const avatarLocalPath = req.file?.path
        let avatar = 'nothing'
        if(avatarLocalPath){
            avatar = await uploadOnCloudinary(avatarLocalPath)
            if(!avatar?.url){
                throw new ApiError(400, 'Avatar upload failed')
            }
            await fs.unlink(avatarLocalPath)
        }
    
    
        const user = await User.create({
            username, 
            email,
            avatar: avatar?.url || 'nothing',
            password,
            isFarmer
        })
    
        const createdUser = await User.findById(user._id).select("-password -refreshToken")
    
        if(!createdUser){
            throw new ApiError(500, "Something went wrong while registering the user.")
        }
    
        const {refreshToken, accessToken} = await generateAccessAndRefreshToken(createdUser._id)
    
        const options = {
            httpOnly: true,
            secure: false,
            maxAge: 48*60*60*1000,      //2 day
            path: '/' 
        }
        console.log(createdUser)
    
        return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .status(200)
        .json(
            new ApiResponse(200, createdUser, 'User created Successfully!')
        )
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const loginUser = async (req, res) => {
    try {
        console.log('login come')
        const {username, email, password} = req.body
        if(!username && !email){
            throw new ApiError(400, "username or email is required")
        }
        const user = await User.findOne({
            $or: [{username}, {email}]
        }).populate('cart.product')
    
        if(!user){
            throw new ApiError(400, "username or email is not found")
        }
    
        if (!await user.isPasswordCorrect(password)){
            throw new ApiError(400, "password is incorrect")
        }
    
        const {refreshToken, accessToken} = await generateAccessAndRefreshToken(user._id)
    
        const options = {
            httpOnly: true,
            secure: false,
            maxAge: 3*24*60*60*1000,      //3 day,
            path: '/'
        }

        // Calculate cart count
        const cartCount = user.cart.reduce((total, item) => total + item.quantity, 0);
        const userData = user.toObject();
        userData.cartCount = cartCount;

        console.log('login end',accessToken, refreshToken, userData)
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, userData,  "login successfully")
        )
    } catch (error) {
        console.log('incorrect password')
        return res.status(401).json(error.message)
    }
}

const currentUser = (req, res) => {
    if (!req.user){
        return res
        .status(401)
        .json(
            new ApiResponse(401, null, "User doesn't Authorised")
        )
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, req.user, "User fetched successfully!")
    )
}


const logout = (req, res) => {
    return res
    .status(200)
    .clearCookie("accessToken",)
    .clearCookie("refreshToken", {secure: false, path: '/', httpOnly: true })
    .json(
        new ApiResponse(200, "logout successfully")
    )
}

const searchUser = async (req, res) => {
    try {
        let {username} = req.body
        let user = await User.findOne({username}).populate('products')
        return res
        .status(200)
        .json({user})
    } catch (error) {
        return res
        .status(401)
        .json({message: error.message})
    }
}

const filterUser = async (req, res) => {
    try{
        let search = req.body.search
        if (!search){
            throw new ApiError(401, "Give search string")
        }
        const users = await User.find({
            $or: [
              { username: { $regex: new RegExp(search, "i") } }, // Case-insensitive regex
              { email: { $regex: new RegExp(search, "i") } }
            ]
          });
        return res
        .status(200)
        .json({users})
    } catch(err){
        return res
        .status(401)
        .json({message: err.message})
    }
}


export {createUser, loginUser, currentUser, logout, searchUser, filterUser}