// =============================================
// DEPENDENCIES
// =============================================
const mongoose = require('mongoose');


// =============================================
// POST SCHEMA
// =============================================
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date()
    }
});

const Post = mongoose.model("Post", postSchema);


// =============================================
// EXPORT
// =============================================
module.exports = Post;