/**
 * connectDB - Establishes connection to MongoDB database
 * 
 * Concept: This is an async function because database connections take time.
 * We use try-catch to handle any connection errors gracefully.
*/

const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        // Log success message with host info
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database Name: ${conn.connection.name}`);
    } catch (error) {
        // If connection fails, log the error and exit the application
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit with failure code
    }
};

module.exports = connectDB;