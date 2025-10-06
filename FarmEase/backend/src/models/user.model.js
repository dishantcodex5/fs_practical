import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    'username' : {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
        trim: true
    },
    'email' : {
        type: String,
        unique: true,
        required: true,
        index: true,
        lowercase: true,
    },
    'password' : {
        type: String,
        required: true,
    },
    'avatar': {
        type: String,
        default: 'nothing'
    },
    'isFarmer': {
        type: Boolean,
        required: true
    },
    'refreshToken' : {
        type: String
    },
    'products' : {
        type:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            }
        ],
        default: []
    }, 
    'cart': {
        type: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                quantity: { type: Number, default: 1 }
            }
        ],
        default: []
    }

}, {timestamps: true})


userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


const User = mongoose.model("User", userSchema)

export default User