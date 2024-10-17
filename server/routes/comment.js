const express = require('express');
const { addComment, getComments } = require('../controllers/comment');
const { verify, verifyAdmin, isLoggedIn } = require("../auth");

const router = express.Router();

// Add Comment - Ensure the user is logged in
router.post('/', isLoggedIn, addComment);

// Get Comments for a Post
router.get('/:postId', getComments);

module.exports = router;
