// =============================================
// DEPENDENCIES
// =============================================
const express = require("express");
const router = express();
const database = require("../schema");
const moment = require("moment");
const Post = database.Post;
const expressSanitizer = require("express-sanitizer");

// =============================================
// INDEX - get all blogs
// =============================================
router.get('/', (req, res) => {
    res.redirect("/blogs");
});

router.get('/blogs', (req, res) => {
    Post.find({}, (err, foundBlogs) => {
        if(err) {
            req.flash('error', 'Something went wrong upon getting all the post from the databases');
            res.redirect("/blogs");
        } else {
            res.render("getBlogs", { blogs: foundBlogs, moment: moment });
        }
    });
});


// =============================================
// EXPORT
// =============================================
module.exports = router;