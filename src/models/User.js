const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * User Schema - Defines the structure of user documents
 * 
 * Concept: A schema is like a blueprint or template that tells MongoDB
 * what fields each user should have and what rules to follow.
 */

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters long'],
            maxlength: [50, 'Name cannot exceed 50 characters']
        },

        // Email field
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address'
            ]
        },

        // Password field
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
            select: false 
        },

        // Refresh token
        refreshToken: {
            type: String,
            select: false  // Don't return in queries
        }
    },
    {
        // Timestamps option - automatically adds 'createdAt' and 'updatedAt' fields
        timestamps: true
    }
);

/**
 * Pre-save Middleware - Hash Password Before Saving
 * 
 * Concept: This runs automatically before saving a user to database.
 * We hash the password so it's not stored in plain text.
 * Hashing is one-way: you can't reverse it to get the original password.
 */
userSchema.pre('save', async function(next) {
    // Only hash password if it's new or modified
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generate salt (random data added to password before hashing)
        const salt = await bcrypt.genSalt(10);
        
        // Hash the password with the salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

/**
 * Method - Compare Password
 * 
 * Concept: Checks if entered password matches hashed password in database.
 * We use bcrypt.compare() which hashes the entered password and compares.
 */
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Method - Generate JWT Access Token
 * 
 * Concept: Creates a short-lived token (15 min) that identifies the user.
 * Contains user ID in payload. Client sends this with each API request.
 */
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        { id: this._id },  // Payload: user ID
        process.env.JWT_ACCESS_SECRET,  // Secret key
        { expiresIn: process.env.JWT_ACCESS_EXPIRE }  // Expiry time
    );
};

/**
 * Method - Generate JWT Refresh Token
 * 
 * Concept: Creates a long-lived token (30 days) used to get new access tokens.
 * We also save this in the database so we can invalidate it later.
 */
userSchema.methods.generateRefreshToken = async function() {
    const jwt = require('jsonwebtoken');
    
    const refreshToken = jwt.sign(
        { id: this._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRE }
    );

    // Save refresh token to database (for invalidation purposes)
    this.refreshToken = refreshToken;
    await this.save({ validateBeforeSave: false });

    return refreshToken;
};

/**
 * Model Creation
 * 
 * Concept: The model is like a factory that creates user objects.
 * mongoose.model() takes the schema and creates a class we can use to:
 * - Create new users
 * - Find users
 * - Update users
 * - Delete users
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
