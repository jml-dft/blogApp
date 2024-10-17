const jwt = require('jsonwebtoken');
const fs = require('fs');
const Post = require('../models/Post');
require('dotenv').config(); // Load environment variables

const createPost = async (req, res) => {
    let newPath = null;

    if (req.file) {
        const { originalname, path } = req.file;
        const ext = originalname.split('.').pop();
        newPath = `${path}.${ext}`;
        console.log('Uploading file:', originalname);
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;

    // Use the secret from the environment variable
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, info) => {
        if (err) {
            console.error('JWT verification failed:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }

        const { title, summary, content } = req.body;
        console.log('Creating post by user:', info.id);

        try {
            const postDoc = await Post.create({
                title,
                summary,
                content,
                cover: newPath,
                author: info.id,
            });

            console.log('Post created:', postDoc);
            res.json(postDoc);
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
};

// Update Post
const updatePost = (req, res) => {
    console.log("User ID:", req.user.id); // Debugging: Check user ID from token
    console.log("Request Body:", req.body); // Debugging: Check the request body content

    const { id } = req.body;
    const { title, summary, content } = req.body;

    // Ensure post ID is provided
    if (!id) {
        return res.status(400).send({ message: 'Post ID is required' });
    }

    // Handle file upload if provided
    let newCoverPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const ext = originalname.split('.').pop();
        newCoverPath = `${path}.${ext}`;
        console.log("Uploading new file for post:", originalname);
        fs.renameSync(path, newCoverPath);
    }

    // Verify token and ensure the user is authorized to update the post
    jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY, {}, (err, info) => {
        if (err) {
            console.error('JWT verification failed:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }

        console.log("Decoded token info:", info); // Debugging: Log token info

        // Find the post by ID
        Post.findById(id)
            .then(postDoc => {
                if (!postDoc) {
                    console.log("Post not found for ID:", id); // Debugging: Post not found
                    return res.status(404).send({ message: 'Post not found' });
                }

                // Check if the user is the author of the post
                if (String(postDoc.author) !== String(info.id)) {
                    console.log("Unauthorized post update attempt by user:", info.id); // Debugging: Unauthorized update attempt
                    return res.status(403).send({ message: 'You are not the author of this post' });
                }

                console.log("Post found:", postDoc); // Debugging: Log the post found

                // Update the post fields
                postDoc.title = title || postDoc.title;
                postDoc.summary = summary || postDoc.summary;
                postDoc.content = content || postDoc.content;
                postDoc.cover = newCoverPath || postDoc.cover;

                // Save the updated post
                return postDoc.save();
            })
            .then(updatedPost => {
                console.log("Post updated successfully:", updatedPost); // Debugging: Log the updated post
                // Send a success response with the updated post
                res.status(200).send({
                    success: true,
                    message: 'Post updated successfully',
                    updatedPost
                });
            })
            .catch(error => {
                console.error("Error updating post:", error.message); // Debugging: Log the error
                if (!res.headersSent) {
                    res.status(500).send({ message: 'Error updating post', error: error.message });
                }
            });
    });
};




const getAllPosts = async (req, res) => {
    const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20);
    res.json(posts);
};

const getSinglePost = async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
};

module.exports = {
    createPost,
    updatePost,
    getAllPosts,
    getSinglePost,
};
