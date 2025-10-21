require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());  

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true  // Allow cookies to be sent with requests
}));

// Routes

// Home route
app.get('/', (req, res) => {
  return res.json({ 
    message: "TaskFlow API is running",
    version: "1.0.0",
    endpoints: {
      auth: "/api/v1/auth",
      tasks: "/api/v1/tasks",
      health: "/api/v1/health"
    }
  });
});

app.get('/api/v1/health', (req, res) => {
  return res.json({ 
    success: true,
    message: "TaskFlow API is healthy",
    timestamp: new Date().toISOString()
  });
});

// Mount auth routes
app.use('/api/v1/auth', authRoutes);

// Mount task routes
app.use('/api/v1/tasks', taskRoutes);

// Define PORT
const PORT = process.env.PORT || 3000;

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
});