// =============================================
// DEPENDENCIES
// =============================================
const express = require("express");
const router = express();
const database = require("../schema");
const Post = database.Post;


// =============================================
// CREATE - post a blog
// =============================================
router.get("/blogs/new", (req, res) => {
    res.render("postBlog");
});

router.post("/blogs/new", (req, res) => {
    let sanitizedTitle = req.sanitize(req.body.blog.title);
    let sanitizedDetails = req.sanitize(req.body.blog.details);
    Post.create({
        title: sanitizedTitle,
        image: req.body.blog.image,
        body: sanitizedDetails
    }, (err, newblog) => {
        if(err) {
            req.flash('error', 'Something went wrong upon creating a new Post. Please try again later');
            res.redirect("/blogs");
        } else {
            req.flash('info', `${sanitizedTitle} was posted successfully`);
            res.redirect("/blogs");
        }
    });
});


// =============================================
// EXPORT
// =============================================
module.exports = router;