// =============================================
// DEPENDENCIES
// =============================================
const express       = require("express");
const router        = express();
const database      = require("../schema");
const Post          = database.Post;

// =============================================
// READ - get a blog
// =============================================
router.get("/blogs/:id", (req, res) => {
    Post.findById({ _id: req.params.id }, (err, foundPost) => {
        err ? console.error(err) : res.render("getBlog", {foundPost: foundPost});
    });
});

// =============================================
// EXPORT
// =============================================
module.exports = router;