const express = require('express');
const { createPost, updatePost, getAllPosts, getSinglePost } = require('../controllers/post');
const uploadMiddleware = require('multer')({ dest: 'uploads/' });
const { verify } = require("../auth"); // Using the verify middleware

const router = express.Router();

// Create Post - Requires user to be logged in
router.post('/', verify, uploadMiddleware.single('file'), createPost);

// Update Post - Requires user to be logged in
router.put('/:id', verify, uploadMiddleware.single('file'), updatePost);

// Get All Posts - Public route
router.get('/', getAllPosts);

// Get Single Post - Public route
router.get('/:id', getSinglePost);

module.exports = router;
