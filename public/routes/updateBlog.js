// =============================================
// DEPENDENCIES
// =============================================
const express       = require("express");
const router        = express();
const database      = require("../schema");
const Post          = database.Post;


// =============================================
// UPDATE - edit/update a blog
// =============================================
router.get("/blogs/edit/:id", (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        err ? console.error(err) : res.render('editBlog', {foundPost: foundPost})
    });
});

router.put("/blogs/edit/:id", (req, res) => {
    let sanitizedDetails = req.sanitize(req.body.blog.details);
    let sanitizedTitle = req.sanitize(req.body.blog.title);
    let updates = { title: sanitizedTitle, image: req.body.blog.image, body: sanitizedDetails }
    Post.findByIdAndUpdate(req.params.id, updates, (err, updatedPost) => {
        err ? console.error(err) : res.redirect(`/blogs/${req.params.id}`)
    });
});


// =============================================
// EXPORT
// =============================================
module.exports = router;