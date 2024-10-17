const jwt = require('jsonwebtoken');
const Comment = require('../models/Comment');
require('dotenv').config(); // Ensure dotenv is loaded to access environment variables

const addComment = async (req, res) => {
    const { token } = req.cookies;

    // Use the secret from the environment variable
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, async (err, info) => {
        if (err) {
            console.error('JWT verification failed:', err);
            return res.status(401).json({ message: 'Invalid token' });
        }

        const { postId, text } = req.body;

        try {
            const commentDoc = await Comment.create({
                post: postId,
                author: info.id,
                text,
            });

            console.log('Comment added:', commentDoc);
            res.json(commentDoc);
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
};

const getComments = async (req, res) => {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId }).populate('author', ['username']);
    res.json(comments);
};

module.exports = {
    addComment,
    getComments,
};
