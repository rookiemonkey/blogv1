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
        if(err) {
            console.error(err);
            res.redirect("/");
        } else {
            res.render("blog", {foundPost: foundPost});
        }
    });
});

// =============================================
// EXPORT
// =============================================
module.exports = router;