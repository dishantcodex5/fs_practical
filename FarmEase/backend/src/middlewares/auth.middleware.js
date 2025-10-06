import jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError.js'
import User from '../models/user.model.js'

const verifyJWT = async (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        if (!accessToken) {
            return res.status(401).json({
                message: "Authentication required. Please login."
            });
        }

        try {
            // Verify the token
            const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            
            // Find user and exclude sensitive fields
            const user = await User.findById(decodedToken?._id)
                .select("-refreshToken -password")
                .populate("cart.product"); // Populate cart products

            if (!user) {
                return res.status(401).json({
                    message: "User not found or session expired"
                });
            }

            // Attach user to request object
            req.user = user;
            next();
        } catch (tokenError) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).json({
            message: "Internal server error during authentication"
        });
    }
}

export default verifyJWT