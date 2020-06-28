// =============================================
// DEPENDENCIES
// =============================================
const mongoose = require('mongoose');


// =============================================
// POST SCHEMA
// =============================================
const postSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date()}
});

const Post = mongoose.model("Post", postSchema);


// =============================================
// EXPORT
// =============================================
module.exports = Post;