const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const uploadMiddleware = require('multer')({ dest: 'uploads/' });

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const { errorHandler, verify } = require('./auth'); // Import your auth functions

// Initialize Express
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin1234@cluster0.z0yfs9w.mongodb.net/blogAPI?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware for routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Error handling middleware
app.use(errorHandler); // Use the error handling middleware

// Start the server
app.listen(4000, () => {
    console.log('Server running on port 4000');
});
