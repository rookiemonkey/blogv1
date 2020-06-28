// =============================================
// DEPENDENCIES
// =============================================
const express       = require("express");
const router        = express();
const database      = require("../schema");
const Post          = database.Post;


// =============================================
// CREATE - post a blog
// =============================================
router.get("/blogs/new", (req,res) => {
    res.render("newBlog");
});

router.post("/blogs/new", (req,res) => {
    let sanitizedTitle = req.sanitize(req.body.blog.title);
    let sanitizedDetails = req.sanitize(req.body.blog.details);
    Post.create({
        title: sanitizedTitle,
        image: req.body.blog.image,
        body: sanitizedDetails
    }, (err, newblog) => {
        err ? console.error(err) : res.redirect('/')
    });
});


// =============================================
// EXPORT
// =============================================
module.exports = router;