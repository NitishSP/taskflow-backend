const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Authentication Middleware - Protects routes by verifying JWT access token
 * 
 * Concept: This middleware acts as a gatekeeper. Before allowing access to
 * protected routes, it checks if the user has a valid access token.
 * 
 * Flow:
 * 1. Extract token from Authorization header
 * 2. Verify token is valid and not expired
 * 3. Find user from token payload
 * 4. Attach user to request object
 * 5. Continue to next middleware/route handler
 */

const protect = async (req, res, next) => {
    try {
        // Step 1: Get token from Authorization header
        // Expected format: "Bearer <token>"
        const authHeader = req.headers.authorization;

        // Check if authorization header exists and starts with "Bearer"
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // Extract token (remove "Bearer " prefix)
        const token = authHeader.split(' ')[1];

        // Step 2: Verify the token
        // jwt.verify() checks:
        // - Token signature is valid
        // - Token hasn't expired
        // - Token was signed with our secret key
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        // Step 3: Find user from token payload
        // We don't include password in the result for security
        const user = await User.findById(decoded.id).select('-password -refreshToken');

        // Check if user still exists (user might have been deleted)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found. Token is invalid.'
            });
        }

        // Step 4: Attach user to request object
        // Now any route handler can access user info via req.user
        req.user = user;

        // Step 5: Continue to the next middleware or route handler
        next();

    } catch (error) {
        // Handle different types of errors
        if (error.name === 'JsonWebTokenError') {
            // Token is malformed or invalid
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please login again.'
            });
        }

        if (error.name === 'TokenExpiredError') {
            // Token has expired
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please refresh your token or login again.'
            });
        }

        // Any other error
        return res.status(500).json({
            success: false,
            message: 'Authentication failed',
            error: error.message
        });
    }
};

module.exports = { protect };
