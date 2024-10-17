const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // Reference to Post
}, { timestamps: true });

const CommentModel = model('Comment', CommentSchema);

module.exports = CommentModel;
